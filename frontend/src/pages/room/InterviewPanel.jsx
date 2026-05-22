import React, { useEffect, useRef, useState } from "react";
import Header from "../../components/InterviewPanel/Header";
import {
  acceptParticipantAPI,
  getParticipantsAPI,
  getWaitingParticipantAPI,
  rejectParticipantAPI,
} from "../../services/roomServices";

import { useToast } from "../../contexts/ToastContext";
import { connectSocket } from "../../socket/socket";

import WaitingList from "../../components/InterviewPanel/WaitingList";
import ParticipantList from "../../components/InterviewPanel/ParticipantList";
import MainVideo from "../../components/InterviewPanel/MainVideo";
import VideoCard from "../../components/InterviewPanel/VideoCard";

const InterviewPanel = ({ room, participant }) => {
  const toast = useToast();

  const socket = connectSocket();

  const localVideoRef = useRef(null);
  const localStreamRef = useRef(null);

  const peersRef = useRef({});

  const [localStream, setLocalStream] = useState(null);

  const [remoteStreams, setRemoteStreams] = useState({});

  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);

  const [waitingParticipants, setWaitingParticipants] = useState([]);

  const [joinedParticipants, setJoinedParticipants] = useState([]);

  const [showWaitingList, setShownWaitingList] = useState(true);

  const [showJoinedParticipants, setShowJoinedParticipants] =
    useState(false);

  const [pinnedUser, setPinnedUser] = useState(null);

  const currentUser = joinedParticipants.find(
    (p) =>
      p.user?._id?.toString() === participant.user?.toString(),
  );

  const mainUser =
    pinnedUser ||
    joinedParticipants.find(
      (p) =>
        p.user?._id?.toString() !==
        participant.user?.toString(),
    ) ||
    currentUser;

  const bottomUsers = joinedParticipants.filter(
    (p) =>
      p.user?._id?.toString() !==
      mainUser?.user?._id?.toString(),
  );

  const showBottomStrip = bottomUsers.length > 0;

  const fetchWaitingParticipants = async () => {
    try {
      const res = await getWaitingParticipantAPI(room.roomId);

      setWaitingParticipants(res.waitingParticipants);
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  const fetchJoinedParticipants = async () => {
    try {
      const res = await getParticipantsAPI(room.roomId);

      setJoinedParticipants(res.participants);
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  useEffect(() => {
    if (room?.roomId) {
      fetchWaitingParticipants();
      fetchJoinedParticipants();
    }
  }, [room?.roomId]);

  // ================= LOCAL MEDIA =================

  useEffect(() => {
    const init = async () => {
      try {
        const stream =
          await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
          });

        localStreamRef.current = stream;

        setLocalStream(stream);

        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
      } catch (error) {
        toast.error("Camera/Mic permission denied");
      }
    };

    init();

    return () => {
      if (localStreamRef.current) {
        localStreamRef.current
          .getTracks()
          .forEach((track) => track.stop());
      }

      Object.values(peersRef.current).forEach((pc) =>
        pc.close(),
      );

      peersRef.current = {};
    };
  }, []);

  // ================= SOCKET EVENTS =================

  useEffect(() => {
    if (!room?.roomId) return;

    socket.on("waiting-list-updated", (list) => {
      setWaitingParticipants(list);
    });

    socket.on("participants-updated", (list) => {
      setJoinedParticipants(list);
    });

    socket.on(
      "participant-media-updated",
      ({ userId, isMicOn, isCameraOn }) => {
        setJoinedParticipants((prev) =>
          prev.map((p) => {
            if (
              p.user?._id?.toString() ===
              userId?.toString()
            ) {
              return {
                ...p,
                isMicOn,
                isCameraOn,
              };
            }

            return p;
          }),
        );
      },
    );

    return () => {
      socket.off("waiting-list-updated");
      socket.off("participants-updated");
      socket.off("participant-media-updated");
    };
  }, []);

  // ================= WEBRTC =================

  const createPeer = (socketId) => {
    if (peersRef.current[socketId]) {
      return peersRef.current[socketId];
    }

    const pc = new RTCPeerConnection({
      iceServers: [
        {
          urls: "stun:stun.l.google.com:19302",
        },
      ],
    });

    if (localStreamRef.current) {
      localStreamRef.current
        .getTracks()
        .forEach((track) => {
          pc.addTrack(track, localStreamRef.current);
        });
    }

    pc.ontrack = (event) => {
      const stream = event.streams[0];

      setRemoteStreams((prev) => ({
        ...prev,
        [socketId]: stream,
      }));
    };

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit("ice-candidate", {
          to: socketId,
          candidate: event.candidate,
          from: socket.id,
        });
      }
    };

    peersRef.current[socketId] = pc;

    return pc;
  };

  const createOffer = async (socketId) => {
    const pc = createPeer(socketId);

    const offer = await pc.createOffer();

    await pc.setLocalDescription(offer);

    socket.emit("offer", {
      to: socketId,
      offer,
      from: socket.id,
    });
  };

  useEffect(() => {
    if (!localStreamRef.current) return;

    socket.emit("join-room", {
      roomId: room.roomId,
      userId: participant.user._id,
    });

    socket.on("existing-users", async (users) => {
      for (const user of users) {
        await createOffer(user.socketId);
      }
    });

    socket.on("user-joined", async ({ socketId }) => {
      await createOffer(socketId);
    });

    socket.on("offer", async ({ offer, from }) => {
      const pc = createPeer(from);

      await pc.setRemoteDescription(offer);

      const answer = await pc.createAnswer();

      await pc.setLocalDescription(answer);

      socket.emit("answer", {
        to: from,
        answer,
        from: socket.id,
      });
    });

    socket.on("answer", async ({ answer, from }) => {
      const pc = peersRef.current[from];

      if (pc) {
        await pc.setRemoteDescription(answer);
      }
    });

    socket.on(
      "ice-candidate",
      async ({ candidate, from }) => {
        const pc = peersRef.current[from];

        if (pc && candidate) {
          await pc.addIceCandidate(candidate);
        }
      },
    );

    socket.on("user-left", ({ socketId }) => {
      if (peersRef.current[socketId]) {
        peersRef.current[socketId].close();

        delete peersRef.current[socketId];
      }

      setRemoteStreams((prev) => {
        const updated = { ...prev };

        delete updated[socketId];

        return updated;
      });
    });

    return () => {
      socket.off("existing-users");
      socket.off("user-joined");
      socket.off("offer");
      socket.off("answer");
      socket.off("ice-candidate");
      socket.off("user-left");
    };
  }, [localStream]);

  // ================= CONTROLS =================

  const handleToggleMic = () => {
    const track =
      localStreamRef.current?.getAudioTracks()[0];

    if (!track) return;

    track.enabled = !track.enabled;

    setIsMicOn(track.enabled);

    socket.emit("toggle-media", {
      roomId: room.roomId,
      userId: participant.user,
      type: "mic",
      value: track.enabled,
    });
  };

  const handleToggleCamera = () => {
    const track =
      localStreamRef.current?.getVideoTracks()[0];

    if (!track) return;

    track.enabled = !track.enabled;

    setIsCameraOn(track.enabled);

    socket.emit("toggle-media", {
      roomId: room.roomId,
      userId: participant.user,
      type: "camera",
      value: track.enabled,
    });
  };

  // ================= WAITING =================

  const handleAccept = async (p) => {
    try {
      setWaitingParticipants((prev) =>
        prev.filter((item) => item._id !== p._id),
      );

      const res = await acceptParticipantAPI(
        room.roomId,
        p._id,
      );

      toast.success(res.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleReject = async (p) => {
    try {
      setWaitingParticipants((prev) =>
        prev.filter((item) => item._id !== p._id),
      );

      const res = await rejectParticipantAPI(
        room.roomId,
        p._id,
      );

      toast.success(res.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const onOpenWaitingList = () => {
    setShownWaitingList(true);
    setShowJoinedParticipants(false);
  };

  const onCloseWaitingList = () => {
    setShownWaitingList(false);
  };

  const onOpenParticipantList = () => {
    setShowJoinedParticipants(true);
    setShownWaitingList(false);
  };

  const onCloseParticipantList = () => {
    setShowJoinedParticipants(false);
  };

  
return (
  <div className="w-full h-[89vh] overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-indigo-100 flex flex-col">
    
    {/* HEADER */}
    <div className="h-[64px] min-h-[64px] px-2 pt-2">
      <Header
        room={room}
        participant={participant}
        waitingCount={waitingParticipants.length}
        participantCount={joinedParticipants.length}
        onOpenWaitingList={onOpenWaitingList}
        onOpenParticipantList={onOpenParticipantList}
      />
    </div>

    {/* BODY */}
    <div className="flex-1 min-h-0 flex gap-4 p-3 overflow-hidden">

      {/* LEFT SIDE */}
      <div
        className={`h-full min-h-0 flex flex-col gap-3 transition-all duration-300 ${
          showWaitingList || showJoinedParticipants
            ? "w-[70%]"
            : "w-full"
        }`}
      >

        {/* MAIN VIDEO */}
        <div
          className={`
            w-full min-h-0 rounded-2xl overflow-hidden
            ${
              showBottomStrip
                ? "flex-1"
                : "h-full"
            }
          `}
        >
          <MainVideo
            participant={mainUser}
            currentUserId={participant.user._id}
            localStream={localStream}
            remoteStreams={remoteStreams}
            pinnedUser={pinnedUser}
            setPinnedUser={setPinnedUser}
            onToggleMic={handleToggleMic}
            onToggleCamera={handleToggleCamera}
            isMicOn={isMicOn}
            isCameraOn={isCameraOn}
          />
        </div>

        {/* BOTTOM STRIP */}
        {showBottomStrip && (
          <div className="h-[170px] min-h-[170px] max-h-[170px] bg-white border border-gray-200 rounded-2xl p-3 overflow-hidden">

            <div className="h-full flex items-center gap-4 overflow-x-auto overflow-y-hidden scrollbar-hide">

              {bottomUsers.map((user) => (
                <div
                  key={user._id}
                  className="h-full min-w-[240px] max-w-[240px] flex-shrink-0"
                >
                  <VideoCard
                    participant={user}
                    currentUserId={participant.user._id}
                    localStream={localStream}
                    remoteStreams={remoteStreams}
                    pinnedUser={pinnedUser}
                    setPinnedUser={setPinnedUser}
                    onToggleMic={handleToggleMic}
                    onToggleCamera={handleToggleCamera}
                    isMicOn={isMicOn}
                    isCameraOn={isCameraOn}
                  />
                </div>
              ))}

            </div>
          </div>
        )}
      </div>

      {/* RIGHT PANEL */}
      {(showWaitingList || showJoinedParticipants) && (
        <div className="w-[30%] h-full min-h-0 overflow-hidden">

          <div className="h-full overflow-hidden rounded-2xl">

            {showWaitingList && (
              <WaitingList
                waitingParticipants={waitingParticipants}
                onAccept={handleAccept}
                onReject={handleReject}
                onClose={onCloseWaitingList}
              />
            )}

            {showJoinedParticipants && (
              <ParticipantList
                joinedParticipants={joinedParticipants}
                currentUserId={participant.user}
                onClose={onCloseParticipantList}
              />
            )}

          </div>
        </div>
      )}
    </div>
  </div>
);


};

export default InterviewPanel;


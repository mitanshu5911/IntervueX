import React, { useEffect, useRef, useState } from "react";
import Header from "../../components/CandidatePanel/Header";
import ParticipantsList from "../../components/CandidatePanel/ParticipantsList";
import { getParticipantsAPI } from "../../services/roomServices";
import { useToast } from "../../contexts/ToastContext";
import { connect } from "socket.io-client";
import { connectSocket } from "../../socket/socket";
import MainVideo from "../../components/CandidatePanel/MainVideo";
import { useNavigate } from "react-router-dom";
import BottomVideoCard from "../../components/CandidatePanel/BottomVideoUser";

const CandidatePanel = ({ room, participant }) => {
  const toast = useToast();

  const socket = connectSocket();
  const navigate = useNavigate();

  const localVideoRef = useRef(null);
  const localStreamRef = useRef(null);

  const peersRef = useRef({});

  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [localStream, setLocalStream] = useState(null);

  const [remoteStreams, setRemoteStreams] = useState({});

  const [allParticipants, setAllParticipants] = useState([]);

  const [pinnedUser, setPinnedUser] = useState(null);

  const [showParticipantsList, setShowParticipantsList] = useState(false);

  const [isSidePanelOpened, setIsSidePanelOpened] = useState(false);

  const [isBottomPanelOpened, setIsBottomPanelOpened] = useState(false);

  const fetchAllPariticipants = async () => {
    try {
      const res = await getParticipantsAPI(room.roomId);
      setAllParticipants(res.participants);
    } catch (error) {
      toast.error("Failed to fetch participants");
    }
  };

  useEffect(() => {
    if (room?.roomId) {
      fetchAllPariticipants();
    }
  }, [room?.roomId]);

  const interviewer = allParticipants.find((p) => p.role === "interviewer");

  const currentUser = allParticipants.find(
    (p) => p.user._id?.toString() === participant.user?.toString(),
  );

  const mainVideoUser = pinnedUser || interviewer;

  const remainingParticipants = allParticipants.filter(
    (p) => p.user._id?.toString() !== mainVideoUser?.user?._id?.toString(),
  );

  const sortedBottomParticipants = remainingParticipants.sort((a, b) => {
    const aIsInterviewer = a.role === "interviewer";

    const bIsInterviewer = b.role === "interviewer";

    if (aIsInterviewer) return -1;
    if (bIsInterviewer) return 1;

    const aIsYou = a.user._id?.toString() === participant.user?.toString();

    const bIsYou = b.user._id?.toString() === participant.user?.toString();

    if (aIsYou) return -1;
    if (bIsYou) return 1;

    return 0;
  });

  useEffect(() => {
    const init = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
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
        localStreamRef.current.getTracks().forEach((track) => track.stop());

        localStreamRef.current = null;
      }

      Object.values(peersRef.current).forEach((pc) => pc.close());

      peersRef.current = {};
    };
  }, []);

  useEffect(() => {
    if (!room?.roomId) return;

    socket.on("participants-updated", (list) => {
      console.log("Participants updated:", list);
      setAllParticipants(list);
    });

    socket.on(
      "participant-media-updated",
      ({ userId, isMicOn, isCameraOn }) => {
        setAllParticipants((prev) =>
          prev.map((p) => {
            if (p.user?._id?.toString() === userId?.toString()) {
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
      socket.off("participants-updated");
      socket.off("participant-media-updated");
    };
  }, [room?.roomId]);

  const onOpenParticipantList = () => {
    setShowParticipantsList(true);
    setIsSidePanelOpened(true);
    setIsBottomPanelOpened(true);
  };

  const onCloseParticipantList = () => {
    setShowParticipantsList(false);
    setIsSidePanelOpened(false);
    setIsBottomPanelOpened(false);
  };

  const handleToggleMic = () => {
    const track = localStreamRef.current?.getAudioTracks()[0];
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

  const handleToggleCamera = async () => {
    const videoTrack = localStreamRef.current?.getVideoTracks()[0];

    if (videoTrack && isCameraOn) {
      videoTrack.stop();
      setIsCameraOn(false);

      socket.emit("toggle-media", {
        roomId: room.roomId,
        userId: participant.user,
        type: "camera",
        value: false,
      });
    } else {
      try {
        const newStream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });

        const newTrack = newStream.getVideoTracks()[0];

        const updatedStream = new MediaStream([
          ...localStreamRef.current.getAudioTracks(),
          newTrack,
        ]);

        localStreamRef.current = updatedStream;
        localVideoRef.current.srcObject = updatedStream;

        setIsCameraOn(true);

        socket.emit("toggle-media", {
          roomId: room.roomId,
          userId: participant.user,
          type: "camera",
          value: true,
        });
      } catch {
        toast.error("Camera restart failed");
      }
    }
  };

  const createPeer = (socketId) => {
    console.log("Creating peer:", socketId);

    if (peersRef.current[socketId]) {
      return peersRef.current[socketId];
    }

    const pc = new RTCPeerConnection({
      iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
    });

    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((track) => {
        pc.addTrack(track, localStreamRef.current);
      });
    }

    pc.ontrack = (event) => {
      console.log("Received stream from:", socketId);

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

    console.log("webRTC Ready");

    socket.emit("join-room", {
      roomId: room.roomId,
      userId: participant.user._id,
    });

    socket.on("existing-users", async (users) => {
      console.log("Existing:", users);

      for (const user of users) {
        await createOffer(user.socketId);
      }
    });
    socket.on("user-joined", async ({ socketId }) => {
      console.log("User joined:", socketId);
      await createOffer(socketId);
    });

    socket.on("offer", async ({ offer, from }) => {
      console.log("Offer from:", from);

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
      console.log("Answer from:", from);

      const pc = peersRef.current[from];
      if (pc) {
        await pc.setRemoteDescription(answer);
      }
    });

    socket.on("ice-candidate", async ({ candidate, from }) => {
      const pc = peersRef.current[from];
      if (pc && candidate) {
        await pc.addIceCandidate(candidate);
      }
    });

    socket.on("user-left", ({ socketId }) => {
      console.log("User left:", socketId);

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

  return (
    <div className="h-[89vh] w-full bg-gradient-to-br from-indigo-100 via-white to-indigo-100 flex flex-col">
      <Header
        room={room}
        allParticipantsCount={allParticipants.length}
        onOpenParticipantList={onOpenParticipantList}
      />

      <div className="h-[80vh] w-full  p-3 flex items-center gap-5">
        <div className="h-full w-[70%] flex flex-col gap-2">
          <div
            className={`bg-black w-full rounded-2xl
            ${isSidePanelOpened ? "h-[70%]" : "h-full"}
          `}
          >
            <MainVideo
              participant={mainVideoUser}
              currentUserId={participant.user._id}
              localStream={localStream}
              localVideoRef={localVideoRef}
              remoteStreams={remoteStreams}
              pinnedUser={pinnedUser}
              setPinnedUser={setPinnedUser}
              onToggleMic={handleToggleMic}
              onToggleCamera={handleToggleCamera}
              isMicOn={handleToggleMic}
              isCameraOn={handleToggleCamera}
            />
          </div>

          {isBottomPanelOpened && (
            <div className="w-full h-[30%] bg-white border border-gray-200 rounded-2xl p-3 overflow-x-auto overflow-y-hidden">
              <div className="h-full flex items-center gap-4 min-w-max">
                {sortedBottomParticipants.map((p) => (
                  <div key={p._id} className="h-full min-w-[240px]">
                    <BottomVideoCard
                      participant={p}
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

        <div className="w-[30%] h-full ">
          <div className="h-[85%] w-full ">
            {showParticipantsList && isSidePanelOpened && (
              <ParticipantsList
                allParticipants={allParticipants}
                participant={participant}
                onClose={onCloseParticipantList}
                pinnedUser={pinnedUser}
                setPinnedUser={setPinnedUser}
              />
            )}
          </div>

          <div className="flex justify-center items-center h-[15%] px-10">
            <button className="bg-red-500 w-full py-2 font-semibold text-md rounded-3xl">
              Leave Meeting
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidatePanel;

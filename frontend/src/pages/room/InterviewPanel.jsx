import React, { useEffect, useState } from "react";
import Header from "../../components/InterviewPanel/Header";
import {
  acceptParticipantAPI,
  getParticipantsAPI,
  getWaitingParticipantAPI,
  rejectParticipantAPI,
} from "../../services/roomServices";
import { useToast } from "../../contexts/ToastContext";
import { connectSocket, getSocket } from "../../socket/socket";
import WaitingList from "../../components/InterviewPanel/WaitingList";
import ParticipantList from "../../components/InterviewPanel/ParticipantList";
import MainVideo from "../../components/InterviewPanel/MainVideo";
import VideoCard from "../../components/InterviewPanel/VideoCard";

const InterviewPanel = ({ room, participant }) => {
  const toast = useToast();
  const [waitingParticipants, setWaitingParticipants] = useState([]);
  const [showWaitingList, setShownWaitingList] = useState(true);
  const [pinnedUser, setPinnedUser] = useState(null);

  const [joinedParticipants, setJoinedParticipants] = useState([]);
  const [showJoinedParticipants, setShowJoinedParticipants] = useState(false);

  const currentUser = joinedParticipants.find(
    (p) => p.user._id === participant.user,
  );

  const mainUser =
    pinnedUser ||
    joinedParticipants.find((p) => p.user._id !== participant.user) ||
    currentUser;

  const bottomUsers = joinedParticipants.filter((p) => p._id !== mainUser?._id);

  const showBottomStrip = joinedParticipants.length > 1;

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

  useEffect(() => {
    if (!room?.roomId) return;

    const socket = connectSocket();

    socket.on("waiting-list-updated", (list) => {
      console.log("Real-time update:", list);
      setWaitingParticipants(list);
    });

    socket.on("participants-updated", (list) => {
      console.log("Participants updated:", list);
      setJoinedParticipants(list);
    });

    return () => {
      socket.off("waiting-list-updated");
      socket.off("participants-updated");
    };
  }, []);

  const handleAccept = async (p) => {
    try {
      setWaitingParticipants((prev) =>
        prev.filter((item) => item._id !== p._id),
      );

      setJoinedParticipants((prev) => {
        const exists = prev.find((x) => x._id === p._id);
        if (exists) return prev;
        return [...prev, p];
      });
      const res = await acceptParticipantAPI(room.roomId, p._id);
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

      const res = await rejectParticipantAPI(room.roomId, p._id);

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
    <div className="w-full max-h-[89vh] p-2 bg-gradient-to-br from-indigo-50 via-white to-indigo-100">
      <Header
        room={room}
        participant={participant}
        waitingCount={waitingParticipants.length}
        participantCount={joinedParticipants.length}
        onOpenWaitingList={onOpenWaitingList}
        onOpenParticipantList={onOpenParticipantList}
      />

      <div className="w-full flex gap-4 p-4">
        {/* LEFT MAIN AREA */}
        <div
          className={`h-80 transition-all duration-300 ${
            showWaitingList || showJoinedParticipants ? "w-[70%]" : "w-full"
          }`}
        >
          <div className="w-full h-80 rounded-2xl flex items-center justify-center text-white">
            <MainVideo
              mainUser={mainUser}
              currentUserId={participant.user}
              pinnedUser={pinnedUser}
              onPinToggle={setPinnedUser}
            />
          </div>
        </div>

        {/* RIGHT SIDE PANEL */}
        {(showWaitingList || showJoinedParticipants) && (
          <div className="w-[30%] h-full">
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
                onClose={onCloseParticipantList}
                currentUserId={participant.user}
              />
            )}
          </div>
        )}
      </div>

      {showBottomStrip && (
        <div className="w-full px-4 h-28">
          <div className="w-full bg-white rounded-2xl shadow-md flex items-center justify-between px-4 py-2">
            {/* LEFT: CARDS */}
            <div className="flex gap-3 overflow-x-auto">
              {bottomUsers.map((user) => (
                <VideoCard
                  key={user._id}
                  user={user}
                  isCurrentUser={user.user._id === participant.user}
                  onPin={() => setPinnedUser(user)}
                />
              ))}
            </div>

            {/* RIGHT: END BUTTON */}
            <button className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-xl font-medium transition">
              End Meeting
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default InterviewPanel;

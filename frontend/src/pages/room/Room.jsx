import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getRoomByIdAPI } from "../../services/roomServices";
import { useLoading } from "../../contexts/LoadingContext";
import { useToast } from "../../contexts/ToastContext";
import RoomNotAvailable from "../../components/room/RoomNotAvailable";
import RoomNotActive from "../../components/room/RoomNotActive";
import EndedRoom from "../../components/room/EndedRoom";
import WaitingRoom from "../../components/room/waitingRoom";
import InterviewPanel from "./InterviewPanel";
import { connectSocket, disconnectSocket } from "../../socket/socket";
import CandidatePanel from "./CandidatePanel";

const Room = () => {
  const { roomId } = useParams();
  const { showLoading, hideLoading } = useLoading();
  const [participant, setParticipant] = useState(null);

  const toast = useToast();
  const navigate = useNavigate();

  const [room, setRoom] = useState(null);
  const [pendingTime, setPendingTime] = useState(null);

  const fetchRoom = async (withLoader = false) => {
    try {
      if (withLoader) showLoading();
      const res = await getRoomByIdAPI(roomId);

      setRoom(res.room);
      setParticipant(res.participant);

      if (res.room?.scheduledAt) {
        const now = new Date();
        const start = new Date(res.room.scheduledAt);
        if (start - now >= 0) setPendingTime(start - now);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      if (withLoader) hideLoading();
    }
  };

  useEffect(() => {
    fetchRoom(true);
  }, [roomId]);

  useEffect(() => {
    if (pendingTime === null || pendingTime <= 0) return;

    const timer = setInterval(() => {
      setPendingTime((prev) => prev - 1000);
    }, 1000);

    return () => clearInterval(timer);
  }, [pendingTime]);

  useEffect(() => {
    if (pendingTime === null || pendingTime > 0) return;

    const interval = setInterval(async () => {
      fetchRoom(false);
    }, 3000);

    return () => clearInterval(interval);
  }, [pendingTime]);


  // ----sockets------

 useEffect(() => {
  if (!room?.roomId || !participant?.user) return;

  const socket = connectSocket();

  socket.emit("join-room", {
    roomId,
    userId: participant.user,
  });

  socket.on("join-approved", () => {
    toast.success("Accepted! Entering room...");

    setParticipant((prev) => ({
      ...prev,
      status: "joined",
    }));
  });

  socket.on("join-rejected", () => {
    toast.error("You were rejected. Try again.");

    setTimeout(() => {
      navigate("/scheduled-for-me");
    }, 1000);
  });

  return () => {
    socket.off("join-approved");
    socket.off("join-rejected");
    disconnectSocket();
  };

}, [room?.roomId]);

  if (!room) {
    return <RoomNotAvailable />;
  }

  if (room.status === "scheduled") {
    return <RoomNotActive room={room} pendingTime={pendingTime} />;
  }

  if (room.status === "ended") {
    return <EndedRoom room={room} />;
  }

  if (participant?.role === "interviewer") {
    return <InterviewPanel room={room} participant={participant} />;
  }

  if (participant?.status === "waiting") {
    return <WaitingRoom room={room} participant={participant} />;
  }

  if (participant?.status === "accepted" || participant?.status === "joined") {
    return <CandidatePanel room={room} participant={participant} />
  }

  return <div>{room?.interviewer?.name}</div>;
};

export default Room;

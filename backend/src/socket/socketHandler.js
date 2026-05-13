import Participant from "../models/Participant.js";
import Room from "../models/Room.js";
import { Server } from "socket.io";

let io;

export const socketHandler = (server) => {
  io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL,
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("join-room", async ({ roomId, userId }) => {
      try {
        const room = await Room.findOne({ roomId });
        if (!room) return;

        socket.join(roomId);

        socket.roomId = roomId;
        socket.userId = userId;

        const participant = await Participant.findOneAndUpdate(
          { room: room._id, user: userId },
          { socketId: socket.id },
          { new: true }
        ).populate("user", "name email");

        console.log(`User ${userId} joined ${roomId}`);

        if (participant.role === "candidate" && participant.status === "waiting") {
          const waitingList = await Participant.find({
            room: room._id,
            status: "waiting",
          }).populate("user", "name email");

          io.to(roomId).emit("waiting-list-updated", waitingList);
        }

        const interviewer = await Participant.findOne({
          room: room._id,
          role: "interviewer",
          status: "joined",
        });

        socket.to(roomId).emit("user-joined", {
          userId,
          socketId: socket.id,
        });

        const participants = await Participant.find({
          room: room._id,
          status: "joined",
        });

        const existingUsers = participants
          .filter((p) => p.socketId && p.socketId !== socket.id)
          .map((p) => ({
            userId: p.user,
            socketId: p.socketId,
          }));

        socket.emit("existing-users", existingUsers);

        io.to(socket.id).emit("interviewer-status", {
          isJoined: !!interviewer,
        });

        if (participant.role === "interviewer" && participant.status === "joined") {
          io.to(roomId).emit("interviewer-joined");
        }
      } catch (error) {
        console.error(error);
      }
    });

    socket.on("toggle-media", async ({ roomId, userId, type, value }) => {
      try {
        const room = await Room.findOne({ roomId });
        if (!room) return;

        const updateField =
          type === "mic" ? { isMicOn: value } : { isCameraOn: value };

        const participant = await Participant.findOneAndUpdate(
          { room: room._id, user: userId },
          updateField,
          { new: true }
        ).populate("user", "name email");

        if (!participant) return;

        io.to(roomId).emit("participant-media-updated", {
          userId,
          isMicOn: participant.isMicOn,
          isCameraOn: participant.isCameraOn,
        });
      } catch (err) {
        console.error("Media Toggle Error:", err);
      }
    });

    socket.on("offer", ({ to, offer, from }) => {
      io.to(to).emit("offer", { offer, from });
    });

    socket.on("answer", ({ to, answer, from }) => {
      io.to(to).emit("answer", { answer, from });
    });

    socket.on("ice-candidate", ({ to, candidate, from }) => {
      io.to(to).emit("ice-candidate", { candidate, from });
    });

    socket.on("disconnecting", () => {
      if (socket.roomId) {
        socket.to(socket.roomId).emit("user-left", {
          socketId: socket.id,
        });
      }
    });

    socket.on("disconnect", async () => {
      try {
        console.log("User disconnected:", socket.id);

        const { roomId } = socket;
        if (!roomId) return;

        const participant = await Participant.findOne({
          socketId: socket.id,
        });

        if (!participant) return;
        if (participant.status === "left") return;

        if (["waiting", "joined", "accepted"].includes(participant.status)) {
          participant.status = "left";
          participant.leftAt = new Date();
          participant.socketId = null;

          await participant.save();

          console.log(`Participant ${participant.user} marked as LEFT`);

          const waitingList = await Participant.find({
            room: participant.room,
            status: "waiting",
          }).populate("user", "name email");

          io.to(roomId).emit("waiting-list-updated", waitingList);

          const joinedList = await Participant.find({
            room: participant.room,
            status: "joined",
          }).populate("user", "name email");

          io.to(roomId).emit("participants-updated", joinedList);

          if (participant.role === "interviewer") {
            io.to(roomId).emit("interviewer-left");
          }
        }
      } catch (error) {
        console.error("Disconnect Error:", error);
      }
    });
  });
};

export const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
};
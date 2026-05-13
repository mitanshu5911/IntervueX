import Participant from "../../models/Participant.js";
import Room from "../../models/Room.js";
import { getIO } from "../../socket/socketHandler.js";
export const acceptParticipant = async (req, res) => {
  try {
    const { roomId, participantId } = req.params;

    const room = await Room.findOne({ roomId, isDeleted: false });
    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found"
      });
    }

    const participant = await Participant.findOne({
      _id: participantId,
      room: room._id
    });

    if (!participant) {
      return res.status(404).json({
        success: false,
        message: "Participant not found"
      });
    }

    if (participant.status !== "waiting") {
      return res.status(400).json({
        success: false,
        message: "Participant is not in waiting state"
      });
    }

    participant.status = "joined";
    participant.joinedAt = new Date();

    await participant.save();

    const io = getIO();

    if (participant.socketId) {
      io.to(participant.socketId).emit("join-approved");
    }

    const waitingList = await Participant.find({
      room: room._id,
      status: "waiting"
    }).populate("user", "name email");

    io.to(roomId).emit("waiting-list-updated", waitingList);

    const joinedList = await Participant.find({
      room: room._id,
      status: "joined"
    }).populate("user", "name email");

    io.to(roomId).emit("participants-updated", joinedList);

    return res.status(200).json({
      success: true,
      message: "Participant accepted",
      participant
    });

  } catch (error) {
    console.error("Accept Participant Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to accept participant"
    });
  }
};
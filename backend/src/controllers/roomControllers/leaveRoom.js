import Participant from "../../models/Participant.js";
import Room from "../../models/Room.js";

export const leaveRoom = async (req, res) => {
  try {
    const { roomId } = req.params;

    const room = await Room.findOne({ roomId, isDeleted: false });
    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found"
      });
    }

    const participant = await Participant.findOne({
      room: room._id,
      user: req.user._id
    });

    if (!participant) {
      return res.status(404).json({
        success: false,
        message: "Participant not found"
      });
    }

    // 🔥 update state
    participant.status = "left";
    participant.leftAt = new Date();
    participant.socketId = null;

    await participant.save();

    return res.status(200).json({
      success: true,
      message: "Left room successfully"
    });

  } catch (error) {
    console.error("Leave Room Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to leave room"
    });
  }
};
import Participant from "../../models/Participant.js";
import Room from "../../models/Room.js";

export const getJoinedParticipants = async (req, res) => {
  try {
    const { roomId } = req.params;

    const room = await Room.findOne({ roomId, isDeleted: false });
    if (!room) {
      return res.status(404).json({
        success: false,
        message: "Room not found"
      });
    }

    const participants = await Participant.find({
      room: room._id,
      status: "joined"
    })
      .populate("user", "name email")
      .lean();

    return res.status(200).json({
      success: true,
      count: participants.length,
      participants
    });

  } catch (error) {
    console.error("Get Joined Participants Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch participants"
    });
  }
};
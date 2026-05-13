import Participant from "../../models/Participant.js";
import Room from "../../models/Room.js";

export const updateMediaState = async (req, res) => {
  try {
    const { roomId } = req.params;
    const { isMicOn, isCameraOn } = req.body;

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

    if (typeof isMicOn === "boolean") {
      participant.isMicOn = isMicOn;
    }

    if (typeof isCameraOn === "boolean") {
      participant.isCameraOn = isCameraOn;
    }

    await participant.save();

    return res.status(200).json({
      success: true,
      message: "Media state updated",
      media: {
        isMicOn: participant.isMicOn,
        isCameraOn: participant.isCameraOn
      }
    });

  } catch (error) {
    console.error("Update Media Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update media state"
    });
  }
};
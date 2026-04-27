import Room from "../../models/Room.js";
import Invitation from "../../models/Invitation.js";
import { nanoid } from "nanoid";
import { createRoomValidation } from "../../services/validations/room/createRoomValidations.js";
import { sendRoomInvites, sendHostEmail } from "../../services/emails/room/sendRoomInvites.js";
import User from "../../models/User.js";

export const createRoom = async (req, res) => {
  try {
    const validation = createRoomValidation(req.body);

    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: validation.error,
        invalidEmails: validation.invalidEmails || []
      });
    }

    const {
      title,
      description,
      scheduledAt,
      maxParticipants,
      guestList,
      features,
      recordingEnabled
    } = validation.data;

    const interviewer = req.user;

    const activeRooms = await Room.countDocuments({
      interviewer: interviewer._id,
      status: { $in: ["scheduled", "active"] },
      isDeleted: false
    });

    if (activeRooms >= 3) {
      return res.status(403).json({
        success: false,
        message: "You can only create 3 active/scheduled rooms"
      });
    }

    const room = await Room.create({
      roomId: nanoid(10),
      title,
      description,
      scheduledAt,
      maxParticipants,
      interviewer: interviewer._id,
      features,
      recordingEnabled
    });

    if (guestList.length > 0) {
      const invites = guestList.map((email) => ({
        room: room._id,
        email,
        invitedBy: interviewer._id
      }));

      await Invitation.insertMany(invites);
    }

    const roomLink = `${process.env.FRONTEND_URL}/room/${room.roomId}`;

    sendHostEmail({ interviewer, room, roomLink }).catch(console.error);

    const interviewerDetail = await User.findById(req.user._id);

    if (guestList.length > 0) {
      sendRoomInvites({
        emails: guestList,
        room,
        roomLink,
        interviewerDetail
      }).catch(console.error);
    }

    return res.status(201).json({
      success: true,
      message: "Room created successfully",
      roomId: room.roomId
    });

  } catch (error) {
    console.error("Create Room Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create room"
    });
  }
};


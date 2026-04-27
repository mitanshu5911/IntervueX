import Invitation from "../../models/Invitation.js";
import Room from "../../models/Room.js";
import { getRoomStatus } from "../../utils/roomStatus.js";

export const getScheduledRoomsForMe = async (req, res) => {
  try {
    const userEmail = req.user.email;
    const { status, search, fromDate, toDate } = req.query;

    let statusArray = null;

    if (status) {
      statusArray = status.split(",");

      const validStatuses = ["active", "scheduled", "ended"];

      const isValid = statusArray.every((s) =>
        validStatuses.includes(s)
      );

      if (!isValid) {
        return res.status(400).json({
          success: false,
          message: "Invalid status filter",
        });
      }
    }

    const invitations = await Invitation.find({
      email: userEmail,
    })
      .populate({
        path: "room",
        select: "-__v",
        populate: {
          path: "interviewer",
          select: "name email",
        },
      })
      .lean();

    const rooms = [];
    const bulkUpdates = [];

    for (const inv of invitations) {
      const room = inv.room;

      if (!room || room.isDeleted) continue;

      const liveStatus = getRoomStatus(room);

      if (room.status !== liveStatus) {
        bulkUpdates.push({
          updateOne: {
            filter: {
              _id: room._id,
              status: { $ne: liveStatus },
            },
            update: { $set: { status: liveStatus } },
          },
        });
      }

      if (
        search &&
        !room.title.toLowerCase().includes(search.toLowerCase())
      ) {
        continue;
      }

      if (fromDate || toDate) {
        const scheduled = new Date(room.scheduledAt);

        if (fromDate && scheduled < new Date(fromDate)) continue;
        if (toDate && scheduled > new Date(toDate)) continue;
      }

      if (statusArray && !statusArray.includes(liveStatus)) {
        continue;
      }

      rooms.push({
        _id: room._id,
        roomId: room.roomId,
        title: room.title,
        description: room.description,
        scheduledAt: room.scheduledAt,
        status: liveStatus,
        interviewer: room.interviewer, 
      });
    }

    if (bulkUpdates.length > 0) {
      await Room.bulkWrite(bulkUpdates);
    }

    return res.status(200).json({
      success: true,
      count: rooms.length,
      rooms,
    });
  } catch (error) {
    console.error("Get Invitations Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch invitations",
    });
  }
};
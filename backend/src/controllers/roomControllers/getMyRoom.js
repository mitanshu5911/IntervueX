import Room from "../../models/Room.js";
import { getRoomStatus } from "../../utils/roomStatus.js";

export const getMyRooms = async (req, res) => {
  try {
    const { status, search, fromDate, toDate } = req.query;

  let statusArray = null;

if (status) {
  statusArray = status.split(",");

  const validStatuses = ["active", "scheduled", "ended"];

  const isValid = statusArray.every((s) => validStatuses.includes(s));

  if (!isValid) {
    return res.status(400).json({
      success: false,
      message: "Invalid status filter"
    });
  }
}

    const query = {
      interviewer: req.user._id,
      isDeleted: false
    };

    if (search) {
      query.title = {
        $regex: search,
        $options: "i"
      };
    }

    if (fromDate || toDate) {
      query.scheduledAt = {};

      if (fromDate) {
        query.scheduledAt.$gte = new Date(fromDate);
      }

      if (toDate) {
        query.scheduledAt.$lte = new Date(toDate);
      }
    }

    const rooms = await Room.find(query)
      .select("-password -__v")
      .sort({ createdAt: -1 })
      .lean();

    const filteredRooms = [];
    const bulkUpdates = [];

    for (const room of rooms) {
      const liveStatus = getRoomStatus(room);

      if (room.status !== liveStatus) {
        bulkUpdates.push({
          updateOne: {
            filter: { _id: room._id, status: { $ne: liveStatus } },
            update: { $set: { status: liveStatus } }
          }
        });
      }

      if (!status || statusArray.includes(liveStatus)) {
        filteredRooms.push({
          ...room,
          status: liveStatus
        });
      }
    }

    if (bulkUpdates.length > 0) {
      await Room.bulkWrite(bulkUpdates);
    }

    return res.status(200).json({
      success: true,
      count: filteredRooms.length,
      rooms: filteredRooms
    });

  } catch (error) {
    console.error("Get My Rooms Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch rooms"
    });
  }
};
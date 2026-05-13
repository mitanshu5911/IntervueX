import Room from '../../models/Room.js';
import Participant from '../../models/Participant.js';
import { getRoomStatus } from '../../utils/roomStatus.js';

export const getRoomById = async (req, res) => {
    try {
        const { roomId } = req.params;

        const room = await Room.findOne({
            roomId,
            isDeleted: false
        })
            .select("-password -__v")
            .populate("interviewer", "name email");

        if (!room) {
            return res.status(404).json({
                success: false,
                message: "Room not found"
            });
        }

        const liveStatus = getRoomStatus(room);

        if (room.status !== liveStatus) {
            await Room.updateOne(
                { _id: room._id, status: { $ne: liveStatus } },
                { $set: { status: liveStatus } }
            );
        }

        let participant = await Participant.findOne({
            room: room._id,
            user: req.user._id
        }).populate("user", "name email");

        const isInterviewer = room.interviewer._id.equals(req.user._id);

        if (!participant) {
            participant = await Participant.create({
                user: req.user._id,
                room: room._id,
                role: isInterviewer ? "interviewer" : "candidate",
                status: isInterviewer ? "joined" : "waiting",
                joinedAt: isInterviewer ? new Date() : null
            });

        } else {
            if (participant.status === "left" || participant.status === "rejected") {

                participant.status = isInterviewer ? "joined" : "waiting";
                participant.joinedAt = isInterviewer ? new Date() : null;
                participant.leftAt = null;

                await participant.save();
            }
        }

        return res.status(200).json({
            success: true,
            room: {
                ...room.toObject(),
                status: liveStatus,
            },
            participant
        });

    } catch (error) {
        console.error("Get Room Error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to fetch room"
        });
    }
};
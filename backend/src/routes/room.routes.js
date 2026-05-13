import express from "express";
import { createRoom } from "../controllers/roomControllers/createRoom.js";
import {protect} from "../middlewares/auth.middleware.js"
import { getMyRooms } from "../controllers/roomControllers/getMyRoom.js";
import { getScheduledRoomsForMe } from "../controllers/roomControllers/scheduledForMe.js";
import { getRoomById } from "../controllers/roomControllers/getRoomById.js";
import { getJoinedParticipants } from "../controllers/roomControllers/getJoinedParticipants.js";
import { getWaitingParticipants } from "../controllers/roomControllers/getWaitingParticipants.js";
import { acceptParticipant } from "../controllers/roomControllers/acceptParticipant.js";
import { rejectParticipant } from "../controllers/roomControllers/rejectParticipant.js";
import { leaveRoom } from "../controllers/roomControllers/leaveRoom.js";
import { updateMediaState } from "../controllers/roomControllers/updateMediaState.js";

const router = express.Router();

router.post("/create-room", protect, createRoom);

router.get("/get-my-meetings", protect, getMyRooms);

router.get("/scheduled-for-me", protect, getScheduledRoomsForMe);

router.get('/:roomId', protect, getRoomById);

router.get('/:roomId/participants',protect, getJoinedParticipants);

router.get('/:roomId/waiting-participants',protect, getWaitingParticipants);

router.patch('/:roomId/participant/:participantId/accept',protect, acceptParticipant);

router.patch('/:roomId/participant/:participantId/reject',protect, rejectParticipant);

router.post('/:roomId/leave',protect, leaveRoom);

router.patch('/:roomId/media',protect,updateMediaState);




export default router;

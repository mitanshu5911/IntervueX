import express from "express";
import { createRoom } from "../controllers/roomControllers/createRoom.js";
import {protect} from "../middlewares/auth.middleware.js"
import { getMyRooms } from "../controllers/roomControllers/getMyRoom.js";
import { getScheduledRoomsForMe } from "../controllers/roomControllers/scheduledForMe.js";

const router = express.Router();

router.post("/create-room", protect, createRoom);

router.get("/get-my-meetings", protect, getMyRooms);

router.get("/scheduled-for-me", protect, getScheduledRoomsForMe);

export default router;

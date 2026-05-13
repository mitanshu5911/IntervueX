import mongoose from "mongoose";

const participantSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },

    role: {
      type: String,
      enum: ["interviewer", "candidate"],
      required: true,
    },

    status: {
      type: String,
      enum: ["waiting", "accepted", "rejected", "joined", "left"],
      default: "waiting",
    },

    socketId: {
      type: String,
      default: null,
    },

    isMicOn: {
      type: Boolean,
      default: true
    },

    isCameraOn: {
      type: Boolean,
      default: true
    },

    joinedAt: {
      type: Date,
      default: null,
    },

    leftAt: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Participant", participantSchema);
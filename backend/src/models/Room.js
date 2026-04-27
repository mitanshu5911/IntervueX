import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    roomId: {
      type: String,
      required: true,
      unique: true,
      index: true
    },

    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100
    },

    description: {
      type: String,
      trim: true,
      maxlength: 500
    },

    interviewer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true
    },

    scheduledAt: {
      type: Date,
      required: true
    },

    status: {
      type: String,
      enum: ["scheduled", "active", "ended"],
      default: "scheduled",
      index: true
    },

    maxParticipants: {
      type: Number,
      default: 2,
      min: 2,
      max: 15
    },

    features: {
      video: { type: Boolean, default: true },
      chat: { type: Boolean, default: true },
      codeEditor: { type: Boolean, default: true },
      whiteboard: { type: Boolean, default: true }
    },

    recordingEnabled: {
      type: Boolean,
      default: false
    },

    startedAt: Date,
    endedAt: Date,

    isDeleted: {
      type: Boolean,
      default: false,
      index: true
    }
  },
  { timestamps: true }
);

roomSchema.index({ interviewer: 1, status: 1 });
roomSchema.index({ scheduledAt: 1 });

export default mongoose.model("Room", roomSchema);
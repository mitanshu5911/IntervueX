import mongoose from "mongoose";

const invitationSchema = new mongoose.Schema(
  {
    room: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true,
      index: true
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true
    },

    invitedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    viewed: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

// prevent duplicate invite
invitationSchema.index({ room: 1, email: 1 }, { unique: true });

export default mongoose.model("Invitation", invitationSchema);
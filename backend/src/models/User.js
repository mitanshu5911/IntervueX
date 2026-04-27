import mongoose from "mongoose";
import validator from "validator";

const UserSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 50,
    },

    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate: [validator.isEmail, "Invalid email"],
        index: true,
    },

    googleId: {
        type: String,
        required: true,
        unique: true,
    },

    avatar: {
        type: String,
        default: "",
    },

    isVerified: {
        type: Boolean,
        default: true, 
    },

    isActive: {
        type: Boolean,
        default: true,
    },

    lastLogin: {
        type: Date,
    },

}, {
    timestamps: true,
});

export default mongoose.model("User", UserSchema);
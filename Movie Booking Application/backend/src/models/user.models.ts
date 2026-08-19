import mongoose, { Schema } from "mongoose";
import type { AuthAdminProps } from "../types";

const userSchema = new Schema<AuthAdminProps>({
    name: {
        type: String,
        required: [true, "Name is required"],
        trim: true,
        minlength: [3, "Name must be at least 3 characters"],
    },

    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[\w-]{2,}$/, "Please provide a valid email address",],
    },

    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters"],
    },

    userRole: {
        type: String,
        enum: ["CUSTOMER", "ADMIN"],
        default: "CUSTOMER",
    },

    userStatus: {
        type: String,
        enum: ["APPROVED", "BLOCKED"],
        default: "APPROVED",
    },
}, {
    timestamps: true,
});

const UserModel = mongoose.model<AuthAdminProps>("User", userSchema);

export default UserModel;
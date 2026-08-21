import mongoose, { Schema } from "mongoose";
import type { UserDocument } from "../types";
import bcrypt from "bcrypt";
import { USER_ROLES, USER_STATUS } from "../constants/constants";

const userSchema = new Schema<UserDocument>({
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
        match: [
            /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[\w-]{2,}$/,
            "Please provide a valid email address",
        ],
    },

    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "Password must be at least 6 characters"],
    },

    userRole: {
        type: String,
        enum: Object.values(USER_ROLES),
        default: USER_ROLES.customer,
    },

    userStatus: {
        type: String,
        enum: Object.values(USER_STATUS),
        default: USER_STATUS.approved,
    },
}, {
    timestamps: true,
}
);

// Pre-save middleware to hash the password
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error as Error);
    }
});

// Check password
userSchema.methods.isValidPassword = async function (password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
};

const UserModel = mongoose.model<UserDocument>("User", userSchema);

export default UserModel;
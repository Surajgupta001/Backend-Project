import mongoose, { Schema } from "mongoose";
import type { AuthAdminProps } from "../types";
import bcrypt from "bcrypt";

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

// Pre-save middleware to hash the password before saving the user document
userSchema.pre("save", async function (next) {
    // Skip hashing if the password has not been modified
    if (!this.isModified("password")) {
        return next();
    }

    try {
        // Generate salt
        const salt = await bcrypt.genSalt(10);
        
        // Hash the password
        this.password = await bcrypt.hash(this.password, salt);

        // Continue saving the document
        next();
    } catch (error) {
        // Pass the error to Mongoose
        next(error as Error);
    }
});

const UserModel = mongoose.model<AuthAdminProps>("User", userSchema);

export default UserModel;
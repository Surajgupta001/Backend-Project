import mongoose, { Schema } from "mongoose";
import type { TheatreProps } from "../types";

const theatreSchema = new Schema<TheatreProps>({
    name: {
        type: String,
        required: [true, "Theatre name is required"],
        trim: true,
        minlength: [3, "Theatre name must be at least 3 characters"],
    },
    description: {
        type: String,
        required: [true, "Theatre description is required"],
        trim: true,
    },
    city: {
        type: String,
        required: [true, "City is required"],
        trim: true,
    },
    pinCode: {
        type: Number,
        required: [true, "Pin code is required"],
        validate: {
            validator: (v: number) => v.toString().length === 6,
            message: "Pin code must be exactly 6 digits",
        },
    },
    address: {
        type: String,
        required: [true, "Address is required"],
        trim: true,
    },
    movies: {
        type: [Schema.Types.ObjectId],
        ref: "Movie",
        default: [],
    }
}, {
    timestamps: true,
});

const TheatreModel = mongoose.model<TheatreProps>("Theatre", theatreSchema);

export default TheatreModel;
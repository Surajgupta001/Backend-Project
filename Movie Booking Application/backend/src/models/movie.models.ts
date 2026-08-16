import mongoose, { Schema } from "mongoose";
import type { MovieProps } from "../types";

const movieSchema = new Schema<MovieProps>({
    name: {
        type: String,
        required: [true, "Movie name is required"],
        trim: true,
    },
    description: {
        type: String,
        required: [true, "Movie description is required"],
        trim: true,
    },
    cast: {
        type: [String],
        required: [true, "Movie cast is required"],
        validate: {
            validator: (v: string[]) => v.length > 0,
            message: "Cast must have at least one member",
        },
    },
    trailerUrl: {
        type: String,
        required: [true, "Trailer URL is required"],
        trim: true,
    },
    language: {
        type: String,
        required: [true, "Language is required"],
        default: "English",
        trim: true,
    },
    releaseDate: {
        type: Date,
        required: [true, "Release date is required"],
    },
    director: {
        type: String,
        required: [true, "Director name is required"],
        trim: true,
    },
    releaseStatus: {
        type: String,
        enum: {
            values: ["UPCOMING", "RELEASED", "ENDED"],
            message: "Release status must be one of: UPCOMING, RELEASED, ENDED",
        },
        default: "RELEASED",
        required: true,
    },
}, {
    timestamps: true,
});

const MovieModel = mongoose.model<MovieProps>("Movie", movieSchema);

export default MovieModel;
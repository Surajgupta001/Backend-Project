import mongoose, { Schema } from "mongoose";

const movieSchema = new Schema<MovieProps>({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    caste: {
        type: [String],
        required: true
    },
    trailerUrl: {
        type: String,
        required: true
    },
    language: {
        type: String,
        required: true,
        default: "English"
    },
    releaseDate: {
        type: String,
        required: true
    },
    director: {
        type: String,
        required: true
    },
    releaseStatus: {
        type: String,
        required: true,
        default: "RELEASED"
    }
}, {
    timestamps: true,
});

const MovieModel = mongoose.model<MovieProps>("Movie", movieSchema);

export default MovieModel;
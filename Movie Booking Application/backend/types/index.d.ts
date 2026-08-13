import type { Types } from "mongoose";

declare global {
    type MovieProps = {
        name: string;
        description: string;
        cast: string[];
        trailerUrl: string;
        language: string;
        releaseDate: Date;
        director: string;
        releaseStatus: "UPCOMING" | "RELEASED" | "ENDED";
    };

    type TheatreProps = {
        name: string;
        description: string;
        city: string;
        pinCode: number;
        address: string;
        movies: Types.ObjectId[];
    };
}

export { };
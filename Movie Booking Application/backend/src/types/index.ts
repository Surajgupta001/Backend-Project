import type mongoose from "mongoose";

export interface MovieProps {
    name: string;
    description: string;
    cast: string[];
    trailerUrl: string;
    language: string;
    releaseDate: Date;
    director: string;
    releaseStatus: "UPCOMING" | "RELEASED" | "ENDED";
}

export interface TheatreProps {
    name: string;
    description: string;
    city: string;
    pinCode: number;
    address: string;
    movies?: mongoose.Types.ObjectId[];
}

export interface PaginationProps {
    page: number;
    limit: number;
}

export interface AuthAdminProps {
    name: string;
    email: string;
    password: string;
    userRole: "CUSTOMER" | "ADMIN";
    userStatus: "APPROVED" | "BLOCKED";
}
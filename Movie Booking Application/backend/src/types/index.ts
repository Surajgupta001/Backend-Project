import type mongoose from "mongoose";
import type { Document } from "mongoose";
import type { UserRole, UserStatus } from "../constants/constants";

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
    userRole: UserRole;
    userStatus: UserStatus;
}

export interface UserDocument extends AuthAdminProps, Document {
    isValidPassword(password: string): Promise<boolean>;
}
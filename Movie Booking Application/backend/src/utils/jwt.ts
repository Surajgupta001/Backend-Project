import jwt from "jsonwebtoken";
import type { UserRole } from "../constants/constants";

export interface JwtPayload {
    userId: string;
    role: UserRole;
}

const accessTokenSecret = process.env.JWT_ACCESS_SECRET;
const refreshTokenSecret = process.env.JWT_REFRESH_SECRET;

if (!accessTokenSecret) {
    throw new Error("JWT_ACCESS_SECRET is not configured");
}

if (!refreshTokenSecret) {
    throw new Error("JWT_REFRESH_SECRET is not configured");
}

/**
 * Generate access token.
 */
export const generateAccessToken = (payload: JwtPayload): string => {
    return jwt.sign(payload, accessTokenSecret, {
        expiresIn: "15m",
    });
};

/**
 * Generate refresh token.
 */
export const generateRefreshToken = (payload: JwtPayload): string => {
    return jwt.sign(payload, refreshTokenSecret, {
        expiresIn: "7d",
    });
};

/**
 * Verify access token.
 */
export const verifyAccessToken = (token: string): JwtPayload => {
    return jwt.verify(
        token,
        accessTokenSecret
    ) as JwtPayload;
};

/**
 * Verify refresh token.
 */
export const verifyRefreshToken = (token: string): JwtPayload => {
    return jwt.verify(
        token,
        refreshTokenSecret
    ) as JwtPayload;
};
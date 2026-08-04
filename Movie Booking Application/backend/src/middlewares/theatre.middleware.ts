import type { NextFunction, Request, Response } from "express";

export const validateTheatreCreateRequest = (req: Request, res: Response, next: NextFunction) => {

    const { name, description, city, pinCode, addresses } = req.body;

    // Name
    if (!name || typeof name !== "string") {
        return res.status(400).json({
            success: false,
            message: "Theatre name is required and must be a string.",
        });
    }

    // Description
    if (!description || typeof description !== "string") {
        return res.status(400).json({
            success: false,
            message: "Theatre description is required and must be a string.",
        });
    }

    // City
    if (!city || typeof city !== "string") {
        return res.status(400).json({
            success: false,
            message: "City is required and must be a string.",
        });
    }

    // Pincode
    if (pinCode === undefined || typeof pinCode !== "number") {
        return res.status(400).json({
            success: false,
            message: "Pin code is required and must be a number.",
        });
    }

    if (pinCode.toString().length !== 6) {
        return res.status(400).json({
            success: false,
            message: "Pin code must contain exactly 6 digits.",
        });
    }

    // Address
    if (!addresses || typeof addresses !== "string") {
        return res.status(400).json({
            success: false,
            message: "Address is required and must be a string.",
        });
    }

    next();
};
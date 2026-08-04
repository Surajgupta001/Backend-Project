import type { Request, Response } from "express";
import { createTheatreService } from "../services/theatre.service";

// Create Theatre
// POST /api/v1/theatres
export const createTheatre = async (req: Request, res: Response) => {
    try {
        const theatre = await createTheatreService(req.body);

        return res.status(201).json({
            success: true,
            message: "Theatre created successfully",
            data: theatre,
        });

    } catch (error) {
        console.error("Error creating theatre:", error);

        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};
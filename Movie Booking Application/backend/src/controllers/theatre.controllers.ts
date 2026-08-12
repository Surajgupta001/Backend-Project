import type { Request, Response } from "express";
import { createTheatreService, deleteTheatreService, getAllTheatresService, getTheatresService } from "../services/theatre.service";

// Create Theatre
// POST /api/v1/theatres
export const createTheatre = async (req: Request, res: Response) => {
    try {
        const theatre = await createTheatreService(req.body);

        return res
            .status(201)
            .json({
                success: true,
                message: "Theatre created successfully",
                data: theatre,
            });

    } catch (error) {
        console.error("Error creating theatre:", error);

        return res
            .status(500)
            .json({
                success: false,
                message: "Internal Server Error",
            });
    }
};

// Get All Theatres
// GET /api/v1/theatres
export const getAllTheatres = async (req: Request, res: Response) => {
    try {
        const theatres = await getAllTheatresService();

        return res
            .status(200)
            .json({
                success: true,
                message: "Theatres fetched successfully",
                count: theatres.length,
                data: theatres,
            });

    } catch (error) {
        console.error("Error fetching theatres:", error);

        return res
            .status(500)
            .json({
                success: false,
                message: "Internal Server Error",
            });
    }
};

// Get Theatre by ID
// GET /api/v1/theatres/:id
export const getTheatre = async (req: Request, res: Response) => {
    try {
        const theatreId = req.params.id as string;

        const theatre = await getTheatresService(theatreId);

        if (!theatre) {
            return res
                .status(404)
                .json({
                    success: false,
                    message: "Theatre not found",
                });
        }

        return res
            .status(200)
            .json({
                success: true,
                message: "Theatre retrieved successfully",
                data: theatre,
            });
    } catch (error) {
        console.error("Error fetching theatre:", error);

        return res
            .status(500)
            .json({
                success: false,
                message: "Internal Server Error",
            });
    }
};

// delete Theatre
// DELETE /api/v1/theatres/:id
export const deleteTheatre = async (req: Request, res: Response) => {
    try {
        const theatreId = req.params.id as string;

        const theatre = await deleteTheatreService(theatreId);

        if (!theatre) {
            return res
                .status(404)
                .json({
                    success: false,
                    message: "Theatre not found",
                });
        };

        return res
            .status(200)
            .json({
                success: true,
                message: "Theatre deleted successfully",
                data: theatre,
            });
    } catch (error) {
        console.error("Error deleting theatre:", error);

        return res
            .status(500)
            .json({
                success: false,
                message: "Internal Server Error",
            });
    }
};
import type { Request, Response } from "express";
import { asyncHandler } from "../utils/asyncHandler";
import { ApiError } from "../utils/ApiError";
import { ApiResponse } from "../utils/ApiResponse";
import { ErrorCode } from "../utils/errorCodes";
import {
    createTheatreService,
    deleteTheatreService,
    getAllTheatresService,
    getTheatreByIdService,
    updateTheatreService,
} from "../services/theatre.service";

/**
 * Create Theatre
 * POST /api/v1/theatres
 */
export const createTheatre = asyncHandler(async (req: Request, res: Response) => {
    const theatre = await createTheatreService(req.body);

    res.status(201).json(
        new ApiResponse(201, theatre, "Theatre created successfully"),
    );
});

/**
 * Get All Theatres
 * GET /api/v1/theatres
 */
export const getAllTheatres = asyncHandler(async (_req: Request, res: Response) => {
    const theatres = await getAllTheatresService();

    res.status(200).json(
        new ApiResponse(200, theatres, "Theatres fetched successfully"),
    );
});

/**
 * Get Theatre by ID
 * GET /api/v1/theatres/:id
 */
export const getTheatre = asyncHandler(async (req: Request, res: Response) => {
    const theatre = await getTheatreByIdService(req.params.id as string);

    if (!theatre) {
        throw new ApiError(404, ErrorCode.THEATRE_NOT_FOUND, "Theatre not found");
    }

    res.status(200).json(
        new ApiResponse(200, theatre, "Theatre fetched successfully"),
    );
});

/**
 * Update Theatre
 * PUT /api/v1/theatres/:id
 */
export const updateTheatre = asyncHandler(async (req: Request, res: Response) => {
    const theatre = await updateTheatreService(req.params.id as string, req.body);

    if (!theatre) {
        throw new ApiError(404, ErrorCode.THEATRE_NOT_FOUND, "Theatre not found");
    }

    res.status(200).json(
        new ApiResponse(200, theatre, "Theatre updated successfully"),
    );
});

/**
 * Delete Theatre
 * DELETE /api/v1/theatres/:id
 */
export const deleteTheatre = asyncHandler(async (req: Request, res: Response) => {
    const theatre = await deleteTheatreService(req.params.id as string);

    if (!theatre) {
        throw new ApiError(404, ErrorCode.THEATRE_NOT_FOUND, "Theatre not found");
    }

    res.status(200).json(
        new ApiResponse(200, theatre, "Theatre deleted successfully"),
    );
});
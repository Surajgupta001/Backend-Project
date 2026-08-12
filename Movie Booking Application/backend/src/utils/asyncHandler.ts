import type { Request, Response, NextFunction } from "express";

/**
 * Higher-order function that wraps async Express route handlers.
 *
 * Catches any rejected promise and forwards the error to Express's
 * `next()` so the centralized error-handling middleware can process it.
 * This eliminates the need for try/catch blocks in every controller.
 *
 * @example
 *   router.get("/movies", asyncHandler(async (req, res) => {
 *       const movies = await getAllMovies();
 *       res.json(new ApiResponse(200, movies, "OK"));
 *   }));
 */
export const asyncHandler = (
    fn: (req: Request, res: Response, next: NextFunction) => Promise<void | Response>
) => {
    return (req: Request, res: Response, next: NextFunction): void => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};

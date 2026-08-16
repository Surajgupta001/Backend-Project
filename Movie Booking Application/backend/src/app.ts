import express from "express";
import cors from "cors";
import "dotenv/config";
import routes from "./routes";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import { ApiError } from "./utils/ApiError";
import { ErrorCode } from "./utils/errorCodes";

const app = express();

// ── Core Middleware ──────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Health Check ─────────────────────────────────────
app.get("/", (_req, res) => {
    res.status(200).json({
        success: true,
        message: "API is running 🚀",
        timestamp: new Date().toISOString(),
    });
});

// ── API Routes ───────────────────────────────────────
app.use("/api/v1", routes);

// ── 404 Catch-All (must be AFTER all routes) ─────────
app.use((req, _res, next) => {
    next(
        new ApiError(
            404,
            ErrorCode.ROUTE_NOT_FOUND,
            `Route ${req.method} ${req.originalUrl} not found`,
        ),
    );
});

// ── Global Error Handler (must be LAST middleware) ───
app.use(errorHandler);

export default app;

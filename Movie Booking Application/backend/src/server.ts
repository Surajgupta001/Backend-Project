import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectDB } from "../config/database";
import movieRoutes from "./routes/movie.routes";
import theatreRoutes from "./routes/theatre.routes";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import { ApiError } from "./utils/ApiError";
import { ErrorCode } from "./utils/errorCodes";

const app = express();
const port = Bun.env.PORT || 5000;

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
app.use("/api/v1/movies", movieRoutes);
app.use("/api/v1/theatres", theatreRoutes);

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

// ── Start Server ─────────────────────────────────────
const startServer = async () => {
    // Wait for DB connection before accepting requests
    await connectDB();

    app.listen(port, () => {
        console.log(`🚀 Server is running on port ${port}`);
        console.log(`📍 http://localhost:${port}`);
    });
};

startServer();

// ── Process-Level Error Safety Nets ──────────────────
process.on("unhandledRejection", (reason) => {
    console.error("🔥 Unhandled Rejection:", reason);
});

process.on("uncaughtException", (error) => {
    console.error("🔥 Uncaught Exception:", error);
    process.exit(1);
});
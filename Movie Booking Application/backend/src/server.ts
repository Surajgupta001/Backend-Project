import app from "./app";
import { connectDB } from "./config/database";

const port = Bun.env.PORT || 5000;

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

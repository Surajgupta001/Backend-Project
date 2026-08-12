import mongoose from "mongoose";

/**
 * Connects to MongoDB using the URI from environment variables.
 * Throws on failure so the caller can decide whether to exit or retry.
 */
export const connectDB = async (): Promise<void> => {
    try {
        const conn = await mongoose.connect(Bun.env.MONGODB_URI as string);
        console.log(`✅ MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.error("❌ MongoDB connection failed:", error);
        process.exit(1);
    }
};
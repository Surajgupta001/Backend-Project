import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { connectDB } from '../config/database';

const app = express();
const port = Bun.env.PORT || 5000;

// Database Connection
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Default Route
app.get('/', (req, res) => {
    res.send('API Working 🚀');
});

// Start Server
app.listen(port, () => {
    console.log(`🚀 Server is running on port ${port}`);
});
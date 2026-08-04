import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { connectDB } from '../config/database';
import movieRoutes from './routes/movie.routes';
import theatreRoutes from './routes/theatre.routes';

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

// API Routes
app.use('/api/v1/movies', movieRoutes);
app.use('/api/v1/theatres', theatreRoutes);

// Start Server
app.listen(port, () => {
    console.log(`🚀 Server is running on port ${port}`);
});
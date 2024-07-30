import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import noteRoutes from './routes/notes.js';

dotenv.config();

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json());
//{ extended: false }

// Define Routes
app.use('/api/notes', noteRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

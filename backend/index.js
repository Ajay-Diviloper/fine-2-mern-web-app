import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import employeeroute from './routers/employeeroute.js'; // Import router

dotenv.config();
import './models/db.js'; // Connect to the database

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Route to handle employee-related endpoints
app.use('/api/employees', employeeroute); // Prefix for employee routes

// Root route
app.get('/', (req, res) => {
    res.send('Server is running');
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

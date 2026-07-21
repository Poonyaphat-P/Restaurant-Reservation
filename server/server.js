import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import multer from "multer";
import fs from "fs";
import authRoutes from "./routes/auth.js";
import menuRoutes from "./routes/menu.js";
import reservationRoutes from "./routes/reservation.js";
import contactRoutes from "./routes/contact.js";
import aboutRoutes from "./routes/about.js";

const requiredEnvVars = ["JWT_SECRET", "MYSQL_HOST", "MYSQL_USERNAME", "MYSQL_PASSWORD", "MYSQL_DATABASE", "PORT"];
const missingEnvVars = requiredEnvVars.filter((key) => !process.env[key]);
if (missingEnvVars.length > 0) {
  throw new Error(`Missing required environment variables: ${missingEnvVars.join(", ")}`);
}

const app = express();
app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));
app.use(express.json());

if (!fs.existsSync('uploads')) fs.mkdirSync('uploads');
app.use('/uploads', express.static('uploads'));

app.use('/api/auth', authRoutes);
app.use('/api', menuRoutes);
app.use('/api', reservationRoutes);
app.use('/api', contactRoutes);
app.use('/api', aboutRoutes);

app.use((req, res) => {
  res.status(404).json({ error: true, message: 'Not found' });
});

app.use((err, req, res, next) => {
  console.error(err);
  if (err instanceof multer.MulterError || err.message === 'Only image files are allowed') {
    return res.status(400).json({ error: true, message: err.message });
  }
  res.status(500).json({ error: true, message: 'Something went wrong. Please try again later.' });
});

app.listen(process.env.PORT, () => {
  console.log("Server running");
});

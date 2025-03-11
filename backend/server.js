import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import facultyRoutes from "./routes/facultyRoutes.js";
import facultyTimeTableRoutes from "./routes/facultyTimeTableRoutes.js";
import studentRoutes from "./routes/StudentRoutes.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";
import facultyFeedbackRoutes from "./routes/facultyFeedbackRoutes.js";


dotenv.config();
const app = express();
const PORT = process.env.PORT || 7000;

// Fix __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (!process.env.MONGO_URL) {
  console.error("❌ MONGO_URL is not defined in environment variables.");
  process.exit(1);
}

// Middleware
app.use(cors());
app.use(express.json());

// 🟢 Serve uploaded images correctly
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// API Routes
app.use("/", userRoutes);
app.use("/", facultyRoutes);
app.use("/", facultyTimeTableRoutes);
app.use("/", studentRoutes);
app.use("/", attendanceRoutes);
app.use("/", facultyFeedbackRoutes);

// Connect to Database & Start Server
connectDB().then(() => {
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
});

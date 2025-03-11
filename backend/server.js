import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { createServer } from "http";
import { Server } from "socket.io";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import facultyRoutes from "./routes/facultyRoutes.js";
import facultyTimeTableRoutes from "./routes/facultyTimeTableRoutes.js";
import studentRoutes from "./routes/StudentRoutes.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";
import facultyFeedbackRoutes from "./routes/facultyFeedbackRoutes.js";
import Message from "./models/messageModel.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 7000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (!process.env.MONGO_URL) {
  console.error("MONGO_URL is missing in environment variables.");
  process.exit(1);
}

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/", userRoutes);
app.use("/", facultyRoutes);
app.use("/", facultyTimeTableRoutes);
app.use("/", studentRoutes);
app.use("/", attendanceRoutes);
app.use("/", facultyFeedbackRoutes);

const server = createServer(app);
const io = new Server(server, {
  cors: { origin: "http://localhost:3000", methods: ["GET", "POST"] }
});

io.on("connection", async (socket) => {
  console.log(`User connected: ${socket.id}`);

  const pastMessages = await Message.find().sort({ timestamp: 1 });
  socket.emit("loadMessages", pastMessages);

  socket.on("sendMessage", async (data) => {
    try {
      if (!data.role) return;

      const newMessage = new Message({
        sender: data.sender,
        role: data.role,
        message: data.message,
        timestamp: new Date()
      });
      
      await newMessage.save();
      io.emit("receiveMessage", newMessage);
    } catch (error) {
      console.error("Error saving message:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

connectDB().then(() => {
  server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

app.get("/messages", async (req, res) => {
  try {
    const messages = await Message.find().sort({ timestamp: 1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

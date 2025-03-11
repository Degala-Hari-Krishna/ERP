import express from "express";
import multer from "multer";
import fs from "fs";
import path from "path";
import {
  getFacultyById,
  updateFacultyProfile,
  getAllFaculties,
} from "../controllers/facultyController.js";

const router = express.Router();

// 🔹 Ensure "uploads/" directory exists
const uploadDir = "uploads/";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// 🔹 Configure Image Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// 🔹 Serve static files from "uploads/" directory
router.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

// 🔹 Upload Profile Image
router.post("/uploadProfileImage", upload.single("profileImage"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  res.json({ filePath: `/uploads/${req.file.filename}` });
});

// 🔹 Get Faculty by ID
router.get("/getFaculty/:facultyId", getFacultyById);

// 🔹 Get All Faculty Details
router.get("/getFaculty", getAllFaculties);

// 🔹 Update Faculty Profile
router.put("/updateFaculty/:facultyId", updateFacultyProfile);

export default router;

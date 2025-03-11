import express from "express";
import Attendance from "../models/Attendance.js";

const router = express.Router();

// ✅ Save or Update Attendance (POST now supports updates)
router.post("/markAttendance", async (req, res) => {
  try {
    const { className, facultyId, date, attendance } = req.body;

    const existingRecord = await Attendance.findOne({ className, date });

    if (existingRecord) {
      // Update existing attendance
      existingRecord.attendance = attendance;
      await existingRecord.save();
      return res.json({ success: true, message: "Attendance updated successfully." });
    } else {
      // Create new attendance record
      const newAttendance = new Attendance({ className, facultyId, date, attendance });
      await newAttendance.save();
      return res.json({ success: true, message: "Attendance recorded successfully." });
    }
  } catch (error) {
    console.error("❌ Error saving attendance:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// ✅ Modify existing attendance (Explicit PUT method)
router.put("/updateAttendance", async (req, res) => {
  try {
    const { className, date, updatedAttendance } = req.body;

    const attendanceRecord = await Attendance.findOne({ className, date });
    if (!attendanceRecord) {
      return res.status(404).json({ success: false, message: "Attendance record not found." });
    }

    attendanceRecord.attendance = updatedAttendance;
    await attendanceRecord.save();

    res.json({ success: true, message: "Attendance modified successfully." });
  } catch (error) {
    console.error("❌ Error updating attendance:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// ✅ Get all attendance records
router.get("/getAttendance", async (req, res) => {
  try {
    const records = await Attendance.find();
    res.json(records);
  } catch (error) {
    console.error("❌ Error fetching attendance:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default router;

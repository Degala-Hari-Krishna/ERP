import mongoose from "mongoose";

const AttendanceSchema = new mongoose.Schema({
  className: { type: String, required: true },
  facultyId: { type: String, required: true },
  date: { type: String, required: true }, // Format: YYYY-MM-DD
  attendance: {
    type: Object, // Example: { "22BQ1A0548": "Present", "22BQ1A0549": "Absent" }
    required: true,
  },
}, { timestamps: true });

const Attendance = mongoose.model("Attendance", AttendanceSchema);
export default Attendance;

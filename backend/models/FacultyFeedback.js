import mongoose from "mongoose";

const facultyFeedbackSchema = new mongoose.Schema({
  facultyId: { type: String, required: true },
  studentId: { type: String, required: true },
  attendance: { type: Number, required: true, min: 1, max: 5 },
  correction: { type: Number, required: true, min: 1, max: 5 },
  rating: { type: Number, required: true, min: 1, max: 5 },
  timestamp: { type: Date, default: Date.now }
});

const FacultyFeedbackModel = mongoose.model("FacultyFeedback", facultyFeedbackSchema);
export default FacultyFeedbackModel;

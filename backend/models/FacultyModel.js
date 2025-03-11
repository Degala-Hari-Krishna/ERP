import mongoose from "mongoose";

const facultySchema = new mongoose.Schema(
  {
    facultyId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    department: { type: String, required: true },
    designation: { type: String, required: true },
    phone: { type: String, required: true },
    qualification: { type: String, required: true },
    experience: { type: Number, required: true },
    profileImage: { type: String, default: "" },
    researchPapers: [
      {
        title: String,
        journal: String,
        year: Number,
      },
    ],
    coursesAssigned: [
      {
        courseCode: String,
        courseName: String,
        year: Number,
        branch: String,
        semester: Number,
        section: String,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("faculty_statics", facultySchema);

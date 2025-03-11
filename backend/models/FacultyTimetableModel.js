import mongoose from "mongoose";

const facultyTimetableSchema = new mongoose.Schema(
  {
    facultyId: { type: String, required: true, unique: true },
    timetable: {
      type: Object,
      required: true,
      properties: {
        monday: { type: Object, required: true },
        tuesday: { type: Object, required: true },
        wednesday: { type: Object, required: true },
        thursday: { type: Object, required: true },
        friday: { type: Object, required: true },
        saturday: { type: Object, required: true },
      }
    }
  },
  { timestamps: true }
);

export default mongoose.model("faculty_time_tables", facultyTimetableSchema);

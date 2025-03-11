import FacultyTimetableModel from "../models/FacultyTimetableModel.js";

// Get all faculty timetables or specific by facultyId
export const getFacultyTimetable = async (req, res) => {
  try {
    const { facultyId } = req.query;

    let facultyTimeTables;
    if (facultyId) {
      facultyTimeTables = await FacultyTimetableModel.findOne({ facultyId });
      if (!facultyTimeTables) {
        return res.status(404).json({ message: "Faculty timetable not found" });
      }
    } else {
      facultyTimeTables = await FacultyTimetableModel.find();
    }

    res.json(facultyTimeTables);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error", details: err.message });
  }
};

import StudentModel from "../models/StudentModel.js";

export const getStudents = async (req, res) => {
  try {
    const students = await StudentModel.find();
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error", details: err.message });
  }
};

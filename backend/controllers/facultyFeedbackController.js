import FacultyFeedback from "../models/FacultyFeedback.js";

export const getFacultyFeedback = async (req, res) => {
  try {
    const feedback= await FacultyFeedback.find();
    res.json(feedback);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error", details: err.message });
  }
}
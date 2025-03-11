import FacultyModel from "../models/FacultyModel.js";

// 🔹 Fetch Faculty by ID
export const getFacultyById = async (req, res) => {
  try {
    const { facultyId } = req.params;
    const faculty = await FacultyModel.findOne({ facultyId });

    if (!faculty) {
      return res.status(404).json({ error: "Faculty not found" });
    }

    res.json(faculty);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error", details: err.message });
  }
};

// 🔹 Update Faculty Profile
export const updateFacultyProfile = async (req, res) => {
  try {
    const { facultyId } = req.params;
    const updatedData = req.body;

    const faculty = await FacultyModel.findOneAndUpdate(
      { facultyId },
      { $set: updatedData },
      { new: true, runValidators: true }
    );

    if (!faculty) {
      return res.status(404).json({ error: "Faculty not found" });
    }

    res.json({ message: "Profile updated successfully", faculty });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error", details: err.message });
  }
};

export const getAllFaculties = async (req, res) => {
  try {
    const faculties = await FacultyModel.find();  // Fetch all faculty records
    res.json(faculties);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch faculty details" });
  }
};
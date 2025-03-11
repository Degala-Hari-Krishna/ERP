import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  class_name: { type: String, required: true }, // Example: "3-CSE-A"
  student_id: { type: String, required: true, unique: true }, // Example: "22BQ1A0548"
  name: {
    first: { type: String, required: true },
    last: { type: String, required: true }
  },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  dob: { type: Date, required: true },
  gender: { type: String, required: true },
  branch: { type: String, required: true },
  year: { type: Number, required: true },
  section: { type: String, required: true },
  roll_number: { type: String, required: true },
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true }
  },
  academic_records: {
    cgpa: { type: Number, required: true },
    backlogs: { type: Number, required: true }
  },
  counselor: {
    name: { type: String, required: true },
    id: { type: String, required: true }
  }
});

// ✅ Export model using ES module syntax
const Student = mongoose.model("Student", studentSchema);
export default Student;

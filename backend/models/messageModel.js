import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  sender: { type: String, required: true }, // "Faculty" or "Student"
  role: { type: String, required: true }, // Ensure role is included
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

const Message = mongoose.model("Message", messageSchema);
export default Message;

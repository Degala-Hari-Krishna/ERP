import mongoose from "mongoose";

const eventFeedbackSchema = new mongoose.Schema({
  eventId: { type: String, required: true },
  facultyId: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  feedback: { type: String, required: true },
  submittedTime: { type: Date, default: Date.now },
});

const EventFeedback = mongoose.model("event_feedbacks", eventFeedbackSchema);
export default EventFeedback;

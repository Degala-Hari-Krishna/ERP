import EventModel from "../models/EventModel.js";
import EventFeedback from "../models/EventFeedbackModel.js";

// ✅ Fetch event details and store feedback
export const submitEventFeedback = async (req, res) => {
  try {
    const { eventId, facultyId, rating, feedback } = req.body;

    // ✅ Check if event exists in the database
    const eventExists = await EventModel.findOne({ eventId });

    if (!eventExists) {
      return res.status(404).json({ error: "Event not found" });
    }

    // ✅ Create new feedback entry
    const newFeedback = new EventFeedback({
      eventId,
      facultyId,
      rating,
      feedback,
    });

    await newFeedback.save();
    res.status(201).json({ message: "Feedback submitted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error", details: err.message });
  }
};

// ✅ Get all feedback for a particular event
export const getEventFeedbacks = async (req, res) => {
  try {
    const { eventId } = req.params;
    const feedbacks = await EventFeedback.find({ eventId });

    if (feedbacks.length === 0) {
      return res.status(404).json({ message: "No feedback found for this event" });
    }

    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error", details: err.message });
  }
};

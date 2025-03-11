import express from "express";
import { submitEventFeedback, getEventFeedbacks } from "../controllers/EventFeedbackController.js";

const router = express.Router();

// ✅ Submit feedback for an event
router.post("/submit", submitEventFeedback);

// ✅ Get feedback for a specific event
router.get("/:eventId", getEventFeedbacks);

export default router;

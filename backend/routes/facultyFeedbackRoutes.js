import express from "express";
import { getFacultyFeedback } from "../controllers/facultyFeedbackController.js";

const router = express.Router();

router.get("/getFacultyFeedback", getFacultyFeedback);

export default router;

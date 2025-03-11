import express from "express";
import { getFacultyTimetable } from "../controllers/facultyTimeTableController.js";

const router = express.Router();

router.get("/getTimeTable", getFacultyTimetable);

export default router;

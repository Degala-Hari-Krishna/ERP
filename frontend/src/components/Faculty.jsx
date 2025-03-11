import React from "react";
import Navbar from "./Navbar2";
import { Routes, Route, NavLink } from "react-router-dom";
import FacultyDashboard from "./FacultyDashboard";
import Notifications from "./Notifications";
import Profile from "./Profile";
import {
  FaClipboardList, FaFileAlt, FaClipboardCheck, FaUsers, FaUserGraduate, FaCalendarCheck,
  FaBell, FaEnvelope, FaBullhorn, FaChartBar, FaUserTie, FaCogs, FaBook, FaTasks, FaClipboard
} from "react-icons/fa"; // Import icons
import "./css/Faculty.css";
import MarkAttendance from "./MarkAttendance";
import ViewAttendance from "./ViewAttendance";
import MyStudent from "./MyStudents";
import ScheduleSessions from "./ScheduleSessions";
import FacultyFeedback from "./Feedback";
import AllStudents from "./AllStudents.jsx";
import FacultyChat from "./FacultyChat";

const Faculty = () => {
  return (
    <div>
      <Navbar />
      <div className="faculty-container">
        {/* Sidebar Menu */}
        <div className="menu">
          <h4>MENU</h4>
          <hr />
          <ul>
            {/* Dashboard */}
            <li>
              <NavLink to="/faculty/dashboard" className={({ isActive }) => isActive ? "active" : ""}>
                <FaChartBar className="menu-icon" /> Dashboard
              </NavLink>
            </li>

            {/* Attendance Management */}
            <li>
              <NavLink to="/faculty/mark-attendance" className={({ isActive }) => isActive ? "active" : ""}>
                <FaClipboardList className="menu-icon" /> Mark Attendance
              </NavLink>
            </li>
            <li>
              <NavLink to="/faculty/view-attendance" className={({ isActive }) => isActive ? "active" : ""}>
                <FaFileAlt className="menu-icon" /> View Attendance
              </NavLink>
            </li>

            {/* Counseling & Student Management */}
            <li>
              <NavLink to="/faculty/my-students" className={({ isActive }) => isActive ? "active" : ""}>
                <FaUsers className="menu-icon" /> My Students
              </NavLink>
            </li>
            <li>
              <NavLink to="/faculty/schedule-session" className={({ isActive }) => isActive ? "active" : ""}>
                <FaCalendarCheck className="menu-icon" /> Schedule Sessions
              </NavLink>
            </li>
            <li>
              <NavLink to="/faculty/student-profiles" className={({ isActive }) => isActive ? "active" : ""}>
                <FaBook className="menu-icon" /> Student Profiles
              </NavLink>
            </li>

            {/* Events & Reports */}
            <li>
              <NavLink to="/faculty/event-requests" className={({ isActive }) => isActive ? "active" : ""}>
                <FaClipboard className="menu-icon" /> Event Requests
              </NavLink>
            </li>
            {/* <li>
              <NavLink to="/faculty/mentorships" className={({ isActive }) => isActive ? "active" : ""}>
                <FaUserTie className="menu-icon" /> Mentorships
              </NavLink>
            </li>
            <li>
              <NavLink to="/faculty/activity-reports" className={({ isActive }) => isActive ? "active" : ""}>
                <FaClipboard className="menu-icon" /> Activity Reports
              </NavLink>
            </li> */}
            <li>
              <NavLink to="/faculty/event-feedback" className={({ isActive }) => isActive ? "active" : ""}>
                <FaClipboard className="menu-icon" /> Event Feedback
              </NavLink>
            </li>

            {/* Communication */}
            <li>
              <NavLink to="/faculty/send-notifications" className={({ isActive }) => isActive ? "active" : ""}>
                <FaBell className="menu-icon" /> Send Notifications
              </NavLink>
            </li>
            <li>
              <NavLink to="/faculty/messages" className={({ isActive }) => isActive ? "active" : ""}>
                <FaEnvelope className="menu-icon" /> Messages
              </NavLink>
            </li>
            <li>
              <NavLink to="/faculty/announcements" className={({ isActive }) => isActive ? "active" : ""}>
                <FaBullhorn className="menu-icon" /> Announcements
              </NavLink>
            </li>

            {/* Profile & Settings */}
            <li>
              <NavLink to="/faculty/profile" className={({ isActive }) => isActive ? "active" : ""}>
                <FaUserTie className="menu-icon" /> Profile
              </NavLink>
            </li>
            <li>
              <NavLink to="/faculty/review" className={({ isActive }) => isActive ? "active" : ""}>
                <FaCogs className="menu-icon" /> Feedback
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className="content">
          <Routes>
            <Route path="/dashboard" element={<FacultyDashboard />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="profile" element={<Profile />} />
            <Route path="mark-attendance" element={<MarkAttendance/>}/>
            <Route path="view-attendance" element={<ViewAttendance/>}/>
            <Route path="my-students" element={<MyStudent/>}/>
            <Route path="schedule-session" element={<ScheduleSessions/>}/>
            <Route path="review" element={<FacultyFeedback/>}/>
            <Route path="student-profiles" element={<AllStudents/>}/>
            <Route path="messages" element={<FacultyChat/>}/>
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default Faculty;

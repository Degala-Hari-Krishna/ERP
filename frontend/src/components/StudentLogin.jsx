import React from "react";
import { Routes, Route, NavLink } from "react-router-dom";
import StudentChat from "./StudentChat"; // Import StudentChat
import Navbar2 from "./Navbar2"; // Import Navbar2

const StudentLogin = () => {
  return (
    <div>
      <Navbar2 />
      <h1>Student Portal</h1>
      <nav>
        <ul>
          <li>
            <NavLink to="/student/chat" className={({ isActive }) => isActive ? "active" : ""}>
              Chat
            </NavLink>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/chat" element={<StudentChat />} /> {/* Student Chat Route */}
      </Routes>
    </div>
  );
};

export default StudentLogin;

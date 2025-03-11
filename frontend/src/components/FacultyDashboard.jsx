import React, { useState, useEffect } from "react";
import axios from "axios";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { FaUserGraduate, FaBook, FaClipboardCheck } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./css/FacultyDashboard.css";

const FacultyDashboard = () => {
  const [date, setDate] = useState(new Date());
  const [faculty, setFaculty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFacultyData = async () => {
      const uid = localStorage.getItem("token");
      if (!uid) {
        navigate("/login"); // Redirect if not authenticated
        return;
      }
      try {
        const response = await axios.get(`http://localhost:8000/getFaculty`);
        const faculties = response.data;
        setFaculty(faculties.find((f) => f.facultyId === uid));
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch faculty details");
        setLoading(false);
      }
    };

    fetchFacultyData();
  }, [navigate]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!faculty) return <p>No Faculty Data Found</p>;

  const stats = [
    { icon: <FaUserGraduate />, number: 120, label: "Total Students" },
    {
      icon: <FaBook />,
      number: faculty.coursesAssigned.length,
      label: "Courses Assigned",
    },
    {
      icon: <FaClipboardCheck />,
      number: faculty.dynamic?.pendingApprovals || 0,
      label: "Pending Approvals",
    },
  ];

  return (
    <div className="faculty-dashboard">
      <div className="dashboard-hero">
        <div className="dashboard-header">
          <h2>Welcome, {faculty.name} 👋</h2>
        </div>

        <div className="stats-container">
          {stats.map((stat, index) => (
            <div className="stat-card" key={index}>
              <div className="stat-icon">{stat.icon}</div>
              <div className="stat-number">{stat.number}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="todays-classes">
          <h3>Courses Assigned 📚</h3>
          <ul>
            {faculty.coursesAssigned.map((course, index) => (
              <li key={index}>
                <strong>
                  {course.courseCode} - {course.courseName}
                </strong>
                <br /> {course.branch} (Year {course.year}, Semester{" "}
                {course.semester}, Section {course.section})
              </li>
            ))}
          </ul>
        </div>

        {/* ✅ Recent Activity Section */}
        <div className="recent-activity">
          <h3>Recent Activity 🔥</h3>
          {faculty.dynamic?.recentActivities?.length > 0 ? (
            <ul>
              {faculty.dynamic.recentActivities.map((activity, index) => (
                <li key={index}>{activity}</li>
              ))}
            </ul>
          ) : (
            <p>No recent activities found</p>
          )}
        </div>
      </div>
<hr/>
      <section className="calendar-and-extras">
        {/* 📆 Calendar */}
        <div className="calendar-container">
          <Calendar onChange={setDate} value={date} />
        </div>

        {/* 🎉 Upcoming Events */}
        <div className="extra-section">
          <h3>Upcoming Events 🎉</h3>
          {faculty.dynamic?.upcomingEvents?.length > 0 ? (
            <ul>
              {faculty.dynamic.upcomingEvents.map((event, index) => (
                <li key={index}>
                  <strong>{event.title}</strong> – {event.date}
                </li>
              ))}
            </ul>
          ) : (
            <p>No upcoming events</p>
          )}
        </div>

        {/* 📢 Announcements */}
        <div className="extra-section">
          <h3>Announcements 📢</h3>
          <ul>
            {faculty.announcements?.map((announcement, index) => (
              <li key={index}>{announcement}</li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default FacultyDashboard;

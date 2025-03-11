import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaUserGraduate, FaBook, FaTrophy, FaEnvelope, FaPhone } from "react-icons/fa";
import "./css/MyStudents.css";

const MyStudents = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const facultyId = localStorage.getItem("token");

  useEffect(() => {
    if (!facultyId) {
      setError("Faculty ID not found.");
      setLoading(false);
      return;
    }

    const fetchStudents = async () => {
      try {
        const response = await axios.get("http://localhost:8000/getStudent");
        const studentData = response.data;

        if (studentData.length > 0 && studentData[0]["3-CSE-A"]) {
          const allStudents = Object.values(studentData[0]["3-CSE-A"]);
          const myStudents = allStudents.filter(
            (student) => student.counselor.id === facultyId
          );

          setStudents(myStudents);
        } else {
          setStudents([]);
        }
      } catch (err) {
        console.error("Error fetching students:", err);
        setError("Failed to fetch students.");
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [facultyId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  if (selectedStudent) {
    return (
      <div className="student-dashboard">
        {/* 🔙 Back Button */}
        <button className="back-button" onClick={() => setSelectedStudent(null)}>
          ← Back to Student List
        </button>

        {/* 🎓 Student Profile */}
        <div className="student-hero">
          <h2>{selectedStudent.name.first} {selectedStudent.name.last}'s Dashboard 🎓</h2>
        </div>

        {/* 📊 Stats Section */}
        <div className="stats-container">
          <div className="stat-card">
            <div className="stat-icon"><FaBook /></div>
            <div className="stat-number">{selectedStudent.academic_records.cgpa}</div>
            <div className="stat-label">CGPA</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon"><FaTrophy /></div>
            <div className="stat-number">{selectedStudent.events?.length || 0}</div>
            <div className="stat-label">Events Participated</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon"><FaUserGraduate /></div>
            <div className="stat-number">{selectedStudent.academic_records.backlogs}</div>
            <div className="stat-label">Backlogs</div>
          </div>
        </div>

        {/* 📄 Student Details */}
        <div className="student-info">
          <p><FaEnvelope /> <strong>Email:</strong> {selectedStudent.email}</p>
          <p><FaPhone /> <strong>Phone:</strong> {selectedStudent.phone}</p>
          <p><strong>Roll Number:</strong> {selectedStudent.roll_number}</p>
          <p><strong>DOB:</strong> {selectedStudent.dob}</p>
          <p><strong>Branch:</strong> {selectedStudent.branch}</p>
        </div>

        {/* 🏆 Events Participated */}
        <div className="events-container">
          <h3>🏆 Events Participated</h3>
          {selectedStudent.events && selectedStudent.events.length > 0 ? (
            <ul className="events-list">
              {selectedStudent.events.map((event, index) => (
                <li key={index}>{event}</li>
              ))}
            </ul>
          ) : (
            <p>No events participated.</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="mystudent-container">
      <h2 className="mystudent-heading">📋 My Students</h2>
      <table className="mystudent-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Roll Number</th>
            <th>Email</th>
            <th>Branch</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index}>
              <td>
                <button className="student-name-btn" onClick={() => setSelectedStudent(student)}>
                  {student.name?.first} {student.name?.last}
                </button>
              </td>
              <td>{student.roll_number}</td>
              <td>{student.email}</td>
              <td>{student.branch}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyStudents;

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./css/MyStudents.css"; // Keeping the same CSS file for styling consistency

const AllStudents = () => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedClass, setSelectedClass] = useState("3-CSE-A"); // Default class
  const [availableClasses, setAvailableClasses] = useState([]);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get("http://localhost:8000/getStudent");
        const data = response.data;
        const classList = Object.keys(data[0]); // Extract class names
        setAvailableClasses(classList);
      } catch (err) {
        console.error("Error fetching classes:", err);
        setError("Failed to fetch class data.");
      }
    };
    fetchClasses();
  }, []);

  useEffect(() => {
    if (!selectedClass) return;

    const fetchStudents = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get("http://localhost:8000/getStudent");
        const studentData = response.data;

        if (studentData.length > 0 && studentData[0][selectedClass]) {
          const allStudents = Object.values(studentData[0][selectedClass]);
          setStudents(allStudents);
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
  }, [selectedClass]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  if (selectedStudent) {
    return (
      <div className="student-dashboard">
        <button className="back-button" onClick={() => setSelectedStudent(null)}>
          ← Back to Student List
        </button>
        <h2 className="student-hero">🎓 {selectedStudent.name.first} {selectedStudent.name.last}'s Dashboard</h2>

        <div className="student-info">
          <p><strong>Roll Number:</strong> {selectedStudent.roll_number}</p>
          <p><strong>Email:</strong> {selectedStudent.email}</p>
          <p><strong>Phone:</strong> {selectedStudent.phone}</p>
          <p><strong>DOB:</strong> {selectedStudent.dob}</p>
          <p><strong>Branch:</strong> {selectedStudent.branch}</p>
          <p><strong>CGPA:</strong> {selectedStudent.academic_records.cgpa}</p>
          <p><strong>Backlogs:</strong> {selectedStudent.academic_records.backlogs}</p>
        </div>

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
      <h2 className="mystudent-heading">📋 All Students</h2>
      <div className="class-selection">
        <label className="class-label">Select Class:</label>
        <select className="class-dropdown" value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
          {availableClasses.map((className, index) => (
            <option key={index} value={className}>{className}</option>
          ))}
        </select>
      </div>
      
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

export default AllStudents;

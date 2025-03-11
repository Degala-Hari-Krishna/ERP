import React, { useState, useEffect } from "react";
import axios from "axios";
import "./css/TimeTable.css";

const FacultyTimeTable = () => {
  const [timeTable, setTimeTable] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const facultyId = localStorage.getItem("token");

  useEffect(() => {
    const fetchTimeTable = async () => {
      try {
        const response = await axios.get("http://localhost:8000/getTimeTable");
        const timetables = response.data;
        
        const facultyTimeTable = timetables.find((t) => t.facultyId === facultyId);
        
        if (facultyTimeTable) {
          setTimeTable(facultyTimeTable.timetable);
        } else {
          setError("No timetable found for this faculty.");
        }
        
        setLoading(false);
      } catch (err) {
        setError("Failed to load timetable");
        setLoading(false);
      }
    };

    fetchTimeTable();
  }, [facultyId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  const days = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
  const periods = ["1", "2", "3", "4", "5", "6", "7"];

  return (
    <div className="timetable-container">
      <h2>📅 Faculty Timetable</h2>
      <table className="timetable">
        <thead>
          <tr>
            <th>Period</th>
            {days.map((day) => (
              <th key={day}>{day.charAt(0).toUpperCase() + day.slice(1)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {periods.map((period) => (
            <tr key={period}>
              <td>{period}</td>
              {days.map((day) => (
                <td key={day + period}>{timeTable?.[day]?.[period] || "-"}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FacultyTimeTable;

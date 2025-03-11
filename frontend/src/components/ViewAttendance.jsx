import axios from "axios";
import { useEffect, useState } from "react";
import "./css/ViewAttendance.css"; // Ensure this file exists

function ViewAttendance() {
  const currentFacultyId = localStorage.getItem("token");
  const [classes, setClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [attendanceData, setAttendanceData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTimeTable = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/getTimeTable`);
        const timetables = response.data;
        const facultyTimeTable = timetables.find((t) => t.facultyId === currentFacultyId);

        if (facultyTimeTable) {
          const allClasses = new Set();
          Object.values(facultyTimeTable.timetable).forEach((daySchedule) => {
            Object.values(daySchedule).forEach((className) => {
              if (className !== "-") {
                allClasses.add(className);
              }
            });
          });
          setClasses([...allClasses]);
        }
      } catch (err) {
        setError("Failed to load class list.");
      }
    };

    fetchTimeTable();
  }, [currentFacultyId]);

  const fetchAttendance = async () => {
    if (!selectedClass || !selectedDate) {
      alert("Please select both class and date.");
      return;
    }
    setLoading(true);
    setError(null);

    const formattedDate = new Date(selectedDate).toISOString().split("T")[0];

    try {
      const response = await axios.get(`http://localhost:8000/getAttendance`, {
        params: { class: selectedClass, date: formattedDate },
      });

      const attendanceRecord = response.data.find(
        (record) => record.date === formattedDate && record.className === selectedClass
      );

      setAttendanceData(attendanceRecord ? attendanceRecord.attendance : null);
    } catch (err) {
      setError("Failed to fetch attendance.");
      setAttendanceData(null);
    }
    setLoading(false);
  };

  return (
    <div className="view-attendance-container">
      <h1>View Attendance</h1>

      {error && <p className="view-attendance-error">{error}</p>}

      {/* Input container with a single row layout */}
      <div className="view-attendance-inputs">
        <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
          <option value="">-- Select Class --</option>
          {classes.map((className, index) => (
            <option key={index} value={className}>
              {className}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />

        <button onClick={fetchAttendance}>View Attendance</button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : attendanceData ? (
        <div>
          <h2>Attendance for {selectedClass} on {selectedDate}:</h2>
          <table className="view-attendance-table">
            <thead>
              <tr>
                <th>Roll Number</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(attendanceData).map(([rollNumber, status]) => (
                <tr key={rollNumber}>
                  <td>{rollNumber}</td>
                  <td>{status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No attendance records found.</p>
      )}
    </div>
  );
}

export default ViewAttendance;

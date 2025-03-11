import axios from "axios";
import { useEffect, useState } from "react";
import "./css/MarkAttendance.css";

function MarkAttendance() {
  const currentFacultyId = localStorage.getItem("token");
  const [timeTable, setTimeTable] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [todayClasses, setTodayClasses] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [isAttendanceMarked, setIsAttendanceMarked] = useState(false);
  const [globalStatus, setGlobalStatus] = useState("Present");

  useEffect(() => {
    const fetchTimeTable = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/getTimeTable`);
        const timetables = response.data;

        const facultyTimeTable = timetables.find((t) => t.facultyId === currentFacultyId);

        if (facultyTimeTable) {
          setTimeTable(facultyTimeTable);
          const today = new Date().toLocaleString("en-US", { weekday: "long" }).toLowerCase();

          if (today === "sunday") {
            setTodayClasses([]);
          } else {
            const filteredClasses = Object.values(facultyTimeTable.timetable[today]).filter(
              (className) => className !== "-"
            );
            setTodayClasses(filteredClasses);
          }
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
  }, [currentFacultyId]);

  const fetchStudents = async () => {
    if (!selectedClass) return;

    try {
      const response = await axios.get(`http://localhost:8000/getStudent`);
      const classData = response.data[0];

      if (classData[selectedClass]) {
        const studentList = Object.values(classData[selectedClass]);
        setStudents(studentList);

        const initialAttendance = {};
        studentList.forEach((student) => {
          initialAttendance[student.roll_number] = globalStatus;
        });
        setAttendance(initialAttendance);
      } else {
        setStudents([]);
      }
    } catch (err) {
      setError("Failed to load students.");
      setStudents([]);
    }
  };

  const toggleAttendance = (rollNumber) => {
    setAttendance((prev) => ({
      ...prev,
      [rollNumber]: prev[rollNumber] === "Present" ? "Absent" : "Present",
    }));
  };

  const setGlobalAttendance = (status) => {
    setGlobalStatus(status);
    const updatedAttendance = {};
    students.forEach((student) => {
      updatedAttendance[student.roll_number] = status;
    });
    setAttendance(updatedAttendance);
  };

  const handleSubmit = async () => {
    if (!selectedClass) {
      alert("Please select a class before submitting attendance.");
      return;
    }

    try {
      const payload = {
        className: selectedClass,
        facultyId: currentFacultyId,
        date: new Date().toISOString().split("T")[0],
        attendance: attendance,
      };

      const response = await axios.post("http://localhost:8000/markAttendance", payload);

      if (response.status === 200 || response.status === 201) {
        alert("✅ Attendance submitted/updated successfully!");
        setIsAttendanceMarked(true);
      } else {
        alert("⚠️ Unexpected response. Check console for details.");
      }
    } catch (err) {
      console.error("Error submitting attendance:", err);
      alert("❌ Failed to submit attendance. Please check your connection and try again.");
    }
  };

  return (
    <div className="main-container">
      <h1>Mark Attendance</h1>

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : todayClasses.length === 0 ? (
        <p>No classes today.</p>
      ) : (
        <div>
          <h2>Select a Class:</h2>
          <select value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
            <option value="">-- Select Class --</option>
            {todayClasses.map((className, index) => (
              <option key={index} value={className}>
                {className}
              </option>
            ))}
          </select>
          <button onClick={fetchStudents}>Find</button>

          <div className="hero-radio">
            <label>
              <input type="radio" name="status" value="Present" checked={globalStatus === "Present"} onChange={() => setGlobalAttendance("Present")} /> Present
            </label>
            <label>
              <input type="radio" name="status" value="Absent" checked={globalStatus === "Absent"} onChange={() => setGlobalAttendance("Absent")} /> Absent
            </label>
            <label>
              <input type="radio" name="status" value="Not Held" checked={globalStatus === "Not Held"} onChange={() => setGlobalAttendance("Not Held")} /> Not Held
            </label>
          </div>

          {students.length > 0 && (
            <div>
              <h2>Students in {selectedClass}:</h2>
              <div className="tiles-container">
                {students.map((student) => (
                  <div key={student.roll_number} className={`student-tile ${attendance[student.roll_number]}`} onClick={() => toggleAttendance(student.roll_number)}>
                    <p>{student.name.first} {student.name.last}</p>
                    <p>{student.roll_number}</p>
                  </div>
                ))}
              </div>
              <button onClick={handleSubmit}>{isAttendanceMarked ? "Update Attendance" : "Submit Attendance"}</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default MarkAttendance;

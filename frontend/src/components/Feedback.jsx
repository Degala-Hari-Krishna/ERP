import { useEffect, useState } from "react";
import axios from "axios";
import "./css/Feedback.css"; // Import CSS file

function FacultyFeedback() {
  const facultyId = "FAC05001"; // Replace with dynamic faculty ID if needed
  const [feedbacks, setFeedbacks] = useState([]);
  const [randomFeedbacks, setRandomFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeedback = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get("http://localhost:8000/getFacultyFeedback", {
          params: { facultyId }
        });

        if (response.data && response.data.length > 0) {
          setFeedbacks(response.data);

          // Pick any 3 random feedbacks
          const shuffled = [...response.data].sort(() => 0.5 - Math.random());
          setRandomFeedbacks(shuffled.slice(0, 3));
        } else {
          setFeedbacks([]);
          setRandomFeedbacks([]);
        }
      } catch (err) {
        setError("Failed to fetch faculty feedback.");
      }
      setLoading(false);
    };

    fetchFeedback();
  }, [facultyId]);

  // Calculate averages
  const avgAttendance = feedbacks.length
    ? (feedbacks.reduce((acc, item) => acc + item.attendance, 0) / feedbacks.length).toFixed(2)
    : 0;
  const avgCorrection = feedbacks.length
    ? (feedbacks.reduce((acc, item) => acc + item.correction, 0) / feedbacks.length).toFixed(2)
    : 0;
  const avgRating = feedbacks.length
    ? (feedbacks.reduce((acc, item) => acc + item.rating, 0) / feedbacks.length).toFixed(2)
    : 0;

  return (
    <div className="faculty-feedback-container">
      <h1>Faculty Feedback</h1>

      {loading && <p>Loading feedback...</p>}
      {error && <p className="error">{error}</p>}

      {feedbacks.length > 0 ? (
        <div className="feedback-card">
          <h2>Feedback Summary</h2>
          <div className="feedback-metrics">
            <div className="metric">
              <span className="label">Attendance:</span>
              <span className="value">{avgAttendance} / 5</span>
            </div>
            <div className="metric">
              <span className="label">Correction:</span>
              <span className="value">{avgCorrection} / 5</span>
            </div>
            <div className="metric">
              <span className="label">Overall Rating:</span>
              <span className="value">{avgRating} / 5</span>
            </div>
          </div>

          {/* Display any 3 random feedbacks */}
          <h2>Student Feedbacks</h2>
          <div className="random-feedbacks">
            {randomFeedbacks.length > 0 ? (
              randomFeedbacks.map((item, index) => (
                <div key={index} className="feedback-item">
                  <p><strong>Attendance:</strong> {item.attendance} / 5</p>
                  <p><strong>Correction:</strong> {item.correction} / 5</p>
                  <p><strong>Overall Rating:</strong> {item.rating} / 5</p>
                  <p className="timestamp">{new Date(item.timestamp).toLocaleString()}</p>
                </div>
              ))
            ) : (
              <p>No feedbacks available.</p>
            )}
          </div>
        </div>
      ) : (
        <p>No feedback available.</p>
      )}
    </div>
  );
}

export default FacultyFeedback;
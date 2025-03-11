import React, { useState, useEffect } from "react";
import axios from "axios";
import "./css/Profile.css";

const FacultyProfileView = () => {
  const [faculty, setFaculty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const fetchFacultyData = async () => {
      const uid = localStorage.getItem("token");
      if (!uid) {
        setError("User not logged in");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:8000/getFaculty/${uid}`
        );
        setFaculty(response.data);
        setFormData(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch faculty details");
        setLoading(false);
      }
    };

    fetchFacultyData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  const handleUpdate = async () => {
    try {
      let updatedData = { ...formData };

      if (profileImage) {
        const imageData = new FormData();
        imageData.append("profileImage", profileImage);

        const imageResponse = await axios.post(
          "http://localhost:8000/uploadProfileImage",
          imageData
        );

        updatedData.profileImage = imageResponse.data.filePath;
      }

      const response = await axios.put(
        `http://localhost:8000/updateFaculty/${faculty.facultyId}`,
        updatedData
      );

      setFaculty(response.data.faculty);
      setEditMode(false);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error(
        "Update failed:",
        err.response ? err.response.data : err.message
      );
      alert("Failed to update profile");
    }
  };

  const handleCancel = () => {
    setFormData(faculty); // Reset form data to original state
    setEditMode(false);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!faculty) return <p>No Faculty Data Found</p>;

  return (
    <div className="faculty-profile">
      <h2>👤 Faculty Profile</h2>
      <div className="faculty-info">
        <p>
          <strong>Name:</strong>{" "}
          {editMode ? (
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          ) : (
            faculty.name
          )}
        </p>
        <p>
          <strong>Email:</strong> {faculty.email}
        </p>
        <p>
          <strong>Department:</strong>{" "}
          {editMode ? (
            <input
              type="text"
              name="department"
              value={formData.department}
              onChange={handleChange}
            />
          ) : (
            faculty.department
          )}
        </p>
        <p>
          <strong>Designation:</strong>{" "}
          {editMode ? (
            <input
              type="text"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
            />
          ) : (
            faculty.designation
          )}
        </p>
        <p>
          <strong>Phone:</strong>{" "}
          {editMode ? (
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          ) : (
            faculty.phone
          )}
        </p>
        <p>
          <strong>Qualification:</strong>{" "}
          {editMode ? (
            <input
              type="text"
              name="qualification"
              value={formData.qualification}
              onChange={handleChange}
            />
          ) : (
            faculty.qualification
          )}
        </p>
        <p>
          <strong>Experience:</strong>{" "}
          {editMode ? (
            <input
              type="number"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
            />
          ) : (
            faculty.experience + " years"
          )}
        </p>

        <p>
          <strong>Profile Image:</strong>
        </p>
        {editMode ? (
          <input type="file" onChange={handleImageChange} />
        ) : faculty.profileImage ? (
          <img
            src={`http://localhost:8000${faculty.profileImage}`}
            alt="Profile"
            width={100}
            height={100}
          />
        ) : (
          "No Image"
        )}
      </div>

      <h3>📚 Courses Assigned</h3>
      <ul className="course-list">
        {faculty.coursesAssigned.map((course, index) => (
          <li key={index} className="course-item">
            <strong>
              {course.courseCode} - {course.courseName}
            </strong>
            <br /> {course.branch} (Year {course.year}, Semester{" "}
            {course.semester}, Section {course.section})
          </li>
        ))}
      </ul>

      {editMode ? (
        <div>
          <button className="save-btn" onClick={handleUpdate}>
            Save
          </button>
          <button className="cancel-btn" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      ) : (
        <button className="edit-btn" onClick={() => setEditMode(true)}>
          Edit
        </button>
      )}
    </div>
  );
};

export default FacultyProfileView;

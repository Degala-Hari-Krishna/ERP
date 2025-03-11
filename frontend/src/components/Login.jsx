import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./css/Login.css";
import Navbar from "./Navbar";

const Login = () => {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError(""); // Clear error message
    try {
      const response = await axios.get("http://localhost:8000/getUsers");
      const users = response.data;

      // Validate name and password
      const user = users.find((u) => u.name === name && u.password === password);

      if (user) {
        localStorage.setItem("token", user.uid);
        localStorage.setItem("role",user.role);
        // Store user name as token
        if(user.role === "student") navigate("/student");
        else
          navigate("/faculty/dashboard");
        window.location.reload();
      } else {
        setError("Invalid name or password.");
      }
    } catch (err) {
      setError("Server error. Please try again later.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="login-container">
        <div className="login-box">
          <h1>Login</h1>
          <div>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <br />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className="error">{error}</p>}
          <button onClick={handleLogin}>Login</button>
          <div className="forgot-password">Forgot Password?</div>
        </div>
        <div className="info-box">
          <h2>Login to Student Portal</h2>
          <p>To manage & view the Student Activity</p>
        </div>
      </div>
    </>
  );
};

export default Login;

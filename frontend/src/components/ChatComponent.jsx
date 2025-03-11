import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const socket = io("http://localhost:8000");

const ChatComponent = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const userRole = localStorage.getItem("role");

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/");
      return;
    }

    axios.get("http://localhost:8000/messages")
      .then((response) => setMessages(response.data))
      .catch((error) => console.error("Error loading messages:"));

    socket.on("receiveMessage", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [navigate]);

  const sendMessage = () => {
    if (!inputMessage.trim()) return;

    const messageData = { 
      sender: userRole, 
      role: userRole, 
      message: inputMessage 
    };
    
    socket.emit("sendMessage", messageData);
    setInputMessage("");
  };

  return (
    <div style={{ maxWidth: "500px", margin: "auto", padding: "20px", border: "1px solid #ddd" }}>
      <h2>Real-Time Chat ({userRole})</h2>
      <div style={{ height: "300px", overflowY: "auto", border: "1px solid #ccc", padding: "10px" }}>
        {messages.map((msg, index) => (
          <div key={index} style={{ marginBottom: "10px", textAlign: msg.sender === userRole ? "right" : "left" }}>
            <strong>{msg.sender}:</strong> {msg.message} <br />
            <small>{new Date(msg.timestamp).toLocaleString()}</small>
          </div>
        ))}
      </div>
      <div style={{ marginTop: "10px" }}>
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type a message..."
          style={{ width: "80%", padding: "5px" }}
        />
        <button onClick={sendMessage} style={{ marginLeft: "10px", padding: "5px 10px" }}>Send</button>
      </div>
    </div>
  );
};

export default ChatComponent;
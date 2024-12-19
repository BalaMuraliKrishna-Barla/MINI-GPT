import React, { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [userMessage, setUserMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const handleSendMessage = async () => {
    if (!userMessage.trim()) return;

    const newMessage = { role: "user", content: userMessage };
    setChat([...chat, newMessage]);

    try {
      const response = await axios.post("http://localhost:5000/api/chat", {
        message: userMessage,
      });

      setChat([
        ...chat,
        newMessage,
        { role: "assistant", content: response.data },
      ]);
    } catch (error) {
      console.error("Error sending message:", error.message);
    }

    setUserMessage("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`chat-container ${darkMode ? "dark" : ""}`}>
      <header className="chat-header">
        <h1>ChatGPT</h1>
        <button onClick={toggleDarkMode} className="dark-mode-toggle">
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </header>
      <div className="chat-box">
        {chat.map((msg, index) => (
          <div
            key={index}
            className={`chat-message ${
              msg.role === "user" ? "user" : "assistant"
            }`}
          >
            <div className="message-content">{msg.content}</div>
          </div>
        ))}
      </div>
      <div className="input-area">
        <input
          type="text"
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type a message..."
          className="chat-input"
        />
        <button onClick={handleSendMessage} className="send-button">
          <span>Send</span>
        </button>
      </div>
    </div>
  );
}

export default App;

import React, { useState } from "react";

function Write() {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevents reload of page

    if (!message.trim()) {
      setStatus("Message cannot be empty!");
      return;
    }

    try {
      const response = await fetch(
        "void-whispers-production.up.railway.app/write-letter",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ letter: message }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setStatus("✅ Your letter has been sent into the void!");
        setMessage(""); // Clear input after sending
      } else {
        setStatus(`❌ Error: ${data.error || "Something went wrong"}`);
      }
    } catch (error) {
      setStatus("❌ Failed to send letter. Try again later!");
      console.error("Error:", error);
    }
  };
  return (
    <div className="write-container">
      <h2>✍️ Write a Letter to the Void</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Write your message here..."
          rows="5"
        />
        <button type="submit">Send</button>
      </form>
      {status && <p className="status-message">{status}</p>}
    </div>
  );
}

export default Write;

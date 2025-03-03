import "../styles/Letter.css";
import React, { useState, useEffect } from "react";

function Letter() {
  const [letter, setLetter] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLetter();
  }, []);

  const fetchLetter = async () => {
    try {
      const response = await fetch(
        "https://void-whispers-production.up.railway.app/random-letter"
      );
      const text = await response.text(); // First, get raw text
      console.log("Raw Response:", text);

      const data = JSON.parse(text.trim()); // Trim and parse JSON
      setLetter(data.content);
      console.log("The Letter has been received");
    } catch (error) {
      console.error("Error fetching letter:", error);
      setLetter("💤...no bottles...it seems...💤");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="letter-box">
      <h1>A Letter From The Void</h1>
      {loading ? <p>Fishing a Bottle...</p> : <p>{letter}</p>}
    </div>
  );
}

export default Letter;

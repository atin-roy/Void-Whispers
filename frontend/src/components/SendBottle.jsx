import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Options.css";

export const SendBottle = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/write");
  };
  return (
    <div className="container" onClick={handleClick}>
      <div className="option-icon">✉️</div>
      <div className="text">Send a Letter into the Void</div>
    </div>
  );
};

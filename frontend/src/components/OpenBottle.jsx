import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Options.css";

export const OpenBottle = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/letter");
  };
  return (
    <div className="container" onClick={handleClick}>
      <div className="option-icon">🍾</div>
      <div className="text">Fish out a Bottle from the Void</div>
    </div>
  );
};

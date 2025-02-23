import React from "react";
import "./JobCard.css";

export const JobCard = (props) => {
  return (
    <div className="jobCard">
      <div className="cardJobHeader">
        <h3>{props.title}</h3>
        <span className={`status ${props.status.toLowerCase()}`}>{props.status}</span>
      </div>
      <p className="category">{props.category}</p>
      <div className="cardJobPrice">
        <p><strong>💰 Budget:</strong> {props.budget} $</p>
        <p><strong>⏳ Deadline:</strong> {props.deadline} Days</p>
      </div>
    </div>
  );
};



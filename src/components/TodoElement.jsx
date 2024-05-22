import "./Card.css";
import React from "react";
import "@fortawesome/fontawesome-free/css/all.css";

function Card({ taskId, taskTitle, onRemove, isCompleted, onToggleComplete }) {
  
    return (
      <div className="task">
        <div className="innerDiv">
          <input
            type="checkbox"
            className="checkbox"
            checked={isCompleted}
            onChange={() => onToggleComplete(taskId)}
          />
          <p className={isCompleted ? "title completed" : "title"}>{taskTitle}</p>
        </div>
        <button className="bin" onClick={() => onRemove(taskId)}>
          <i className="fa-solid fa-trash"></i>
        </button>
      </div>
    );
  }

export default Card;
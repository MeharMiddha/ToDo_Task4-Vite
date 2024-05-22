import React from "react";
import "../App.css";
import todoHandlers from "../hooks/todoHandler";

const Status = () => {
  const {state,handleClearAll} = todoHandlers();
  return(
    <div className="status">
      <div className="filters">
        <p id="all">All {state.totalTasks}</p>
        <p id="pending">Pending {state.totalTasks-state.completedTasksCount}</p>
        <p id="completed">Completed {state.completedTasksCount}</p>
      </div>
      <button className="clearBtn" id="clearAll" onClick={handleClearAll}>
        Clear All
      </button>
    </div>
  );
};

export default Status;

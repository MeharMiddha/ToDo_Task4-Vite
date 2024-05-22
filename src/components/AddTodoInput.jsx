import React from "react";
import "../App.css";
import todoHandlers from "../hooks/todoHandler";

const AddTodoInput = () => {
  const {state,handleInputChange,handleAddTask,handleKeyPress}=todoHandlers();
  return(
    <div className="inputContainer">
      <img
        className="menuBar"
        src="https://cdn-icons-png.flaticon.com/512/5036/5036960.png"
        alt=""
      />
      <input
        type="text"
        placeholder="Add a New Task"
        id="input"
        value={state.taskInput}
        onChange={handleInputChange}
        onKeyDown={handleKeyPress}
      />
      <button id="addTodo" className="addList" onClick={handleAddTask}>
        Add
      </button>
    </div>
  )
};

export default AddTodoInput;

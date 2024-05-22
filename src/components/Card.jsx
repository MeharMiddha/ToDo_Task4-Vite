import React from "react";
import todoHandlers from "../hooks/todoHandler";
import Card from "./TodoElement";

const CardContainer=()=>{
  const {
    state,
    handleRemoveTask,
    handleToggleComplete,
  } = todoHandlers();
  return(
    <>
    {state.isLoading ? (
      <p>Loading Tasks...</p>
    ) : (
      <ul className="tasks">
        {state.tasks.map((task, index) => (
          <Card
            key={index}
            taskId={index}
            taskTitle={task.title}
            onRemove={handleRemoveTask}
            isCompleted={task.completed}
            onToggleComplete={handleToggleComplete}
          />
        ))}
      </ul>
    )}
    </>
  )
}

export default CardContainer;

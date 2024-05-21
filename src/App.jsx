import React, { useState, useEffect } from "react";
import "./App.css";
import Card from "./components/Card";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [taskInput, setTaskInput] = useState("");
  const [completedTasksList, setCompletedTasksList] = useState([]);

  useEffect(() => {
    try {
      const storedTasks = JSON.parse(localStorage.getItem("tasks"));
      const storedCompletedTasks = JSON.parse(
        localStorage.getItem("completedTasks")
      );
      if (storedTasks && storedCompletedTasks) {
        setTasks(storedTasks);
        setCompletedTasksList(storedCompletedTasks);
        setIsLoading(false);
      } else {
        fetchTasks();
      }
    } catch (error) {
      console.error("Error parsing JSON from localStorage:", error);
      fetchTasks();
    }
  }, []);

  const fetchTasks = () => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setTimeout(() => {
          const initialTasks = data.slice(0, 10).map((task) => ({
            ...task,
            completed: false,
          }));
          setTasks(initialTasks);
          setIsLoading(false);
          localStorage.setItem("tasks", JSON.stringify(initialTasks));
          localStorage.setItem("completedTasks", JSON.stringify([]));
        });
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
        setIsLoading(false);
      });
  };

  const handleInputChange = (event) => {
    setTaskInput(event.target.value);
  };

  const handleAddTask = () => {
    if (taskInput !== "") {
      const newTask = {
        id: tasks.length + 1,
        title: taskInput,
        completed: false,
      };
      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      setTaskInput("");
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      toast.success("Task added successfully", {
        position: "top-right",
        autoClose: 2000,
      });
    } else {
      alert("Please Enter Some Task");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleAddTask();
    }
  };

  const handleRemoveTask = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    const updatedCompletedTasks = completedTasksList.filter(
      (task) => task.id !== taskId
    );
    setTasks(updatedTasks);
    setCompletedTasksList(updatedCompletedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    localStorage.setItem(
      "completedTasks",
      JSON.stringify(updatedCompletedTasks)
    );
    toast.error("Task removed successfully", {
      position: "top-right",
    });
  };

  const handleToggleComplete = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    const updatedCompletedTasks = updatedTasks.filter((task) => task.completed);
    setCompletedTasksList(updatedCompletedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    localStorage.setItem(
      "completedTasks",
      JSON.stringify(updatedCompletedTasks)
    );
  };

  const handleClearAll = () => {
    setTasks([]);
    setCompletedTasksList([]);
    localStorage.setItem("tasks", JSON.stringify([]));
    localStorage.setItem("completedTasks", JSON.stringify([]));
  };

  return (
    <div className="container">
      <div className="todo">
        <p className="title">
          GeekyAnts-ToDo
        </p>
        <img
          className="todoImg"
          src="https://w7.pngwing.com/pngs/527/527/png-transparent-checklist-illustration-computer-icons-checklist-shopping-list-checklist-miscellaneous-angle-text.png"
          alt=""
        />
      </div>
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
          value={taskInput}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
        />
        <button id="addTodo" className="addList" onClick={handleAddTask}>
          Add
        </button>
      </div>
      <div className="status">
        <div className="filters">
          <p id="all">All {tasks.length}</p>
          <p id="pending">Pending {tasks.length - completedTasksList.length}</p>
          <p id="completed">Completed {completedTasksList.length}</p>
        </div>
        <button className="clearBtn" id="clearAll" onClick={handleClearAll}>
          Clear All
        </button>
      </div>
      {isLoading ? (
        <p>Loading Tasks...</p>
      ) : (
        <ul className="tasks">
          {tasks.map((task) => (
            <Card
              key={task.id}
              taskId={task.id}
              taskTitle={task.title}
              onRemove={handleRemoveTask}
              isCompleted={task.completed}
              onToggleComplete={handleToggleComplete}
            />
          ))}
        </ul>
      )}
      <ToastContainer />
    </div>
  );
}

export default App;

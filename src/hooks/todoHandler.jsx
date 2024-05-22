import { useEffect, useContext } from "react";
import { toast } from "react-toastify";
import { TodoContext } from "../reducers/postReducer";

const todoHandlers = () => {
  const { state, dispatch } = useContext(TodoContext)

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));

    if (storedTasks) {
      dispatch({ type: "SET_TASKS", payload: storedTasks });
      dispatch({ type: "SET_LOADING", payload: false });
    } else {
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
          dispatch({ type: "SET_TASKS", payload: initialTasks });
          dispatch({ type: "SET_LOADING", payload: false });
        });
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
        dispatch({ type: "SET_LOADING", payload: false });
      });
  };

  const handleInputChange = (event) => {
    dispatch({ type: "SET_TASK_INPUT", payload: event.target.value });
  };

  const handleAddTask = () => {
    if (state.taskInput !== "") {
      const newTask = {
        title: state.taskInput,
        completed: false,
      };
      dispatch({ type: "ADD_TASK", payload: newTask });
      toast.success("Task added successfully", {
        position: "top-right",
        autoClose: 1000,
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
    dispatch({ type: "REMOVE_TASK", payload: taskId });
    toast.error("Task removed successfully", {
      position: "top-right",
      autoClose: 1000,
    });
  };

  const handleToggleComplete = (taskId) => {
    dispatch({ type: "TOGGLE_TASK", payload: taskId });
  };

  const handleClearAll = () => {
    dispatch({ type: "CLEAR_ALL" });
  };

  return {
    state,
    handleInputChange,
    handleAddTask,
    handleKeyPress,
    handleRemoveTask,
    handleToggleComplete,
    handleClearAll,
  };
};

export default todoHandlers;

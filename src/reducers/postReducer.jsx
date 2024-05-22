import { useReducer } from "react";
import { createContext } from "react";

export const INITIAL_STATE = {
  tasks: [],
  totalTasks: 0,
  completedTasksCount: 0,
  isLoading: true,
  taskInput: "",
};

export const reducer = (state, action) => {
  let updatedTasks, completedCount;

  switch (action.type) {
    case "SET_TASKS":
      completedCount = action.payload.filter((task) => task.completed).length;
      localStorage.setItem("tasks", JSON.stringify(action.payload));
      return {
        ...state,
        tasks: action.payload,
        totalTasks: action.payload.length,
        completedTasksCount: completedCount,
        isLoading: false,
      };

    case "SET_LOADING":
      return { ...state, isLoading: action.payload };

    case "SET_TASK_INPUT":
      return { ...state, taskInput: action.payload };

    case "ADD_TASK":
      updatedTasks = [...state.tasks, action.payload];
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return {
        ...state,
        tasks: updatedTasks,
        totalTasks: state.totalTasks + 1,
        taskInput: "",
      };

    case "REMOVE_TASK":
      updatedTasks = state.tasks.filter((task, index) => index !== action.payload);
      completedCount = updatedTasks.filter((task) => task.completed).length;
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return {
        ...state,
        tasks: updatedTasks,
        totalTasks: state.totalTasks - 1,
        completedTasksCount: completedCount,
      };

    case "TOGGLE_TASK":
      updatedTasks = state.tasks.map((task,index) =>
        index === action.payload
          ? { ...task, completed: !task.completed }
          : task
      );
      completedCount = updatedTasks.filter((task) => task.completed).length;
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return {
        ...state,
        tasks: updatedTasks,
        completedTasksCount: completedCount,
      };

    case "CLEAR_ALL":
      localStorage.setItem("tasks", JSON.stringify([]));
      return {
        ...state,
        tasks: [],
        totalTasks: 0,
        completedTasksCount: 0,
        taskInput: "",
      };

    default:
      return state;
  }
};

export const TodoContext = createContext();
const postReducer = ({ children }) => {
  const [state,dispatch] = useReducer(reducer,INITIAL_STATE);
  return (
    <TodoContext.Provider value={{ state,dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};
export default postReducer; 
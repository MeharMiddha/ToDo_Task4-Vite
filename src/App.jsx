import React from "react";
import "./App.css";
import CardContainer from "./components/Card";
import Header from "./components/Header";
import AddTodoInput from "./components/AddTodoInput";
import Status from "./components/Status";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {

  return (
    <div className="container">
      <Header />
      <AddTodoInput/>
      <Status/>
      <ToastContainer />
      <CardContainer/>
    </div>
  );
}
export default App;
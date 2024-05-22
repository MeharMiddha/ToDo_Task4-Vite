import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import PostReducer from "./reducers/postReducer.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PostReducer>
      <App />
    </PostReducer>
  </React.StrictMode>
);

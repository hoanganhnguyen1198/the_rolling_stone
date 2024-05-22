import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "bootstrap/dist/css/bootstrap.css";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <div className="container-fluid text-center">
        <h1 className="display-5 font-monospace fw-bold p-3 mb-2 bg-primary-subtle text-primary-emphasis">
          To-Do List
        </h1>
      </div>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

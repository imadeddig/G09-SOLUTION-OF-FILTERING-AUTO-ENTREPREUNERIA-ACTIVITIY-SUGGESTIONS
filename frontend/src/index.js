import React from "react";
import ReactDOM from "react-dom/client"; // 👈 Use "client" instead of "react-dom"
import { BrowserRouter } from "react-router-dom";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

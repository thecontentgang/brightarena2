import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App"; // Or wherever your Showcase is rendered
import "./index.css";
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* THIS is what is missing: */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
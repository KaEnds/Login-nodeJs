import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import Table from './Table.jsx'
import Editing from "./Editing";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/table" element={<Table />} />
      <Route path="/table/edit:id" element={<Editing />} />
    </Routes>
  </BrowserRouter>
);

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Medications from "./Pages/medications";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/medications" element={<Medications />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
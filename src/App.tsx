import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Candidates from "./pages/Candidates";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Candidates />} />
      </Routes>
    </Router>
  );
}

export default App;

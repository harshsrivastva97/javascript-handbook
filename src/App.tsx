import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home.tsx";
import CodeVault from "./pages/CodeVault/CodeVault.tsx";
import About from "./pages/About/About.tsx";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/code-vault" element={<CodeVault />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
};

export default App;

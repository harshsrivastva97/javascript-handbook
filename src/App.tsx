import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home.tsx";
import Topics from "./pages/Topics/Topics.tsx";
import CodeVault from "./pages/CodeVault/CodeVault.tsx";
import Concepts from "./pages/Concepts/Concepts.tsx";
import Blogs from "./pages/Blogs/Blogs.tsx";
import Exercises from "./pages/Exercises/Exercises.tsx";
import About from "./pages/About/About.tsx";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/topics" element={<Topics />} />
        <Route path="/code-vault" element={<CodeVault />} />
        <Route path="/concepts" element={<Concepts />} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/exercises" element={<Exercises />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
};

export default App;

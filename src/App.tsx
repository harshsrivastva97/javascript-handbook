import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { motion } from "framer-motion";
import Home from "./pages/Home/Home.tsx";
import Topics from "./pages/Topics/Topics.tsx";
import CodeVault from "./pages/CodeVault/CodeVault.tsx";
import Concepts from "./pages/Concepts/Concepts.tsx";
import Blogs from "./pages/Blogs/Blogs.tsx";
import Exercises from "./pages/Exercises/Exercises.tsx";
import About from "./pages/About/About.tsx";
import PageNotFound from "./components/PageNotFound/PageNotFound.tsx";
import Leaderboard from "./pages/Leaderboard/Leaderboard.tsx";
import BlogPost from './pages/BlogPost/BlogPost.tsx';
import { Provider } from 'react-redux';
import store from './redux/index.ts';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.1,
          ease: "easeOut",
          type: "spring",
          stiffness: 200,
        }}
      >
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/topics" element={<Topics />} />
            <Route path="/code-vault" element={<CodeVault />} />
            <Route path="/concepts" element={<Concepts />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogs/:slug" element={<BlogPost />} />
            <Route path="/exercises" element={<Exercises />} />
            <Route path="/about" element={<About />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Router>
      </motion.div>
    </Provider>
  );
};

export default App;

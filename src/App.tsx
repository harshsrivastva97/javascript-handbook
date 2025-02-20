import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { motion } from "framer-motion";
import Home from "./pages/Home/Home.tsx";
import Practice from "./pages/Practice/Practice.tsx";
import Read from "./pages/Read/Read.tsx";
import Blogs from "./pages/Blogs/Blogs.tsx";
import Exercises from "./pages/Exercises/Exercises.tsx";
import About from "./pages/About/About.tsx";
import PageNotFound from "./components/PageNotFound/PageNotFound.tsx";
import BlogPost from './pages/BlogPost/BlogPost.tsx';
import { Provider } from 'react-redux';
import store from './redux/index.ts';
import Header from "./components/Header/Header.tsx";
import Auth from "./pages/Auth/Auth.tsx";
import Profile from "./pages/Profile/Profile.tsx";

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
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/practice" element={<Practice />} />
            <Route path="/read" element={<Read />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogs/:slug" element={<BlogPost />} />
            <Route path="/exercises" element={<Exercises />} />
            <Route path="/about" element={<About />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Router>
      </motion.div>
    </Provider>
  );
};

export default App;

import React, { StrictMode } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { motion } from "framer-motion";
import Home from "./pages/Home/Home";
import Practice from "./pages/Practice/Practice";
import Read from "./pages/Read/Read";
import Blogs from "./pages/Blogs/Blogs";
import Exercises from "./pages/Exercises/Exercises";
import About from "./pages/About/About";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import BlogPost from './pages/BlogPost/BlogPost';
import { Provider } from 'react-redux';
import store from './redux/index';
import Header from "./components/Header/Header";
import Auth from "./pages/Auth/Auth";
import Profile from "./pages/Profile/Profile";
import './App.scss';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <AuthProvider>
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
            <StrictMode>
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
            </StrictMode>
          </motion.div>
        </AuthProvider>
      </ThemeProvider>
    </Provider>
  );
};

export default App;

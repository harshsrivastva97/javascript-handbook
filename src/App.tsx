import React, { StrictMode } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { motion } from "framer-motion";
import Home from "./pages/Home/Home";
import Lab from "./pages/Lab/Lab";
import Library from "./pages/Library/Library";
import Blogs from "./pages/Blogs/Blogs";
import Arena from "./pages/Arena/Arena";
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
                <Route path="/library" element={<Library />} />
                <Route path="/lab" element={<Lab />} />
                <Route path="/dev-insights" element={<Blogs />} />
                <Route path="/dev-insights/:slug" element={<BlogPost />} />
                <Route path="/arena" element={<Arena />} />
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

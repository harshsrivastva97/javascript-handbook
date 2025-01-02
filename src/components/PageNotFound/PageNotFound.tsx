import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import "./PageNotFound.scss";

const PageNotFound: React.FC = () => {
  return (
    <div className="page-not-found">
      <div className="content-wrapper">
        <motion.div
          className="error-container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1
            className="error-code"
            initial={{ scale: 0.5 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            404
          </motion.h1>

          <motion.div
            className="error-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2>Oops! Page Not Found</h2>
            <p>
              The page you're looking for seems to have wandered off into the
              digital wilderness.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Link to="/" className="home-button">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="back-home"
              >
                Back to Home
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default PageNotFound;

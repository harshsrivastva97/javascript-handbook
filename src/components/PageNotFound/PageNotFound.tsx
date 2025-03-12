import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiHome, FiArrowLeft } from "react-icons/fi";
import { useTheme } from "../../contexts/ThemeContext";
import "./PageNotFound.scss";

const PageNotFound: React.FC = () => {
  const { theme } = useTheme();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  // Background particles
  const particles = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    size: Math.random() * 10 + 4,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 10
  }));

  return (
    <div className={`page-not-found ${theme}-theme`}>
      {/* Background particles */}
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="particle"
          initial={{ 
            left: `${particle.x}%`, 
            top: `${particle.y}%`,
            opacity: 0.2,
            scale: 0.5
          }}
          animate={{ 
            opacity: [0.2, 0.8, 0.2],
            scale: [0.5, 1, 0.5]
          }}
          transition={{ 
            duration: particle.duration,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          style={{
            position: "absolute",
            width: particle.size,
            height: particle.size,
            borderRadius: "50%",
            background: `rgba(var(--primary-color-rgb), 0.15)`,
            boxShadow: `0 0 ${particle.size * 2}px rgba(var(--primary-color-rgb), 0.2)`,
            zIndex: 0
          }}
        />
      ))}

      <div className="content-wrapper">
        <motion.div
          className="error-container"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1
            className="error-code"
            variants={itemVariants}
          >
            404
          </motion.h1>

          <motion.div
            className="error-text"
            variants={itemVariants}
          >
            <h2>Page Not Found</h2>
            <p>
              The page you're looking for may have been moved, deleted, or possibly never existed.
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="action-buttons"
          >
            <Link to="/" className="home-button">
              <motion.button
                className="back-home"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <FiHome style={{ marginRight: "0.5rem" }} /> Back to Home
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default PageNotFound;

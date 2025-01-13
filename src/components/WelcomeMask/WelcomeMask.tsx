import { motion } from "framer-motion";
import React, { useState } from "react";
import TypingAnimation from "../TypingAnimation/TypingAnimation.tsx";
import "./WelcomeMask.scss";

interface WelcomeMaskProps {
  onComplete: (username: string) => void;
}

const WelcomeMask: React.FC<WelcomeMaskProps> = ({ onComplete }) => {
  const [username, setUsername] = useState("");
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);

  const handleSubmit = () => {
    if (username.trim()) {
      setIsAnimatingOut(true);
      setTimeout(() => onComplete(username), 1000);
    }
  };

  return (
    <motion.div
      className={`welcome-mask ${isAnimatingOut ? 'animating-out' : ''}`}
      initial={{ opacity: 1 }}
      animate={{ opacity: isAnimatingOut ? 0 : 1 }}
      transition={{ duration: 1 }}
    >
      <div className="content-wrapper">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <TypingAnimation text="JS Handbook" />
        </motion.div>

        <motion.div
          className="input-section"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <input
            type="text"
            placeholder="What should we call you?"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
          />
          <motion.button
            onClick={handleSubmit}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Begin Your Journey
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default WelcomeMask; 
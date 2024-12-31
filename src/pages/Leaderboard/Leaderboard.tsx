import React from "react";
import { motion } from "framer-motion";
import { FaHome, FaTrophy, FaMedal, FaStar, FaGithub } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./Leaderboard.scss";

const Leaderboard: React.FC = () => {
  const navigate = useNavigate();
  const isEmpty = true; // Toggle this when you have actual data

  return (
    <motion.div 
      className="leaderboard-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <button
        className="home-button"
        onClick={() => navigate('/')}
      >
        <FaHome />
      </button>

      <motion.header
        className="leaderboard-header"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="header-content">
          <FaTrophy className="trophy-icon" />
          <h1>Contributor Leaderboard</h1>
          <p className="subtitle">Recognizing our JavaScript champions</p>
        </div>
      </motion.header>

      {isEmpty ? (
        <motion.div 
          className="empty-state"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
        >
          <div className="podium-illustration">
            <div className="podium-place second">2</div>
            <div className="podium-place first">1</div>
            <div className="podium-place third">3</div>
          </div>

          <h2>Be the First Champion!</h2>
          <p>The stage is set for JavaScript heroes like you.</p>
          <p className="motivation-text">
            Every contribution counts – from fixing bugs to adding features.
            Your expertise could make you our first leaderboard champion!
          </p>

          <motion.a
            href="https://github.com/harshsrivastva97/javascript-handbook.git"
            target="_blank"
            rel="noopener noreferrer"
            className="contribute-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaGithub /> Start Contributing
          </motion.a>

          <div className="achievement-cards">
            {[
              { icon: <FaStar />, title: "First Contribution", points: "50 points" },
              { icon: <FaMedal />, title: "Top Contributor", points: "500 points" },
              { icon: <FaTrophy />, title: "JavaScript Champion", points: "1000 points" }
            ].map((achievement, index) => (
              <motion.div
                key={achievement.title}
                className="achievement-card"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + (index * 0.1) }}
              >
                <div className="achievement-icon">{achievement.icon}</div>
                <div className="achievement-content">
                  <h3>{achievement.title}</h3>
                  <p>{achievement.points}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ) : (
        // Add your leaderboard table component here when you have data
        <div className="leaderboard-content">
          {/* Leaderboard table will go here */}
        </div>
      )}
    </motion.div>
  );
};

export default Leaderboard; 
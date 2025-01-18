"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  FaGithub, 
  FaCode, 
  FaLightbulb, 
  FaUsers, 
  FaHeart, 
  FaLinkedin, 
  FaEnvelope 
} from "react-icons/fa";
import { Link } from "react-router-dom";
import "./About.scss";

const About: React.FC = () => {
  return (
    <motion.div
      className="about-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="about-content">
        

        <section className="content-section">
          <motion.div
            className="content-block main-intro"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <motion.h1
              className="page-title"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              About
            </motion.h1>
            <p>
              As a front-end developer, mastering JavaScript is essential, whether you're gearing up for job interviews or enhancing your personal skill set. Recognizing the scarcity of comprehensive and freely accessible resources on this pivotal topic, we've launched JavaScript Handbook—an open-source, community-driven platform dedicated to high-quality JavaScript education. Here, developers can engage with interactive learning modules, practice through real-life coding challenges, and achieve a profound understanding of JavaScript.
            </p>
            <p>
              Join us and contribute to a thriving open-source community that values knowledge sharing and collective improvement. Together, we'll navigate the complexities of JavaScript, transforming challenges into opportunities for growth.
            </p>
          </motion.div>
        </section>

        <section className="features-section">
          <div className="features-grid">
            <motion.div
              className="feature-card"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <div className="card-content">
                <FaCode className="icon" />
                <h2>Interactive Learning</h2>
                <p>
                  We are committed to making JavaScript learning accessible, practical, and highly engaging. By blending theory with interactive coding exercises, we ensure developers not only learn but truly comprehend and apply their JavaScript knowledge effectively.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="feature-card"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="card-content">
                <FaLightbulb className="icon" />
                <h2>Our Vision</h2>
                <p>
                  We dream of a world where every developer, no matter their level of experience, has access to the tools and resources necessary to excel in JavaScript. With continuous contributions and feedback from our community, JavaScript Handbook is not just keeping pace with the evolution of JavaScript—it's helping shape it.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="feature-card"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <div className="card-content">
                <FaUsers className="icon" />
                <h2>Join Our Community</h2>
                <p>
                  Join our mission, enhance your skills, and be part of a team that grows together. Let's code, learn, and create the future of JavaScript, one line at a time.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        <motion.footer
          className="about-footer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <div className="footer-content">
            <p className="made-with">
              Made with <FaHeart className="heart-icon" /> by{" "}
              <a href="https://www.linkedin.com/in/harsh-srivastva/" target="_blank" rel="noopener noreferrer">
                Harsh Srivastva
              </a>
            </p>
            <div className="footer-links">
              <a href="https://github.com/harshsrivastva97/javascript-handbook" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
              <span className="separator">•</span>
              <Link to="/leaderboard">Leaderboard</Link>
              <span className="separator">•</span>
              <a href="mailto:harsh.srivastva97@gmail.com">Report an Issue</a>
            </div>
          </div>
        </motion.footer>
      </div>
    </motion.div>
  );
};

export default About;

"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  FaCode,
  FaLightbulb,
  FaUsers,
  FaHeart
} from "react-icons/fa";
import { Link } from "react-router-dom";
import "./About.scss";

const About: React.FC = () => {
  return (
    <motion.div
      className="about-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="about-content">


        <section className="content-section">
          <motion.div
            className="main-intro"
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
              As a front-end developer, mastering JavaScript is essential, whether you're gearing up for job interviews or enhancing your personal skill set. Recognizing the scarcity of comprehensive and freely accessible resources on this pivotal topic, we have JavaScript Handbook, an open-source, community-driven platform dedicated to high-quality JavaScript education. Here, developers can engage with interactive learning modules, practice through real-life coding challenges, and achieve a profound understanding of JavaScript.
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
                  Dive into JavaScript with our interactive platform that blends theory with hands-on exercises. Master advanced concepts and best practices through engaging, real-world scenarios tailored for modern web development.
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
                  Envisioning a world where developers at all levels access top JavaScript resources, our platform thrives on community contributions and collaborative learning, actively shaping the future of JavaScript in web development.
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
                  Join us to code, learn, and contribute to JavaScript's future. Code, learn, and contribute to the future of JavaScript as we tackle real-world problems and create innovative solutions together.
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

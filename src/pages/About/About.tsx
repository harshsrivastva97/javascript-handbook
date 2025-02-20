"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  FaCode,
  FaLightbulb,
  FaUsers,
  FaHeart,
  FaJsSquare,
  FaReact,
  FaNodeJs,
  FaNpm,
  FaVuejs,
  FaGithub,
  FaCode as FaCodeAlt
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { SiTypescript } from "react-icons/si";
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

            <div className="intro-content">
              <div className="text-content">
                <p>
                  As a front-end developer, mastering JavaScript is essential, whether you're gearing up for job interviews or enhancing your personal skill set. Recognizing the scarcity of comprehensive and freely accessible resources on this pivotal topic, we have JavaScript Handbook, an open-source, community-driven platform dedicated to high-quality JavaScript education. Here, developers can engage with interactive learning modules, practice through real-life coding challenges, and achieve a profound understanding of JavaScript.
                </p>
                <p>
                  Join us and contribute to a thriving open-source community that values knowledge sharing and collective improvement. Together, we'll navigate the complexities of JavaScript, transforming challenges into opportunities for growth.
                </p>
              </div>

              <div className="animated-illustration">
                <motion.div
                  className="floating-icons"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Core Layer */}
                  <motion.div
                    className="icon-wrapper js core"
                    animate={{
                      scale: [1, 1.05, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <FaJsSquare />
                  </motion.div>

                  {/* Framework Layer */}
                  <div className="framework-layer">
                    <motion.div
                      className="icon-wrapper react"
                      animate={{ y: [-3, 3] }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                      }}
                    >
                      <FaReact />
                    </motion.div>

                    <motion.div
                      className="icon-wrapper vue"
                      animate={{ y: [3, -3] }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                      }}
                    >
                      <FaVuejs />
                    </motion.div>

                    <motion.div
                      className="icon-wrapper typescript"
                      animate={{ y: [-3, 3] }}
                      transition={{
                        duration: 2.2,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                      }}
                    >
                      <SiTypescript />
                    </motion.div>
                  </div>

                  {/* Tools Layer */}
                  <div className="tools-layer">
                    <motion.div
                      className="icon-wrapper node"
                      animate={{ y: [2, -2] }}
                      transition={{
                        duration: 2.3,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                      }}
                    >
                      <FaNodeJs />
                    </motion.div>

                    <motion.div
                      className="icon-wrapper npm"
                      animate={{ y: [-2, 2] }}
                      transition={{
                        duration: 2.1,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                      }}
                    >
                      <FaNpm />
                    </motion.div>

                    <motion.div
                      className="icon-wrapper github"
                      animate={{ y: [2, -2] }}
                      transition={{
                        duration: 2.4,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut"
                      }}
                    >
                      <FaGithub />
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>
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
                  Explore JavaScript with our hands-on platform, blending theory with practical exercises. Master advanced techniques and best practices while engaging with real-world scenarios designed for modern web development.
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
                  At JavaScript Handbook, we turn challenges into opportunities and ideas into reality. Dive into JavaScript, raise your first PR, and collaborate with peers to create innovative solutions. Your contributions drive our collective creativity and success.                </p>
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
              <a href="mailto:harsh.srivastva97@gmail.com">Report an Issue</a>
            </div>
          </div>
        </motion.footer>
      </div>
    </motion.div>
  );
};

export default About;

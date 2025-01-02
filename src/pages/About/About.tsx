"use client";

import React, { useState } from "react";
import {
  FaGithub,
  FaUsers,
  FaTrophy,
  FaHeart,
  FaHome,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./About.scss";

const About: React.FC = () => {
  const [activeTab, setActiveTab] = useState("story");
  const navigate = useNavigate();

  const tabs = [
    {
      id: "story",
      title: "Our Story",
      content: [
        "JavaScript Handbook started as a personal collection of interview preparation notes. As the collection grew, it evolved into a comprehensive resource for JavaScript developers at all levels.",
        "Today, it serves as an interactive platform where developers can learn, practice, and master JavaScript concepts through hands-on examples and exercises.",
      ],
    },
    {
      id: "mission",
      title: "Our Mission",
      content: [
        "We aim to make JavaScript learning accessible and practical. Our platform combines theory with interactive examples, helping developers understand concepts deeply.",
        "Whether you're preparing for interviews or expanding your JavaScript knowledge, we provide the tools and resources you need to succeed.",
      ],
    },
    {
      id: "vision",
      title: "Our Vision",
      content: [
        "We envision a platform where every developer, regardless of their experience level, can find the resources they need to grow their JavaScript expertise.",
        "Through continuous community contributions and feedback, we're building a living document that evolves with JavaScript itself.",
      ],
    },
  ];

  const scrollFeatures = (direction: "left" | "right") => {
    const container = document.querySelector(".features-grid");
    if (container) {
      const scrollAmount = 300; // Adjust based on card width + gap
      const scrollPosition =
        direction === "left"
          ? container.scrollLeft - scrollAmount
          : container.scrollLeft + scrollAmount;

      container.scrollTo({
        left: scrollPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <motion.div
      className="about-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <button className="home-button" onClick={() => navigate("/")}>
        <FaHome />
      </button>
      <motion.header
        className="about-header"
        initial={{ y: -1 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.05 }}
      >
        <h1>About JavaScript Handbook</h1>
        <p className="subtitle">
          Building a community of JavaScript enthusiasts, one line of code at a
          time.
        </p>
      </motion.header>

      <div className="tabs-container">
        <div className="tabs-header">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`tab-button ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.title}
            </button>
          ))}
        </div>

        <div className="tabs-content">
          <AnimatePresence mode="wait">
            {tabs.map(
              (tab) =>
                activeTab === tab.id && (
                  <motion.div
                    key={tab.id}
                    className="tab-content"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.2 }}
                  >
                    {tab.content.map((paragraph, i) => (
                      <p key={i}>{paragraph}</p>
                    ))}
                  </motion.div>
                ),
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="features-wrapper">
        <button
          className="scroll-indicator left"
          onClick={() => scrollFeatures("left")}
          aria-label="Scroll left"
        >
          <FaChevronLeft />
        </button>

        <motion.div
          className="features-grid"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {[
            {
              icon: <FaUsers />,
              title: "Community Driven",
              desc: "Join a thriving community of JavaScript enthusiasts",
            },
            {
              icon: <FaTrophy />,
              title: "Leaderboard",
              desc: "Recognize our top contributors",
              link: "/leaderboard",
            },
            {
              icon: <FaGithub />,
              title: "Contribute",
              desc: "Help us grow on GitHub",
              link: "https://github.com/harshsrivastva97/javascript-handbook.git",
            },
            {
              icon: <FaHeart />,
              title: "Open Source",
              desc: "Built by the community, for the community",
            },
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              className="feature-card"
              whileHover={{ y: -5 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.6 }}
            >
              <div className="icon">{feature.icon}</div>
              {feature.link ? (
                <Link to={feature.link} className="card-content">
                  <h3>{feature.title}</h3>
                  <p>{feature.desc}</p>
                </Link>
              ) : (
                <div className="card-content">
                  <h3>{feature.title}</h3>
                  <p>{feature.desc}</p>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        <button
          className="scroll-indicator right"
          onClick={() => scrollFeatures("right")}
          aria-label="Scroll right"
        >
          <FaChevronRight />
        </button>
      </div>

      <motion.footer
        className="about-footer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <div className="footer-content">
          <p>
            Made with ❤️ by{" "}
            <a href="https://www.linkedin.com/in/harsh-srivastva/">
              Harsh Srivastva
            </a>
          </p>
          <div className="footer-links">
            <a
              href="https://github.com/harshsrivastva97/javascript-handbook"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
            <span className="separator">•</span>
            <Link to="/leaderboard">Leaderboard</Link>
            <span className="separator">•</span>
            <a href="mailto:harsh.srivastva97@gmail.com">Report an Issue</a>
          </div>
        </div>
      </motion.footer>
    </motion.div>
  );
};

export default About;

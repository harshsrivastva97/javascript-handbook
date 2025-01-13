import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaRocket,
  FaCode,
  FaLightbulb,
  FaBook,
  FaPencilAlt,
  FaHeart,
} from "react-icons/fa";
import "./Home.scss";

const Home: React.FC = () => {
  const featuredCards = [
    {
      title: "JavaScript Mastery Checklist",
      description:
        "Embark on your JavaScript journey by exploring a curated list of essential topics. Stay on track and watch your progress soar as you master the fundamentals!",
      path: "topics",
      icon: <FaRocket size={32} />,
      color: "#FF6B6B",
    },
    {
      title: "JavaScript Foundations",
      description:
        "Delve into some basic javascript concepts and strengthen your foundation. Start small, think big, and watch your skills transform!",
      path: "concepts",
      icon: <FaLightbulb size={32} />,
      color: "#FFD93D",
    },
    {
      title: "Interactive Code Workshop",
      description:
        "Master popular snippets. Dive into a hands-on learning experience with our interactive code editor tailored for learning. Includes common implementations like map, filter, reduce, debounce, throttle, and more.",
      path: "code-vault",
      icon: <FaCode size={32} />,
      color: "#4ECDC4",
    },
    {
      title: "Blogs",
      description:
        "Ignite your curiosity and expand your horizons with insightful articles, tips, and discoveries in the ever-evolving world of JavaScript.",
      path: "blogs",
      icon: <FaBook size={32} />,
      color: "#6C5CE7",
    },
    {
      title: "JavaScript Challenges",
      description:
        "Explore creative JavaScript exercises that test your skills and deepen your understanding. Strengthen your grasp on the language while building confidence in every step!",
      path: "exercises",
      icon: <FaPencilAlt size={32} />,
      color: "#A8E6CF",
    },
    {
      title: "Our Journey",
      description:
        "Discover the story, mission, and vision behind this handbook. Join us on a journey to inspire and empower JavaScript learners everywhere.",
      path: "about",
      icon: <FaHeart size={32} />,
      color: "#FF8B94",
    },
  ];

  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="home">
      <div className="magical-background">
        <div className="orb orb1"></div>
        <div className="orb orb2"></div>
        <div className="orb orb3"></div>
      </div>

      <section className="featured-section">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="section-header"
        >
          <h2>Your JavaScript Handbook</h2>
          <p className="subtitle">Begin your journey to JavaScript mastery</p>
        </motion.div>

        <motion.div
          className="cards-container"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {featuredCards.map((card, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="card"
              style={{ "--card-color": card.color } as React.CSSProperties}
            >
              <div
                className="card-icon-wrapper"
                style={{ backgroundColor: `${card.color}15` }}
              >
                {card.icon}
              </div>
              <h3 className="card-title">{card.title}</h3>
              <div className="card-content">
                <div>{card.description}</div>
              </div>
              <motion.button
                className="start-button"
                onClick={() => navigate(card.path)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Explore
                <svg viewBox="0 0 24 24" className="arrow-icon">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      </section>
    </div>
  );
};

export default Home;

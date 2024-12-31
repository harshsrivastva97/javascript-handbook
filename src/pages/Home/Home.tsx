import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./Home.scss";

const Home: React.FC = () => {
  const featuredCards = [
    {
      title: "JS Topics",
      description: "Embark on your JavaScript journey by exploring a curated list of essential topics. Stay on track and watch your progress soar as you master the fundamentals!",
      path: "topics",
    },
    {
      title: "JS Code Vault",
      description: "Master popular snippets. Dive into a hands-on learning experience with our interactive code editor tailored for learning.",
      path: "code-vault",
    },
    {
      title: "Concepts",
      description: "Delve into some basic javascript concepts and strengthen your foundation. Start small, think big, and watch your skills transform!",
      path: "concepts",
    },
    {
      title: "Blogs",
      description: "Ignite your curiosity and expand your horizons with insightful articles, tips, and discoveries in the ever-evolving world of JavaScript.",
      path: "blogs",
    },
    {
      title: "Exercises",
      description: "Explore creative JavaScript exercises that test your skills and deepen your understanding. Strengthen your grasp on the language while building confidence in every step!",
      path: "exercises",
    },
    {
      title: "About",
      description: "Discover the story, mission, and vision behind this handbook. Join us on a journey to inspire and empower JavaScript learners everywhere.",
      path: "about",
    },
  ];

  const navigate = useNavigate();

  return (
    <div className="home">
      <section className="featured-section">
        <div className="section-header">
          <h2>Your JavaScript Handbook</h2>
        </div>
        <div className="cards-container">
          {featuredCards.map((card, index) => (
            <div key={index} className={`card`}>
              <span className="card-icon">{card.title}</span>
              <div className="card-content">
                <div>{card.description}</div>
              </div>
              <motion.div
                whileHover={{ scale: 0.92 }}
                whileTap={{ scale: 0.88 }}
              >
                <button className="start-button" onClick={() => navigate(card.path)}>
                  Explore
                  <svg viewBox="0 0 24 24" className="arrow-icon">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </motion.div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;

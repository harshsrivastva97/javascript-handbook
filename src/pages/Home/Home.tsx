import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.scss";

const Home: React.FC = () => {
  const featuredCards = [
    {
      title: "JS Topics",
      description: "Go through the list of important topics in javascript.",
      path: "topics",
    },
    {
      title: "JS Code Vault",
      description: "Discover popular code snippets and create your own masterpieces.",
      path: "code-vault",
    },
    {
      title: "Concepts",
      description: "Master essential JavaScript concepts with quick refreshers.",
      path: "concepts",
    },
    {
      title: "Blogs",
      description: "Expand your knowledge with insightful JavaScript blogs.",
      path: "blogs",
    },
    {
      title: "Exercises",
      description: "Challenge yourself with fun and interactive coding exercises.",
      path: "exercises",
    },
    {
      title: "About",
      description: "Learn about the mission and vision behind this handbook.",
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
              <button className="start-button" onClick={() => navigate(card.path)}>
                Explore
                <svg viewBox="0 0 24 24" className="arrow-icon">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;

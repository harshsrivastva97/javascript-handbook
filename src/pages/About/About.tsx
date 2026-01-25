import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  FaRocket, 
  FaLightbulb, 
  FaBook,
  FaLaptopCode,
  FaUserGraduate,
  FaArrowRight,
  FaUsers,
  FaLayerGroup,
  FaShieldAlt,
  FaBolt
} from "react-icons/fa";
import './About.scss';
import { useTheme } from "../../contexts/ThemeContext";

const About: React.FC = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      clearTimeout(timer);
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  const handleStartLearning = () => {
    navigate('/library');
  };

  const features = [
    {
      title: "Living Library",
      icon: <FaBook />,
      description: "Continuously updated content from fundamentals to advanced patterns."
    },
    {
      title: "Hands-on Labs",
      icon: <FaLaptopCode />,
      description: "Practice in an interactive environment with instant feedback."
    },
    {
      title: "Modern Insights",
      icon: <FaLightbulb />,
      description: "Practical tips for tooling, performance, and real-world shipping."
    },
    {
      title: "Guided Paths",
      icon: <FaUserGraduate />,
      description: "Curated learning tracks with projects that build confidence."
    }
  ];

  const principles = [
    {
      title: "Accessible by default",
      description: "Inclusive content with clarity, captions, and inclusive examples."
    },
    {
      title: "Practical over perfect",
      description: "Focused on what developers need to ship, not just theory."
    },
    {
      title: "Community-led",
      description: "Curated with feedback and lessons learned from real teams."
    },
    {
      title: "Always evolving",
      description: "We keep pace with the ecosystem and emerging standards."
    }
  ];

  const stats = [
    { label: "Articles & guides", value: "180+" },
    { label: "Hands-on labs", value: "45+" },
    { label: "Active learners", value: "24k" }
  ];

  const milestones = [
    {
      title: "2019 — The idea",
      description: "A need for a modern, structured JS reference sparked the project."
    },
    {
      title: "2021 — First release",
      description: "We shipped our first learning paths and the interactive lab."
    },
    {
      title: "2023 — Community scale",
      description: "Thousands of learners helped shape the handbook every week."
    },
    {
      title: "Today — Always shipping",
      description: "We ship updates weekly with a focus on clarity and outcomes."
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 15, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div className={`about-page ${theme}`}>
      <section className="hero-section">
        <motion.div 
          className="hero-shell container"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="hero-copy">
            <span className="hero-badge">
              Built for modern JavaScript teams
            </span>
            <h1>About <span className="gradient-text">JS Handbook</span></h1>
            <p className="hero-lead">
              We help developers learn faster with structured paths, interactive labs, 
              and the practical guidance needed to ship confidently.
            </p>
            <div className="hero-actions">
              <button className="primary-btn" onClick={handleStartLearning}>
                Start Learning <FaArrowRight />
              </button>
              <button className="ghost-btn" onClick={() => navigate('/blog')}>
                Explore Updates
              </button>
            </div>
            <div className="stats-row">
              {stats.map((stat) => (
                <div key={stat.label} className="stat-card">
                  <span className="stat-value">{stat.value}</span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-orb"></div>
            <div className="hero-card main-card">
              <FaLayerGroup />
              <h3>Modular Learning</h3>
              <p>Learn topics in the order teams use them.</p>
            </div>
            <div className="hero-card accent-card">
              <FaBolt />
              <h3>Weekly Releases</h3>
              <p>Fresh lessons aligned with the ecosystem.</p>
            </div>
            <div className="hero-card outline-card">
              <FaShieldAlt />
              <h3>Trusted Patterns</h3>
              <p>Production-ready examples and guidance.</p>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="mission-section">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">Our mission</span>
            <h2>Built to shorten the learning curve</h2>
            <p>
              We created JS Handbook to replace scattered tutorials with a 
              single, modern destination for learning JavaScript.
            </p>
          </div>
          <div className="mission-grid">
            <motion.div 
              className="mission-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5 }}
            >
              <FaRocket />
              <h3>Teach what teams actually use</h3>
              <p>
                From fundamentals to frameworks, we focus on what makes you 
                effective on real projects.
              </p>
            </motion.div>
            <motion.div 
              className="mission-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <FaUsers />
              <h3>Designed for every level</h3>
              <p>
                Whether you are new to JS or leveling up, content adapts to 
                the way you learn best.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">What you get</span>
            <h2>Everything needed to learn and build</h2>
          </div>
          <motion.div 
            className="features-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {features.map((feature, index) => (
              <motion.div 
                key={index} 
                className="feature-card"
                variants={itemVariants}
              >
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="values-section">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">Principles</span>
            <h2>How we design the experience</h2>
          </div>
          <motion.div 
            className="values-grid"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {principles.map((value, index) => (
              <motion.div 
                key={index} 
                className="value-card"
                variants={itemVariants}
              >
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      <section className="timeline-section">
        <div className="container">
          <div className="section-header">
            <span className="eyebrow">Our journey</span>
            <h2>From idea to thriving community</h2>
          </div>
          <div className="timeline">
            {milestones.map((milestone) => (
              <div key={milestone.title} className="timeline-item">
                <div className="timeline-dot"></div>
                <div className="timeline-card">
                  <h3>{milestone.title}</h3>
                  <p>{milestone.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta-section">
        <motion.div 
          className="cta-content" 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2>Ready to master JavaScript?</h2>
          <p>
            Join thousands of learners building real-world skills with 
            structured paths and hands-on labs.
          </p>
          <div className="cta-actions">
            <button className="cta-button" onClick={handleStartLearning}>
              Get Started <FaArrowRight />
            </button>
            <button className="cta-ghost" onClick={() => navigate('/library')}>
              Browse the Library
            </button>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default About;
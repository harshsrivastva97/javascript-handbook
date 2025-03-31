import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  FaRocket, 
  FaLightbulb, 
  FaCode, 
  FaBook,
  FaLaptopCode,
  FaUserGraduate
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
      title: "Comprehensive Library",
      icon: <FaBook />,
      description: "Dive into our extensive JavaScript library covering everything from fundamentals to advanced concepts."
    },
    {
      title: "Interactive Lab",
      icon: <FaLaptopCode />,
      description: "Practice what you learn in our interactive coding environment with real-time feedback."
    },
    {
      title: "Dev Insights",
      icon: <FaLightbulb />,
      description: "Stay updated with the latest JavaScript trends, best practices, and expert tips."
    },
    {
      title: "Skill Arena",
      icon: <FaUserGraduate />,
      description: "Test your knowledge with challenging quizzes and coding exercises to reinforce learning."
    }
  ];

  const values = [
    {
      title: "Accessibility",
      description: "We believe quality education should be accessible to everyone, regardless of background or resources."
    },
    {
      title: "Excellence",
      description: "We strive for technical excellence in our content, ensuring accuracy and relevance in a rapidly evolving field."
    },
    {
      title: "Community",
      description: "We foster a supportive community where learners help each other grow and succeed together."
    },
    {
      title: "Innovation",
      description: "We continuously innovate our learning approaches to make complex concepts more intuitive and engaging."
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
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <motion.div 
            className="hero-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1>
              About <span className="gradient-text">JS Handbook</span>
            </h1>
            <p className="subtitle">
              Our mission is to make JavaScript learning accessible, engaging, and effective for everyone.
            </p>
          </motion.div>
        </div>
        <div className="hero-pattern"></div>
      </section>

      {/* Our Story Section */}
      <section className="story-section">
        <div className="container">
          <motion.div 
            className="section-title compact"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <FaRocket className="section-icon" />
            <h2>Our Story</h2>
          </motion.div>

          <motion.div 
            className="story-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="story-text">
              <p>
                JS Handbook began with a simple idea: to create the resource we wished we had when we were learning JavaScript. 
                In a world of fragmented tutorials and outdated documentation, we saw the need for a comprehensive, interactive, 
                and constantly updated platform for JavaScript learners at all levels.
              </p>
              <p>
                We believe that understanding JavaScript deeply is not just about remembering syntax, 
                but about grasping concepts and applying them to solve real problems.
              </p>
              <p>
                Today, JS Handbook continues to evolve with the JavaScript ecosystem, offering curated learning paths, 
                interactive coding challenges, and a supportive community. Our goal remains the same: to help you 
                <span className="gradient-text-accent"> code smarter and execute brilliantly</span>.
              </p>
            </div>
            <div className="story-image">
              <div className="code-sphere">
                <div className="orbit">
                  <div className="planet"></div>
                </div>
                <div className="orbit">
                  <div className="planet"></div>
                </div>
                <div className="orbit">
                  <div className="planet"></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <motion.div 
            className="section-title compact"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <FaCode className="section-icon" />
            <h2>What We Offer</h2>
          </motion.div>

          <motion.div 
            className="features-grid"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
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

      {/* Values Section */}
      <section className="values-section">
        <div className="container">
          <motion.div 
            className="section-title compact"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <FaLightbulb className="section-icon" />
            <h2>Our Core Values</h2>
          </motion.div>

          <motion.div 
            className="values-grid"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {values.map((value, index) => (
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

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <motion.div 
            className="cta-content"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h2>Ready to elevate your JavaScript skills?</h2>
            <p>Join thousands of developers who are mastering JavaScript with JS Handbook.</p>
            <button className="cta-button" onClick={handleStartLearning}>Start Learning</button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
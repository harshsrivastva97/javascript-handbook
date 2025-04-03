import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  FaRocket, 
  FaLightbulb, 
  FaCode, 
  FaBook,
  FaLaptopCode,
  FaUserGraduate,
  FaArrowRight
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
      title: "Library",
      icon: <FaBook />,
      description: "Comprehensive JavaScript resources from basics to advanced concepts"
    },
    {
      title: "Interactive",
      icon: <FaLaptopCode />,
      description: "Practice in our interactive coding environment with live feedback"
    },
    {
      title: "Insights",
      icon: <FaLightbulb />,
      description: "Latest JavaScript trends and expert development tips"
    },
    {
      title: "Learning",
      icon: <FaUserGraduate />,
      description: "Structured learning paths with hands-on coding exercises"
    }
  ];

  const values = [
    {
      title: "Accessible",
      description: "Quality education available to everyone, everywhere"
    },
    {
      title: "Excellence",
      description: "Accurate, up-to-date content for modern development"
    },
    {
      title: "Community",
      description: "Supportive environment for collaborative learning"
    },
    {
      title: "Innovation",
      description: "Modern approaches to technical education"
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
          className="hero-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1>About <span className="gradient-text">JS Handbook</span></h1>
          <p className="subtitle">Making JavaScript learning accessible, engaging, and effective</p>
        </motion.div>
      </section>

      <section className="story-section">
        <div className="container">
          <motion.div 
            className="story-content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="story-text">
              <h2>Our Story</h2>
              <p>
                We created JS Handbook to be the resource we wished we had when learning JavaScript. 
                In a world of scattered tutorials and outdated docs, we built a comprehensive, 
                interactive platform for JavaScript learners at all levels.
              </p>
              <button className="learn-more-btn" onClick={handleStartLearning}>
                Start Learning <FaArrowRight />
              </button>
            </div>
            <div className="story-image">
              <div className="code-sphere">
                <div className="orbit"><div className="planet"></div></div>
                <div className="orbit"><div className="planet"></div></div>
                <div className="orbit"><div className="planet"></div></div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="features-section">
        <div className="container">
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

      <section className="values-section">
        <div className="container">
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

      <section className="cta-section">
        <motion.div 
          className="cta-content flex flex-col items-center" 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2>Ready to master JavaScript?</h2>
          <button className="cta-button" onClick={handleStartLearning}>
            Get Started <FaArrowRight />
          </button>
        </motion.div>
      </section>
    </div>
  );
};

export default About;
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
  FaVuejs,
  FaGithub,
  FaRocket,
  FaBookOpen,
  FaLaptopCode,
  FaGraduationCap,
} from "react-icons/fa";
import { SiTypescript, SiWebpack, SiBabel, SiEslint, SiJavascript, SiNpm } from "react-icons/si";
import "./About.scss";

const About: React.FC = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
  };

  const techIcons = [
    { Icon: SiJavascript, color: "#f7df1e", name: "JavaScript" },
    { Icon: SiTypescript, color: "#3178c6", name: "TypeScript" },
    { Icon: FaReact, color: "#61dafb", name: "React" },
    { Icon: FaVuejs, color: "#42b883", name: "Vue.js" },
    { Icon: FaNodeJs, color: "#539e43", name: "Node.js" },
    { Icon: SiWebpack, color: "#8dd6f9", name: "Webpack" },
    { Icon: SiBabel, color: "#f9dc3e", name: "Babel" },
    { Icon: SiEslint, color: "#4b32c3", name: "ESLint" },
    { Icon: SiNpm, color: "#cb3837", name: "npm" },
  ];

  return (
    <div className="about-page scrollable min-h-screen pb-8">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Hero Section - More compact */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1
            className="text-4xl md:text-5xl font-bold mb-4 gradient-text"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            About JavaScript Handbook
          </motion.h1>
          <motion.p
            className="text-lg text-secondary max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            Your comprehensive guide to mastering modern JavaScript — from core concepts to advanced patterns.
          </motion.p>
        </motion.div>

        {/* Mission Section - Refined and compact */}
        <motion.section 
          className="mb-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-center">
            <motion.div 
              className="flex-1 order-2 md:order-1"
              variants={itemVariants}
            >
              <h2 className="text-3xl font-bold mb-6 gradient-text">Our Mission</h2>
              <div className="space-y-4">
                <p className="text-secondary">
                  JavaScript Handbook provides an accessible, interactive learning platform for JavaScript developers at all skill levels.
                </p>
                <p className="text-secondary">
                  We focus on learning by doing, combining in-depth tutorials with hands-on exercises that cover modern JavaScript concepts,
                  patterns, and best practices relevant to today's development ecosystem.
                </p>
                <p className="text-secondary">
                  From closures and promises to observables and proxies, our exercises challenge you to think deeply about JavaScript's core concepts.
                </p>
              </div>
            </motion.div>

            <motion.div 
              className="tech-icons-grid flex-1 order-1 md:order-2 grid grid-cols-3 gap-4"
              variants={itemVariants}
            >
              <div className="col-span-3 flex justify-center mb-2">
                <motion.div 
                  className="js-logo-container p-3 rounded-lg border shadow-sm"
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
                >
                  <SiJavascript className="text-6xl text-yellow-400" />
                </motion.div>
              </div>
              {techIcons.slice(1).map((tech, index) => (
                <motion.div
                  key={index}
                  className="tech-icon-box flex justify-center"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  whileHover={{ scale: 1.1, y: -5 }}
                >
                  <div className="p-3 rounded-lg border shadow-sm">
                    <tech.Icon className="text-2xl" style={{ color: tech.color }} />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Learning Path - Streamlined */}
        <motion.section 
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2 className="text-3xl font-bold mb-8 text-center gradient-text">Your Learning Journey</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <FaBookOpen />,
                title: "Learn",
                description: "Comprehensive tutorials covering JavaScript from fundamentals to advanced concepts."
              },
              {
                icon: <FaLaptopCode />,
                title: "Practice",
                description: "Interactive coding challenges to test and strengthen your understanding."
              },
              {
                icon: <FaGraduationCap />,
                title: "Master",
                description: "Progressive path from basics to expert-level JavaScript patterns and techniques."
              },
            ].map((step, index) => (
              <motion.div
                key={index}
                className="journey-card p-6 rounded-lg border shadow-sm relative"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
                whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
              >
                <div className="step-number absolute top-4 right-4 w-6 h-6 rounded-full bg-primary-50 flex items-center justify-center text-xs font-semibold text-primary">
                  {index + 1}
                </div>
                <div className="flex items-start">
                  <div className="icon-container mr-4 p-3 rounded-lg bg-primary-50 text-primary">
                    {step.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                    <p className="text-secondary text-sm">{step.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>
        
        {/* Features Section - Compact */}
        <motion.section 
          className="mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2 className="text-3xl font-bold mb-8 text-center gradient-text">What Sets Us Apart</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: <FaCode />,
                title: "Interactive Learning",
                description: "Hands-on exercises and real-time code editing instead of passive tutorials."
              },
              {
                icon: <FaLightbulb />,
                title: "Modern JavaScript",
                description: "Focus on ES6+ features, async patterns, and advanced concepts for today's development."
              },
              {
                icon: <FaUsers />,
                title: "Community Driven",
                description: "Built by developers for developers, with continuous community improvements."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="feature-card p-6 rounded-lg border shadow-sm"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
                whileHover={{ y: -5, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" }}
              >
                <div className="flex items-start">
                  <div className="icon-container mr-4 p-3 rounded-lg bg-primary-50 text-primary">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-secondary text-sm">{feature.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Call to Action Section - Cleaner */}
        <motion.section 
          className="mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="cta-container p-8 rounded-lg border shadow-sm">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="text-center md:text-left">
                <h2 className="text-2xl md:text-3xl font-bold mb-2 gradient-text">Ready to Master JavaScript?</h2>
                <p className="text-secondary">Start your journey with interactive exercises and comprehensive guides.</p>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <motion.a
                  href="/arena"
                  className="cta-button primary-button px-6 py-3 rounded-lg font-medium flex items-center gap-2 shadow-sm"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Try Arena <FaLaptopCode />
                </motion.a>
                
                <motion.a
                  href="/blogs"
                  className="cta-button secondary-button px-6 py-3 rounded-lg font-medium flex items-center gap-2 shadow-sm"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                >
                  Read Articles <FaBookOpen />
                </motion.a>
              </div>
            </div>
          </div>
        </motion.section>

        {/* GitHub Contribution - More compact and cleaner */}
        <motion.section
          className="mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="github-cta p-6 rounded-lg border shadow-sm">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <FaGithub className="text-3xl flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold">Contribute to Our Project</h3>
                  <p className="text-secondary text-sm">Help improve JavaScript Handbook by contributing</p>
                </div>
              </div>
              <motion.a
                href="https://github.com/harshsrivastva97/javascript-handbook"
                target="_blank"
                rel="noopener noreferrer"
                className="github-button px-4 py-2 rounded-lg font-medium flex items-center gap-2 shadow-sm whitespace-nowrap"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Join on GitHub <FaRocket className="text-sm" />
              </motion.a>
            </div>
          </div>
        </motion.section>

        {/* Footer - Simplified */}
        <motion.footer
          className="text-center pt-8 border-t"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <p className="flex items-center justify-center gap-2 text-secondary">
            Made with <FaHeart className="text-red-500" /> by{" "}
            <a
              href="https://www.linkedin.com/in/harsh-srivastva/"
              target="_blank"
              rel="noopener noreferrer"
              className="author-link font-medium"
            >
              Harsh Srivastva
            </a>
          </p>
          <div className="flex items-center justify-center gap-4 mt-4">
            <a
              href="https://github.com/harshsrivastva97/javascript-handbook"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link text-sm"
            >
              GitHub
            </a>
            <span className="text-gray-400">•</span>
            <a
              href="mailto:harsh.srivastva97@gmail.com"
              className="footer-link text-sm"
            >
              Report an Issue
            </a>
          </div>
        </motion.footer>
      </div>
    </div>
  );
};

export default About;

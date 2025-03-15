import React from 'react';
import { motion } from 'framer-motion';
import './scss/Badges.scss';

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

const Badges: React.FC = () => {
  return (
    <motion.div 
      className="section-content"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div 
        className="placeholder-content" 
        variants={itemVariants}
      >
        <h3>Your Achievements</h3>
        <p>Badges and accomplishments will be displayed here.</p>
      </motion.div>
    </motion.div>
  );
};

export default Badges;

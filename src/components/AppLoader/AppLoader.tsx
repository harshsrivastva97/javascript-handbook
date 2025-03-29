import React from 'react';
import { motion } from 'framer-motion';
import './AppLoader.scss';

interface AppLoaderProps {
  text?: string
}

const AppLoader: React.FC<AppLoaderProps> = ({ text = 'Loading...' }) => {
  const containerHeight = 'calc(100vh - 60px)';

  return (
    <div className="app-loader" style={{ height: containerHeight }}>
      <div className="app-loader-content">
        <div className="app-loader-graphics">
          <motion.div 
            className="app-loader-circle"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div 
              className="app-loader-pulse"
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.6, 0.2, 0.6]
              }}
              transition={{ 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut" 
              }}
            />
          </motion.div>
          
          <div className="app-loader-dots">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="app-loader-dot"
                // style={{ backgroundColor: '#646cff' }}
                initial={{ y: 0 }}
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.2,
                  ease: "easeInOut"
                }}
              />
            ))}
          </div>
        </div>
        
        {text && (
          <motion.div 
            className="app-loader-text"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <motion.span
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ 
                duration: 1.5, 
                repeat: Infinity,
                ease: "easeInOut" 
              }}
            >
              {text}
            </motion.span>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default AppLoader; 
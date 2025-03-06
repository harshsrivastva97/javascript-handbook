import React from 'react';
import { motion } from 'framer-motion';
import './AppLoader.scss';

interface AppLoaderProps {
  size?: 'small' | 'medium' | 'large';
  color?: string;
  text?: string;
  fullScreen?: boolean;
}

const AppLoader: React.FC<AppLoaderProps> = ({
  size = 'medium',
  color = '#646cff',
  text = 'Loading...',
  fullScreen = false,
}) => {
  const sizeMap = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12',
  };

  const containerClasses = fullScreen
    ? 'fixed inset-0 bg-background/80 backdrop-blur-sm z-50'
    : 'relative';

  return (
    <div className={`${containerClasses} flex items-center justify-center`}>
      <div className="flex flex-col items-center gap-4">
        <motion.div
          className={`${sizeMap[size]} relative`}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="absolute inset-0 border-4 rounded-full"
            style={{ borderColor: `${color} transparent transparent transparent` }}
            animate={{ rotate: 360 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        </motion.div>
        {text && (
          <motion.p
            className="text-secondary font-medium"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {text}
          </motion.p>
        )}
      </div>
    </div>
  );
};

export default AppLoader; 
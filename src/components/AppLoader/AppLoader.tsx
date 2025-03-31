import React from 'react';
import './AppLoader.scss';

const AppLoader: React.FC = () => {
  return (
    <div className="app-loader fixed inset-0 flex items-center justify-center bg-background z-50">
      <div className="loader-wrapper">
        <div className="code-sphere">
          <div className="sphere-core"></div>
          <div className="orbit orbit-1">
            <div className="planet js-planet">
              <span className="planet-label">JS</span>
            </div>
          </div>
          <div className="orbit orbit-2"></div>
          <div className="orbit orbit-3"></div>
          
          <div className="code-particles">
            {[...Array(15)].map((_, i) => (
              <div key={i} className="code-particle" style={{
                animationDelay: `${i * 0.3}s`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`
              }}></div>
            ))}
          </div>
        </div>
        
        <div className="w-32 h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden mt-8">
          <div className="h-full bg-gradient-to-r from-primary to-accent-primary animate-linear-progress"></div>
        </div>
        
        <p className="text-xs text-gray-500 mt-4 animate-pulse">Loading amazing content...</p>
      </div>
    </div>
  );
};

export default AppLoader;
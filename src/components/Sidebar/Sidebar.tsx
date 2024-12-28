import React, { useEffect, useState, useCallback } from "react";
import { TABS } from "../../constants/constants.js";
import "./Sidebar.scss";

interface SidebarProps {
  onTabSelect: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onTabSelect }) => {
  const [selectedTab, setSelectedTab] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('tab') || '';
  });
  
  const [expandedCategory, setExpandedCategory] = useState(
    Object.keys(TABS)[0],
  );

  useEffect(() => {
    if (selectedTab) {
      const category = Object.entries(TABS).find(([_, items]) => 
        items.some(item => item.filename === selectedTab)
      )?.[0];
      
      if (category) {
        setExpandedCategory(category);
        onTabSelect(selectedTab);
      }
    }
  }, [selectedTab, onTabSelect]);

  const handleTabSelect = useCallback((tabName: string) => {
    setSelectedTab(tabName);
    onTabSelect(tabName);
    const params = new URLSearchParams(window.location.search);
    params.set('tab', tabName);
    window.history.replaceState({}, '', `?${params.toString()}`);
  }, [onTabSelect]);

  const handleHeaderClick = () => {
    setSelectedTab('');
    onTabSelect('');
    window.history.pushState({}, '', window.location.pathname);
  };

  return (
    <aside className="sidebar">
      <div className="sidebar__header" onClick={handleHeaderClick}>
        <h1 className="sidebar__title">
          <span className="sidebar__title-icon">📚</span>
          <strong>JavaScript Essentials</strong>
        </h1>
        <p className="sidebar__subtitle">
          Your path to JavaScript mastery
          <span className="subtitle-emoji">✨</span>
        </p>
      </div>

      <nav className="sidebar__nav">
        {Object.entries(TABS).map(([category, items]) => (
          <div key={category} className="sidebar__category">
            <div 
              className={`sidebar__category-header ${expandedCategory === category ? 'active' : ''}`}
              onClick={() => setExpandedCategory(category)}
            >
              <div className="category-header-content">
                <span className="category-icon">•</span>
                <span className="category-title">{category}</span>
                <span className="category-count">{items.length}</span>
              </div>
              <span className="category-arrow">›</span>
            </div>
            
            <div className={`sidebar__category-items ${expandedCategory === category ? 'expanded' : ''}`}>
              {items.map((tab) => (
                <button
                  key={tab.filename}
                  className={`sidebar__nav-item ${selectedTab === tab.filename ? "active" : ""}`}
                  onClick={() => handleTabSelect(tab.filename)}
                >
                  <span className="nav-item-label">{tab.label}</span>
                  {selectedTab === tab.filename && (
                    <span className="nav-item-active-indicator">•</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div className="sidebar__footer">
        <div className="footer-content">
          <span className="footer-icon">💡</span>
          <span className="footer-text">Select a topic to begin learning</span>
        </div>
        <div className="progress-indicator">
          <div className="progress-text">Your Progress</div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: '10%' }}></div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

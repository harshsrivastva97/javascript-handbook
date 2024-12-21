import { useEffect, useState } from "react";
import { TABS } from "../../constants/constants.js";
import "./Sidebar.scss";

const CategoryIcon = {
  Array: "📦",
  Function: "⚡",
  Promise: "🔄",
  Performance: "⚡️",
};

function Sidebar({ onTabSelect }) {
  const [selectedTab, setSelectedTab] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get('tab') || '';
  });
  
  const [expandedCategory, setExpandedCategory] = useState(
    Object.keys(TABS)[0],
  );
  const [visibleItems, setVisibleItems] = useState([]);

  useEffect(() => {
    if (selectedTab) {
      for (const [category, items] of Object.entries(TABS)) {
        if (items.some(item => item.filename === selectedTab)) {
          setExpandedCategory(category);
          break;
        }
      }
      onTabSelect(selectedTab);
    }
  }, []);

  useEffect(() => {
    if (expandedCategory) {
      const items = TABS[expandedCategory] || [];
      const timer = setTimeout(() => {
        setVisibleItems(items.map((item) => item.filename));
      }, 50);
      return () => clearTimeout(timer);
    }
    setVisibleItems([]);
  }, [expandedCategory]);

  const handleTabSelect = (tabName) => {
    setSelectedTab(tabName);
    onTabSelect(tabName);
    const params = new URLSearchParams(window.location.search);
    params.set('tab', tabName);
    window.history.replaceState({}, '', `?${params.toString()}`);
  };

  const handleHeaderClick = () => {
    setSelectedTab('');
    onTabSelect('');
    window.history.pushState({}, '', window.location.pathname);
  };

  return (
    <aside className="sidebar">
      <div className="sidebar__header" onClick={handleHeaderClick} style={{ cursor: 'pointer' }}>
        <h1 className="sidebar__title">
          <span className="sidebar__title-icon">📚</span>
          <strong>JavaScript Essentials</strong>
        </h1>
        <p className="sidebar__subtitle">Master Modern JavaScript</p>
      </div>

      <nav className="sidebar__nav">
        {Object.entries(TABS).map(([category, items]) => (
          <div key={category} className="sidebar__category">
            <div className="sidebar__category-header">
              <span className="category-icon">{CategoryIcon[category]}</span>
              <span className="category-title">{category}</span>
            </div>
            
            <div className="sidebar__category-items">
              {items.map((tab) => (
                <button
                  key={tab.filename}
                  className={`sidebar__nav-item ${selectedTab === tab.filename ? "active" : ""}`}
                  onClick={() => handleTabSelect(tab.filename)}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div className="sidebar__footer">
        <span className="footer-icon">💡</span>
        <span>Click on a topic to learn more</span>
      </div>
    </aside>
  );
}

export default Sidebar;

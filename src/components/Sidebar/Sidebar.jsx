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
  const [selectedTab, setSelectedTab] = useState("");
  const [expandedCategory, setExpandedCategory] = useState(
    Object.keys(TABS)[0],
  );
  const [visibleItems, setVisibleItems] = useState([]);

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

  return (
    <aside className="sidebar">
      <div className="sidebar__header">
        <h1 className="sidebar__title">
          <span className="sidebar__title-icon">📚</span>
          JavaScript Essentials
        </h1>
        <p className="sidebar__subtitle">Master Modern JavaScript</p>
      </div>

      <nav className="sidebar__nav">
        {Object.entries(TABS).map(([category, items]) => (
          <div key={category} className="sidebar__category">
            <button
              className={`sidebar__category-header ${expandedCategory === category ? "active" : ""}`}
              onClick={() =>
                setExpandedCategory((prev) =>
                  prev === category ? "" : category,
                )
              }
            >
              <span className="category-icon">{CategoryIcon[category]}</span>
              <span className="category-title">{category}</span>
              <span className="category-icon">
                {expandedCategory === category ? "▼" : "▶"}
              </span>
            </button>

            <div
              className={`sidebar__category-items ${expandedCategory === category ? "expanded" : ""}`}
            >
              {items.map((tab, index) => (
                <button
                  key={tab.filename}
                  className={`sidebar__nav-item ${selectedTab === tab.filename ? "active" : ""} ${
                    visibleItems.includes(tab.filename) ? "visible" : ""
                  }`}
                  onClick={() => {
                    setSelectedTab(tab.filename);
                    onTabSelect(tab.filename);
                  }}
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <span className="nav-item-dot">•</span>
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

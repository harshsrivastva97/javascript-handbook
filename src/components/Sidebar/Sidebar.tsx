import React, { useEffect, useState, useCallback } from "react";
import ReactConfetti from "react-confetti";
import { TABS } from "../../constants/constants";
import "./Sidebar.scss";
import { motion } from "framer-motion";

interface SidebarProps {
  onTabSelect: (tab: string) => void;
}

// Add interface for tab items
interface TabItem {
  filename: string;
  label: string;
}

const Sidebar: React.FC<SidebarProps> = ({ onTabSelect }) => {
  const [selectedTab, setSelectedTab] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get("tab") || "";
  });

  // Add state for completed items
  const [completedItems, setCompletedItems] = useState<string[]>(() => {
    const saved = localStorage.getItem("completedItems");
    return saved ? JSON.parse(saved) : [];
  });

  // Calculate progress using flattened tabs
  const allTabs = Object.values(TABS).flat() as TabItem[];
  const totalItems = allTabs.length;
  const progress = (completedItems.length / totalItems) * 100;

  // Add state for reset confirmation dialog
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Add state for celebration
  const [showCelebration, setShowCelebration] = useState(false);

  // Check if progress is complete
  useEffect(() => {
    if (progress === 100 && !showCelebration) {
      setShowCelebration(true);
      // Hide celebration after 5 seconds
      setTimeout(() => setShowCelebration(false), 5000);
    }
  }, [progress]);

  // Handle checkbox toggle
  const handleCheckboxToggle = (tabName: string) => {
    setCompletedItems((prev) => {
      const newCompleted = prev.includes(tabName)
        ? prev.filter((item) => item !== tabName)
        : [...prev, tabName];

      // Save to localStorage
      localStorage.setItem("completedItems", JSON.stringify(newCompleted));
      return newCompleted;
    });
  };

  // Handle reset progress
  const handleResetProgress = () => {
    setCompletedItems([]);
    localStorage.removeItem("completedItems");
    setShowResetConfirm(false);
  };

  useEffect(() => {
    if (selectedTab) {
      const category = Object.entries(TABS).find(([_, items]) =>
        items.some((item) => item.filename === selectedTab),
      )?.[0];

      if (category) {
        onTabSelect(selectedTab);
      }
    }
  }, [selectedTab, onTabSelect]);

  const handleTabSelect = useCallback(
    (tabName: string) => {
      setSelectedTab(tabName);
      onTabSelect(tabName);
      const params = new URLSearchParams(window.location.search);
      params.set("tab", tabName);
      window.history.replaceState({}, "", `?${params.toString()}`);
    },
    [onTabSelect],
  );

  const handleHeaderClick = () => {
    setSelectedTab("");
    onTabSelect("");
    window.history.pushState({}, "", window.location.pathname);
  };

  return (
    <aside className="sidebar flex flex-col">
      {/* Celebration overlay */}
      {showCelebration && (
        <div className="celebration-overlay">
          <ReactConfetti
            width={window.innerWidth}
            height={window.innerHeight}
            recycle={false}
            numberOfPieces={1000}
          />
        </div>
      )}

      <div className="sidebar__header" onClick={handleHeaderClick}>
        <div className="progress-indicator">
          <div className="progress-text">
            Progress: {completedItems.length}/{totalItems} completed
            <button
              className="reset-button"
              onClick={(e) => {
                e.stopPropagation();
                setShowResetConfirm(true);
              }}
            >
              ↺
            </button>
          </div>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Add reset confirmation dialog */}
      {showResetConfirm && (
        <div
          className="reset-confirm-overlay"
          onClick={() => setShowResetConfirm(false)}
        >
          <div
            className="reset-confirm-dialog"
            onClick={(e) => e.stopPropagation()}
          >
            <h3>Reset Progress</h3>
            <p>Are you sure you want to reset all progress?</p>
            <div className="reset-confirm-actions">
              <button
                className="reset-confirm-button cancel"
                onClick={() => setShowResetConfirm(false)}
              >
                Cancel
              </button>
              <button
                className="reset-confirm-button confirm"
                onClick={handleResetProgress}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}

      <nav className="sidebar__nav">
        {allTabs.map((tab) => (
          <motion.div
            key={tab.filename}
            className={`sidebar__nav-item ${selectedTab === tab.filename ? "active" : ""}`}
            onClick={() => handleTabSelect(tab.filename)}
          >
            <div className="nav-item-label">
              <span>{tab.label}</span>
              <div className="nav-item-actions">
                <button
                  className={`status-icon ${completedItems.includes(tab.filename) ? 'completed' : ''}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCheckboxToggle(tab.filename);
                  }}
                >
                  {completedItems.includes(tab.filename) ? "✓" : "○"}
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </nav>

      <div className="sidebar__footer">
        <span className="footer-icon">💡</span>
        <span className="footer-text">Select a topic to begin learning</span>
      </div>
    </aside>
  );
};

export default Sidebar;

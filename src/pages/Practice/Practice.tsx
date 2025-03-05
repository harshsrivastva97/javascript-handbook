import React, { useState, useCallback, useEffect } from "react";
import ReactConfetti from "react-confetti";
import CodeEditor from "../../components/CodeEditor/CodeEditor";
import { TABS } from "../../constants/constants";
import "./Practice.scss";

// Add interfaces
interface TabItem {
  filename: string;
  label: string;
}

const defaultJsTemplate = `// Welcome to JavaScript Essentials!
// Select a topic from the sidebar to get started.

// Example:
const message = "Start coding!";
console.log(message);
`;

const CodeVault: React.FC = () => {
  const [currentCode, setCurrentCode] = useState(defaultJsTemplate);
  const [showCelebration, setShowCelebration] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  // Add state for selected tab
  const [selectedTab, setSelectedTab] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get("tab") || "";
  });

  // Add state for completed items
  const [completedItems, setCompletedItems] = useState<string[]>(() => {
    const saved = localStorage.getItem("completedItems");
    return saved ? JSON.parse(saved) : [];
  });

  const allTabs: TabItem[] = TABS;
  const totalItems = allTabs.length;
  const progress = (completedItems.length / totalItems) * 100;

  // Check if progress is complete
  useEffect(() => {
    if (progress === 100 && !showCelebration) {
      setShowCelebration(true);
    }
  }, [progress]);

  const errorScript = (
    fileName: string,
  ) => `// Error loading the script: ${fileName}.js
// Please try again or refresh the page.`;

  const handleTabSelect = useCallback(async (fileName: string) => {
    if (!fileName) {
      setCurrentCode(defaultJsTemplate);
      setSelectedFileName("");
      setSelectedTab("");
      window.history.pushState({}, "", window.location.pathname);
      return;
    }

    setSelectedFileName(fileName);
    setSelectedTab(fileName);

    const params = new URLSearchParams(window.location.search);
    params.set("tab", fileName);
    window.history.replaceState({}, "", `?${params.toString()}`);

    try {
      const response = await fetch(`/scripts/${fileName}.js`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const code = await response.text();
      setCurrentCode(code);
    } catch (error) {
      console.error("Error loading the script:", error);
      setCurrentCode(errorScript(fileName));
    }
  }, []);

  // Handle checkbox toggle
  const handleCheckboxToggle = (tabName: string) => {
    setCompletedItems((prev) => {
      const newCompleted = prev.includes(tabName)
        ? prev.filter((item) => item !== tabName)
        : [...prev, tabName];

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

  return (
    <div className="code-vault">
      {showCelebration && (
        <ReactConfetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={1000}
        />
      )}
      <aside className="sidebar flex flex-col pb-16">
        <div className="sidebar__header" onClick={() => handleTabSelect("")}>
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
            <div
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
            </div>
          ))}
        </nav>

        <div className="sidebar__footer">
          <span className="footer-icon">💡</span>
          <span className="footer-text">Select a topic to begin learning</span>
        </div>
      </aside>

      <main className="code-vault__main">
        <div className="code-vault__content">
          <CodeEditor code={currentCode} selectedFile={selectedFileName} />
        </div>
      </main>
    </div>
  );
};

export default CodeVault;

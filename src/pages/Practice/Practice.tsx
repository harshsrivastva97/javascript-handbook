import React, { useState, useCallback, useEffect } from "react";
import ReactConfetti from "react-confetti";
import CodeEditor from "../../components/CodeEditor/CodeEditor";
import { SNIPPETS_TABS } from "../../constants/consts/tabs";
import { FiChevronLeft, FiBookOpen, FiCheckCircle } from "react-icons/fi";
import { RiLightbulbFlashLine, RiJavascriptLine } from "react-icons/ri";
import "./Practice.scss";

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
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const [selectedTab, setSelectedTab] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get("tab") || "";
  });

  const [completedItems, setCompletedItems] = useState<string[]>(() => {
    const saved = localStorage.getItem("completedItems");
    return saved ? JSON.parse(saved) : [];
  });

  const allTabs: TabItem[] = SNIPPETS_TABS;
  const totalItems = allTabs.length;
  const progress = (completedItems.length / totalItems) * 100;

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

  const handleCheckboxToggle = (tabName: string) => {
    setCompletedItems((prev) => {
      const newCompleted = prev.includes(tabName)
        ? prev.filter((item) => item !== tabName)
        : [...prev, tabName];

      localStorage.setItem("completedItems", JSON.stringify(newCompleted));
      return newCompleted;
    });
  };

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
      <aside className={`sidebar flex flex-col pb-16 ${isSidebarCollapsed ? 'collapsed' : ''}`}>
        <button 
          className="sidebar-toggle"
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          aria-label={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <FiChevronLeft className="toggle-icon" />
        </button>

        <div className="sidebar__header" onClick={() => handleTabSelect("")}>
          <div className="header-content">
            <RiJavascriptLine className="header-icon" />
            <div className="header-text">
              <h3>JAVASCRIPT PLAYGROUND</h3>
              <div className="progress-indicator">
                <div className="progress-text">
                  <span className="progress-label">
                    <FiBookOpen className="progress-icon" />
                    <span>{completedItems.length}/{totalItems}</span>
                  </span>
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
          <div className="nav-section">
            {allTabs.map((tab) => (
              <div
                key={tab.filename}
                className={`sidebar__nav-item ${selectedTab === tab.filename ? "active" : ""}`}
                onClick={() => handleTabSelect(tab.filename)}
              >
                <div className="nav-item-label">
                  <span className="nav-item-text">{tab.label}</span>
                  <div className="nav-item-actions">
                    <button
                      className={`status-icon ${completedItems.includes(tab.filename) ? 'completed' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCheckboxToggle(tab.filename);
                      }}
                    >
                      {completedItems.includes(tab.filename) ? <FiCheckCircle className="check-icon" /> : "○"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </nav>
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

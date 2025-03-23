import React, { useState, useCallback, useEffect, useRef } from "react";
import ReactConfetti from "react-confetti";
import CodeEditor from "../../components/CodeEditor/CodeEditor";
import { FiChevronLeft, FiBookOpen, FiCheckCircle, FiStar, FiAward, FiTarget } from "react-icons/fi";
import { RiLightbulbFlashLine, RiJavascriptLine, RiFireLine } from "react-icons/ri";
import { TbStarsFilled } from "react-icons/tb";
import { FaLock } from "react-icons/fa";
import Modal from "../../components/Modal/Modal";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchSnippetsList, fetchSnippetById } from "../../redux/slices/snippetsSlice";
import { SnippetSchema } from "../../api/types/snippetTypes";
import "./Lab.scss";

interface TabItem extends SnippetSchema {
  snippet_id: number;
  filename: string;
  label: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  isLocked: boolean;
  order: number;
}

const defaultJsTemplate = `// Welcome to JavaScript Essentials!
// Select a topic from the sidebar to get started.

// Example:
const message = "Start coding!";
console.log(message);
`;

const Lab: React.FC = () => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.userData.user?.user_id);
  const snippetsData = useAppSelector((state) => state.snippets.snippets) as TabItem[];
  const [currentCode, setCurrentCode] = useState(defaultJsTemplate);
  const [showCelebration, setShowCelebration] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all');
  const confettiRef = useRef<HTMLDivElement>(null);

  const [selectedTab, setSelectedTab] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get("tab") || (snippetsData.length > 0 ? snippetsData[0].filename : "");
  });

  const [completedItems, setCompletedItems] = useState<string[]>(() => {
    const saved = localStorage.getItem("completedItems");
    return saved ? JSON.parse(saved) : [];
  });

  const totalItems = snippetsData.length;
  const progress = (completedItems.length / totalItems) * 100;
  
  const activeTabData = selectedTab 
    ? snippetsData.find((tab: TabItem) => tab.filename === selectedTab) 
    : null;

  const filteredTabs = activeTab === 'all' 
    ? snippetsData 
    : snippetsData.filter((tab: TabItem) => tab.difficulty === activeTab);

  useEffect(() => {
    if (progress === 100 && !showCelebration) {
      setShowCelebration(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => setShowCelebration(false), 8000);
    }
  }, [progress, showCelebration]);

  const errorScript = (fileName: string) => 
    `// Error loading the script: ${fileName}.js
// Please try again or refresh the page.`;

  const handleTabSelect = useCallback(async (filename: string) => {
    if (!filename) {
      setCurrentCode(defaultJsTemplate);
      setSelectedFileName("");
      setSelectedTab("");
      window.history.pushState({}, "", window.location.pathname);
      return;
    }
    
    // Don't load locked content
    const isLocked = snippetsData.find(tab => tab.filename === filename)?.isLocked;
    if (isLocked) return;

    setSelectedFileName(filename);
    setSelectedTab(filename);

    const params = new URLSearchParams(window.location.search);
    params.set("tab", filename);
    window.history.replaceState({}, "", `?${params.toString()}`);

    try {
      let code: string;
      
      if (userId) {
        // User is logged in - fetch from API
        const snippet = snippetsData.find(tab => tab.filename === filename);
        if (snippet) {
          const response = await dispatch(fetchSnippetById(snippet.snippet_id.toString())).unwrap();
          code = response.content || '';
        } else {
          throw new Error('Snippet not found');
        }
      } else {
        // User is not logged in - try to get from localStorage
        const storedContent = localStorage.getItem(`snippet_${filename}`);
        if (storedContent) {
          code = storedContent;
        } else {
          // If not in localStorage, fetch from server and store
          const response = await fetch(`/scripts/${filename}.js`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          code = await response.text();
          localStorage.setItem(`snippet_${filename}`, code);
        }
      }
      
      setCurrentCode(code);
    } catch (error) {
      console.error("Error loading the script:", error);
      setCurrentCode(errorScript(filename));
    }
  }, [snippetsData, userId, dispatch]);
  
  useEffect(() => {
    if (selectedTab && currentCode === defaultJsTemplate && snippetsData.length > 0) {
      handleTabSelect(selectedTab);
    }
  }, [selectedTab, currentCode, handleTabSelect, snippetsData.length]);

  const handleCheckboxToggle = (filename: string) => {
    setCompletedItems((prev) => {
      const newCompleted = prev.includes(filename)
        ? prev.filter((item) => item !== filename)
        : [...prev, filename];

      localStorage.setItem("completedItems", JSON.stringify(newCompleted));
      return newCompleted;
    });
  };

  const handleResetProgress = () => {
    setCompletedItems([]);
    localStorage.removeItem("completedItems");
    setShowResetConfirm(false);
  };
  
  const getDifficultyInfo = (difficulty: string) => {
    const difficultyMap = {
      'beginner': { text: 'Beginner', color: 'var(--success)', icon: <FiStar /> },
      'intermediate': { text: 'Intermediate', color: 'var(--warning)', icon: <FiTarget /> },
      'advanced': { text: 'Advanced', color: 'var(--danger)', icon: <FiAward /> },
      'default': { text: 'Beginner', color: 'var(--success)', icon: <FiStar /> }
    };
    return difficultyMap[difficulty as keyof typeof difficultyMap] || difficultyMap.default;
  };

  useEffect(() => {
    dispatch(fetchSnippetsList(userId || ''));
  }, [dispatch, userId]);

  return (
    <div className="practice-page">
      {showCelebration && (
        <div ref={confettiRef} className="confetti-container">
          <ReactConfetti
            width={window.innerWidth}
            height={window.innerHeight}
            recycle={false}
            numberOfPieces={1000}
            tweenDuration={8000}
            colors={['#FFD700', '#FF5757', '#7C4DFF', '#00E676', '#2196F3']}
          />
          <div className="celebration-message">
            <TbStarsFilled className="celebration-icon" />
            <h2>Congratulations!</h2>
            <p>You've completed all JavaScript challenges!</p>
          </div>
        </div>
      )}
      
      <div className="practice-layout">
        {/* Sidebar Toggle Button */}
        <button 
          className={`sidebar-toggle ${isSidebarCollapsed ? 'collapsed' : ''}`}
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          aria-label={isSidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          <FiChevronLeft className="toggle-icon" />
        </button>
        
        {/* Sidebar */}
        <div className={`sidebar-container ${isSidebarCollapsed ? 'collapsed-container' : ''}`}>
          <aside className={`sidebar ${isSidebarCollapsed ? 'collapsed' : ''}`}>
            {/* Sidebar Header */}
            <div className="sidebar__header" onClick={() => handleTabSelect("")}>
              <div className="header-content">
                <RiJavascriptLine className="header-icon" />
                <div className="header-text">
                  <h3 className="gradient-text">JAVASCRIPT PLAYGROUND</h3>
                  <div className="progress-indicator">
                    <div className="progress-text">
                      <div className="progress-stats">
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
                          aria-label="Reset progress"
                        >
                          ↺
                        </button>
                      </div>
                    </div>
                    <div className="progress-bar">
                      <div
                        className="progress-fill"
                        style={{ width: `${progress}%` }}
                      />
                      <div className="progress-milestones">
                        <div 
                          className="milestone" 
                          data-reached={progress >= 33}
                        />
                        <div 
                          className="milestone" 
                          data-reached={progress >= 66}
                        />
                        <div 
                          className="milestone" 
                          data-reached={progress >= 100}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Filter tabs by difficulty */}
            <div className="difficulty-filter">
              <button 
                className={`filter-button ${activeTab === 'all' ? 'active' : ''}`}
                onClick={() => setActiveTab('all')}
              >
                All
              </button>
              <button 
                className={`filter-button ${activeTab === 'beginner' ? 'active' : ''}`}
                onClick={() => setActiveTab('beginner')}
              >
                Beginner
              </button>
              <button 
                className={`filter-button ${activeTab === 'intermediate' ? 'active' : ''}`}
                onClick={() => setActiveTab('intermediate')}
              >
                Intermediate
              </button>
              <button 
                className={`filter-button ${activeTab === 'advanced' ? 'active' : ''}`}
                onClick={() => setActiveTab('advanced')}
              >
                Advanced
              </button>
            </div>

            {/* Reset Confirmation Modal */}
            <Modal
              isOpen={showResetConfirm}
              onClose={() => setShowResetConfirm(false)}
              title="Reset Progress"
              actions={
                <>
                  <button
                    className="modal-button cancel"
                    onClick={() => setShowResetConfirm(false)}
                  >
                    Cancel
                  </button>
                  <button
                    className="modal-button confirm"
                    onClick={handleResetProgress}
                  >
                    Reset
                  </button>
                </>
              }
            >
              <p>Are you sure you want to reset all progress? This cannot be undone.</p>
            </Modal>

            {/* Navigation Items */}
            <nav className="sidebar__nav">
              <div className="nav-section">
                {filteredTabs.map((tab, index) => {
                  const isCompleted = completedItems.includes(tab.filename);
                  const isActive = selectedTab === tab.filename;
                  
                  return (
                    <div
                      key={tab.filename}
                      className={`sidebar__nav-item ${isActive ? "active" : ""} ${tab.isLocked ? 'locked' : ''}`}
                      onClick={() => !tab.isLocked && handleTabSelect(tab.filename)}
                    >
                      <div className="nav-item-label">
                        <div className="nav-item-info">
                          <span className={`difficulty-indicator ${tab.difficulty}`}>
                            {getDifficultyInfo(tab.difficulty).icon}
                          </span>
                          <span className="nav-item-text">{tab.label}</span>
                          {tab.isLocked && <FaLock className="lock-icon" />}
                        </div>
                        <div className="nav-item-actions">
                          <button
                            className={`status-icon ${isCompleted ? 'completed' : ''} ${tab.isLocked ? 'disabled' : ''}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              if (!tab.isLocked) handleCheckboxToggle(tab.filename);
                            }}
                            aria-label={isCompleted ? "Mark as incomplete" : "Mark as complete"}
                            disabled={tab.isLocked}
                          >
                            {isCompleted ? <FiCheckCircle className="check-icon" /> : "○"}
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </nav>
          </aside>
        </div>

        {/* Main Content Area */}
        <main className="practice-main">
          {/* Selected Tab Header */}
          {activeTabData && (
            <div className="selected-tab-header">
              <div className="tab-info">
                <h1>{activeTabData.label}</h1>
                <div className="tab-meta">
                  <span className={`difficulty-badge ${activeTabData.difficulty}`}>
                    {getDifficultyInfo(activeTabData.difficulty).icon}
                    {getDifficultyInfo(activeTabData.difficulty).text}
                  </span>
                  <span className={`status-badge ${completedItems.includes(activeTabData.filename) ? 'completed' : 'pending'}`}>
                    {completedItems.includes(activeTabData.filename) ? 'Completed' : 'Not completed'}
                  </span>
                </div>
              </div>
              <div className="tab-actions">
                <button 
                  className={`complete-button ${completedItems.includes(activeTabData.filename) ? 'completed' : ''}`}
                  onClick={() => handleCheckboxToggle(activeTabData.filename)}
                >
                  {completedItems.includes(activeTabData.filename) 
                    ? <>Completed <FiCheckCircle /></> 
                    : <>Mark as Complete <FiCheckCircle /></>
                  }
                </button>
              </div>
            </div>
          )}
          
          {/* Code Editor */}
          <div className="code-container">
            <CodeEditor code={currentCode} selectedFile={selectedFileName} />
          </div>
          
          {/* Welcome Message when no tab is selected */}
          {!selectedTab && (
            <div className="welcome-message">
              <div className="welcome-content">
                <div>
                  <RiJavascriptLine className="welcome-icon" />
                </div>
                <h2>
                  Welcome to JavaScript Practice
                </h2>
                <p>
                  Select a challenge from the sidebar to get started with interactive coding.
                </p>
                <div className="features-grid">
                  {[
                    {
                      icon: <RiFireLine className="feature-icon" />,
                      title: "Interactive Challenges",
                      description: "Practice with real-world JavaScript examples"
                    },
                    {
                      icon: <FiTarget className="feature-icon" />,
                      title: "Track Progress",
                      description: "Monitor your learning journey step by step"
                    },
                    {
                      icon: <RiLightbulbFlashLine className="feature-icon" />,
                      title: "Learn By Doing",
                      description: "Apply concepts immediately in the code editor"
                    }
                  ].map((feature, index) => (
                    <div 
                      key={index}
                      className="feature-card"
                    >
                      {feature.icon}
                      <h3>{feature.title}</h3>
                      <p>{feature.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Lab;

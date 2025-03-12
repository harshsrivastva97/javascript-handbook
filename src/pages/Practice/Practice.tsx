import React, { useState, useCallback, useEffect, useRef } from "react";
import ReactConfetti from "react-confetti";
import CodeEditor from "../../components/CodeEditor/CodeEditor";
import { SNIPPETS_TABS } from "../../constants/consts/tabs";
import { FiChevronLeft, FiBookOpen, FiCheckCircle, FiStar, FiAward, FiTarget } from "react-icons/fi";
import { RiLightbulbFlashLine, RiJavascriptLine, RiFireLine } from "react-icons/ri";
import { TbStarsFilled } from "react-icons/tb";
import { FaLock } from "react-icons/fa";
import Modal from "../../components/Modal/Modal";
import { motion, AnimatePresence } from "framer-motion";
import "./Practice.scss";

interface TabItem {
  filename: string;
  label: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  isLocked?: boolean;
  description?: string;
}

const defaultJsTemplate = `// Welcome to JavaScript Essentials!
// Select a topic from the sidebar to get started.

// Example:
const message = "Start coding!";
console.log(message);
`;

const Practice: React.FC = () => {
  const [currentCode, setCurrentCode] = useState(defaultJsTemplate);
  const [showCelebration, setShowCelebration] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState("");
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all');
  const confettiRef = useRef<HTMLDivElement>(null);

  const [selectedTab, setSelectedTab] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    // Return the tab from URL params, or the first tab if none specified
    return params.get("tab") || (SNIPPETS_TABS.length > 0 ? SNIPPETS_TABS[0].filename : "");
  });

  const [completedItems, setCompletedItems] = useState<string[]>(() => {
    const saved = localStorage.getItem("completedItems");
    return saved ? JSON.parse(saved) : [];
  });

  // Adding difficulty levels and descriptions to each tab for better UI
  const enhancedTabs: TabItem[] = SNIPPETS_TABS.map((tab, index) => ({
    ...tab,
    difficulty: ['beginner', 'intermediate', 'advanced'][Math.floor(index / (SNIPPETS_TABS.length / 3))] as 'beginner' | 'intermediate' | 'advanced',
    isLocked: index > SNIPPETS_TABS.length * 0.7 && completedItems.length < SNIPPETS_TABS.length * 0.5
  }));

  const totalItems = enhancedTabs.length;
  const progress = (completedItems.length / totalItems) * 100;
  
  // Get current active tab data
  const activeTabData = selectedTab 
    ? enhancedTabs.find(tab => tab.filename === selectedTab) 
    : null;

  // Filter tabs based on selected difficulty
  const filteredTabs = activeTab === 'all' 
    ? enhancedTabs 
    : enhancedTabs.filter(tab => tab.difficulty === activeTab);

  useEffect(() => {
    if (progress === 100 && !showCelebration) {
      setShowCelebration(true);
      // Scroll to top for best confetti effect
      window.scrollTo({ top: 0, behavior: 'smooth' });
      // Hide celebration after 8 seconds
      setTimeout(() => setShowCelebration(false), 8000);
    }
  }, [progress, showCelebration]);

  const errorScript = (fileName: string) => 
    `// Error loading the script: ${fileName}.js
// Please try again or refresh the page.`;

  const handleTabSelect = useCallback(async (fileName: string) => {
    if (!fileName) {
      setCurrentCode(defaultJsTemplate);
      setSelectedFileName("");
      setSelectedTab("");
      window.history.pushState({}, "", window.location.pathname);
      return;
    }
    
    // Don't load locked content
    const isLocked = enhancedTabs.find(tab => tab.filename === fileName)?.isLocked;
    if (isLocked) return;

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
  }, [enhancedTabs]);
  
  // Load the first tab content by default - moved here after handleTabSelect is defined
  useEffect(() => {
    // If a tab is selected but no content loaded yet, load it
    if (selectedTab && currentCode === defaultJsTemplate && SNIPPETS_TABS.length > 0) {
      handleTabSelect(selectedTab);
    }
  }, [selectedTab, currentCode, handleTabSelect, SNIPPETS_TABS.length]);

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
  
  // Get difficulty text and color
  const getDifficultyInfo = (difficulty: string | undefined) => {
    const difficultyMap = {
      'beginner': { text: 'Beginner', color: 'var(--success)', icon: <FiStar /> },
      'intermediate': { text: 'Intermediate', color: 'var(--warning)', icon: <FiTarget /> },
      'advanced': { text: 'Advanced', color: 'var(--danger)', icon: <FiAward /> },
      'default': { text: 'Beginner', color: 'var(--success)', icon: <FiStar /> }
    };
    return difficultyMap[difficulty as keyof typeof difficultyMap] || difficultyMap.default;
  };

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
                      <motion.div
                        className="progress-fill"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      />
                      <div className="progress-milestones">
                        <motion.div 
                          className="milestone" 
                          data-reached={progress >= 33}
                          initial={{ scale: 0.6, opacity: 0.5 }}
                          animate={{ 
                            scale: progress >= 33 ? [0.6, 1.2, 1] : 0.6,
                            opacity: progress >= 33 ? 1 : 0.5 
                          }}
                          transition={{ 
                            duration: 0.5, 
                            delay: 0.8,
                          }}
                        />
                        <motion.div 
                          className="milestone" 
                          data-reached={progress >= 66}
                          initial={{ scale: 0.6, opacity: 0.5 }}
                          animate={{ 
                            scale: progress >= 66 ? [0.6, 1.2, 1] : 0.6,
                            opacity: progress >= 66 ? 1 : 0.5 
                          }}
                          transition={{ 
                            duration: 0.5, 
                            delay: 1,
                          }}
                        />
                        <motion.div 
                          className="milestone" 
                          data-reached={progress >= 100}
                          initial={{ scale: 0.6, opacity: 0.5 }}
                          animate={{ 
                            scale: progress >= 100 ? [0.6, 1.2, 1] : 0.6,
                            opacity: progress >= 100 ? 1 : 0.5 
                          }}
                          transition={{ 
                            duration: 0.5, 
                            delay: 1.2,
                          }}
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
                <AnimatePresence>
                  {filteredTabs.map((tab, index) => {
                    const isCompleted = completedItems.includes(tab.filename);
                    const isActive = selectedTab === tab.filename;
                    
                    return (
                      <motion.div
                        key={tab.filename}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2, delay: index * 0.03 }}
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
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
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
            <motion.div 
              className="welcome-message"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="welcome-content">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
                >
                  <RiJavascriptLine className="welcome-icon" />
                </motion.div>
                <motion.h2
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                >
                  Welcome to JavaScript Practice
                </motion.h2>
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  Select a challenge from the sidebar to get started with interactive coding.
                </motion.p>
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
                    <motion.div 
                      key={index}
                      className="feature-card"
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ 
                        delay: 0.5 + (index * 0.1),
                        duration: 0.5,
                        type: "spring",
                        stiffness: 100
                      }}
                    >
                      {feature.icon}
                      <h3>{feature.title}</h3>
                      <p>{feature.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
};

export default Practice;

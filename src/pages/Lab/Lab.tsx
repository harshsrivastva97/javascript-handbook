import React, { useState, useEffect, useRef } from "react";
import ReactConfetti from "react-confetti";
import { FiChevronLeft, FiBookOpen } from "react-icons/fi";
import { RiJavascriptLine } from "react-icons/ri";
import { TbStarsFilled } from "react-icons/tb";
import { FaLock } from "react-icons/fa";
import { BsCheckCircleFill, BsCircle } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchSnippetsList, fetchSnippetById } from "../../redux/slices/snippetsSlice";
import { SnippetSchema } from "../../api/types/snippetTypes";
import CodeEditor from "../../components/CodeEditor/CodeEditor";
import AppLoader from "../../components/AppLoader/AppLoader";
import Modal from "../../components/Modal/Modal";
import { defaultJsTemplate } from "../../constants/consts";
import "./Lab.scss";

const Lab: React.FC = () => {
  const dispatch = useAppDispatch();

  const userId = useAppSelector((state) => state.userData.user?.user_id);
  const snippetsData: SnippetSchema[] = useAppSelector((state) => state.snippets.snippets);
  const snippetsLoading = useAppSelector((state) => state.snippets.loading);

  const [currentCode, setCurrentCode] = useState(defaultJsTemplate);
  const [showCelebration, setShowCelebration] = useState(false);
  const [celebrationShown, setCelebrationShown] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const confettiRef = useRef<HTMLDivElement>(null);

  const [queryParams, setQueryParams] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    return params.get("tab") || '';
  });

  const [completedItems, setCompletedItems] = useState<string[]>(() => {
    const saved = localStorage.getItem("completedItems");
    return saved ? JSON.parse(saved) : [];
  });

  const totalItems = snippetsData.length;
  const progress = totalItems > 0 ? (completedItems.length / totalItems) * 100 : 0;

  useEffect(() => { 
    if (progress === 100 && !showCelebration && !celebrationShown) {
      setShowCelebration(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setTimeout(() => {
        setShowCelebration(false);
        setCelebrationShown(true);
      }, 8000);
    }
  }, [progress, showCelebration, celebrationShown]);

  // Reset the celebration status when progress changes from 100% to less than 100%
  useEffect(() => {
    if (progress < 100) {
      setCelebrationShown(false);
    }
  }, [progress]);

  const errorScript = (fileName: string) =>
    `// Error loading the script: ${fileName}.js
// Please try again or refresh the page.`;

  const updateContent = (content: string) => {
    setCurrentCode(content);
    setIsLoading(false);
  }

  const getSnippetById = async (id: string) => {
    if (!id) return;
    
    setIsLoading(true);
    try {
      const response = await dispatch(fetchSnippetById(id.toString())).unwrap();
      updateContent(response.content || '');
      return response.content || '';
    } catch (error) {
      console.error("Error loading the script:", error);
      return errorScript(id.toString());
    }
  }

  const handleTabSelect = async (selected: SnippetSchema) => {
    const { snippet_id } = selected;
    const params = new URLSearchParams(window.location.search);
    params.set("tab", String(snippet_id));
    window.history.replaceState({}, '', `${window.location.pathname}?${params}`);
    setQueryParams(snippet_id.toString()); 
  }

  // Initialize the first tab if none is selected
  useEffect(() => {
    if (snippetsData.length > 0 && !queryParams && !snippetsLoading) {
      handleTabSelect(snippetsData[0]);
    }
  }, [snippetsData, queryParams, snippetsLoading]);

  // Load snippet when query params change
  useEffect(() => {
    if (queryParams) {
      getSnippetById(queryParams);
    }
  }, [queryParams]);

  const handleCheckboxToggle = (snippet_id: number) => {
    setCompletedItems((prev) => {
      const newCompleted = prev.includes(snippet_id.toString())
        ? prev.filter((item) => item !== snippet_id.toString())
        : [...prev, snippet_id.toString()];

      localStorage.setItem("completedItems", JSON.stringify(newCompleted));
      return newCompleted;
    });
  };

  const handleResetProgress = () => {
    setCompletedItems([]);
    localStorage.removeItem("completedItems");
    setShowResetConfirm(false);
  };

  useEffect(() => {
    if (userId) {
      dispatch(fetchSnippetsList(userId));
    }
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
            <p>You've completed all JavaScript snippets!</p>
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
            <div className="sidebar__header" onClick={() => snippetsData.length > 0 && handleTabSelect(snippetsData[0])}>
              <div className="header-content">
                <RiJavascriptLine className="header-icon" />
                <div className="header-text">
                  <h3 className="gradient-text">GET HANDS ON</h3>
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
                {snippetsData.map(tab => {
                  const isCompleted = completedItems.includes(tab.snippet_id.toString());
                  const isActive = queryParams === tab.snippet_id.toString();
                  return (
                    <div
                      key={tab.snippet_id}
                      className={`sidebar__nav-item ${isActive ? "active" : ""} ${tab.is_locked ? 'locked' : ''}`}
                      onClick={() => handleTabSelect(tab)}
                    >
                      <div className="nav-item-label">
                        <div className="nav-item-info">
                          <span className="nav-item-text">{tab.label}</span>
                          {tab.is_locked && <FaLock className="lock-icon" />}
                        </div>
                        <div className="nav-item-actions">
                          <button
                            className={`status-icon ${isCompleted ? 'completed' : ''} ${tab.is_locked ? 'disabled' : ''}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              if (!tab.is_locked) handleCheckboxToggle(tab.snippet_id);
                            }}
                            aria-label={isCompleted ? "Mark as incomplete" : "Mark as complete"}
                            disabled={tab.is_locked}
                            title={isCompleted ? "Mark as incomplete" : "Mark as complete"}
                          >
                            {isCompleted ? <BsCheckCircleFill className="check-icon" /> : <BsCircle />}
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

          {/* Code Editor */}
          <div className="code-container">
            {isLoading || snippetsLoading ? (
              <AppLoader
                text="Loading snippet..."
              />
            ) : (
              <CodeEditor code={currentCode} />
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Lab;

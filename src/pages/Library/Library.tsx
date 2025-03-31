import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { LibrarySchema } from "../../api/types/libraryTypes";
import { getAllTopics, getTopicDetails } from "../../redux/slices/librarySlice";
import { resetUserProgress, updateTopicStatus } from "../../redux/slices/progressSlice";
import { ProgressStatus } from "../../constants/enums";
import { calculateProgress } from "../../utils/progressUtils";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Confetti from 'react-confetti';
import { RiJavascriptLine } from "react-icons/ri";
import { HiChevronLeft } from "react-icons/hi";
import { FiCode, FiCheckCircle, FiCircle } from "react-icons/fi";
import AppLoader from "../../components/AppLoader/AppLoader";
import Modal from "../../components/Modal/Modal";
import JsEditor from "../../components/JsEditor/JsEditor";

import "./Library.scss";

const Library: React.FC = () => {
  const dispatch = useAppDispatch();
  const [searchParams] = useSearchParams();
  const user = useAppSelector(state => state.userData.user);
  const topics = useAppSelector(state => state.topicsData.topics);
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showProgressTooltip, setShowProgressTooltip] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  
  const [selectedTopic, setSelectedTopic] = useState<LibrarySchema | null>(null);
  const [motivationalMessage, setMotivationalMessage] = useState('');
  const [lastProgress, setLastProgress] = useState(0);
  
  const progress = useMemo(() => calculateProgress(topics), [topics]);
  const completedCount = topics.filter((t: LibrarySchema) => t.status === ProgressStatus.COMPLETED).length;

  const isTopicCompleted = (topicId: number) => 
    topics.find((t: LibrarySchema) => t.topic_id === topicId)?.status === ProgressStatus.COMPLETED;

  const getMotivationalMessage = (progressValue: number) => {
    if (progressValue === 0) return "Ready to start your JavaScript journey?";
    if (progressValue < 25) return "Great start! Keep going!";
    if (progressValue < 50) return "You're making good progress!";
    if (progressValue < 75) return "More than halfway there! You're doing great!";
    if (progressValue < 100) return "Almost there! Just a few more to go!";
    return "Congratulations! You've completed all topics! 🎉";
  };

  const showConfettiEffect = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  };

  const toggleTopicComplete = (topicId: number, e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (!user?.user_id) return;

    const topic = topics.find((t: LibrarySchema) => t.topic_id === topicId);
    const newStatus = topic?.status === ProgressStatus.COMPLETED ? ProgressStatus.PENDING : ProgressStatus.COMPLETED;

    if (newStatus === ProgressStatus.COMPLETED) {
      showConfettiEffect();
    }

    dispatch(updateTopicStatus({
      user_id: user.user_id,
      topic_id: topicId,
      status: newStatus,
      dispatch
    }));
  };

  const handleTopicSelect = async (topic: LibrarySchema) => {
    setIsLoadingDetails(true);
    try {
      const result = await dispatch(getTopicDetails(topic.topic_id.toString())).unwrap();
      setSelectedTopic(result);
    } catch (error) {
      console.error('Failed to fetch topic details:', error);
    } finally {
      setIsLoadingDetails(false);
    }
  };

  const toggleEditor = () => setIsEditorOpen(prev => !prev);

  const handleResetProgress = async () => {
    if (!user?.user_id) return;
    await dispatch(resetUserProgress(user.user_id));
    await dispatch(getAllTopics(user.user_id));
    setShowResetConfirm(false);
  };

  const toggleSidebar = () => setIsSidebarOpen(prev => !prev);

  useEffect(() => {
    dispatch(getAllTopics(user?.user_id || ''));
  }, [dispatch, user?.user_id]);

  useEffect(() => {
    setMotivationalMessage(getMotivationalMessage(progress));

    const milestones = [25, 50, 75, 100];
    const prevMilestone = milestones.find(m => lastProgress < m);
    const currMilestone = milestones.find(m => progress >= m && lastProgress < m);
    
    if (currMilestone && prevMilestone && currMilestone === prevMilestone) {
      showConfettiEffect();
    }
    
    setLastProgress(progress);
  }, [progress, lastProgress]);

  useEffect(() => {
    const conceptId = searchParams.get('conceptId');
    if (conceptId && topics.length > 0) {
      const topic = topics.find(t => t.topic_id.toString() === conceptId);
      if (topic && (!selectedTopic || selectedTopic.topic_id !== topic.topic_id)) {
        handleTopicSelect(topic);
      }
    } else if (topics.length > 0 && !selectedTopic) {
      handleTopicSelect(topics[0]);
    }
  }, [searchParams, topics, selectedTopic]);

  return (
    <div className="read-page">
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          recycle={false}
          numberOfPieces={200}
          gravity={0.15}
          colors={['#7c4dff', '#2ecc71', '#3498db', '#f39c12', '#e74c3c']}
        />
      )}
      
      <button
        onClick={toggleSidebar}
        className={`sidebar-toggle flex-center ${!isSidebarOpen ? 'collapsed' : ''}`}
        aria-label={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
      >
        <HiChevronLeft className="size-6" />
      </button>

      <Modal
        isOpen={showResetConfirm}
        onClose={() => setShowResetConfirm(false)}
        title="Reset Progress"
        actions={
          <>
            <button className="modal-button cancel" onClick={() => setShowResetConfirm(false)}>
              Cancel
            </button>
            <button className="modal-button confirm" onClick={handleResetProgress}>
              Reset
            </button>
          </>
        }
      >
        <p className="text-sm">Are you sure you want to reset all progress?</p>
      </Modal>

      <div className="flex h-[calc(100vh-64px)]">
        {/* Sidebar */}
        <div className={`sidebar ${isSidebarOpen ? '' : 'collapsed'}`}>
          <div className="progress">
            <div className="flex items-center justify-between mb-2">
              <div className="progress__title flex items-center gap-2 font-bold">
                <RiJavascriptLine className="size-4 text-[var(--accent-primary)]" />
                <h3 className="text-xs tracking-widest gradient-text">MUST KNOW</h3>
              </div>
              <button
                className="svg-action"
                onClick={() => setShowResetConfirm(true)}
                aria-label="Reset progress"
              >
                ↺
              </button>
            </div>
            
            {motivationalMessage && (
              <div className="motivational-message">
                {motivationalMessage}
              </div>
            )}
            
            <div className="progress__details">
              <span>
                {completedCount} of {topics?.length} completed
              </span>
              <span 
                className={`progress__details-percent ${progress >= 25 && lastProgress < 25 ? 'milestone-reached' : ''}`}
                onMouseEnter={() => setShowProgressTooltip(true)}
                onMouseLeave={() => setShowProgressTooltip(false)}
              >
                {Math.round(progress)}%
                {showProgressTooltip && (
                  <div className="progress-tooltip">
                    {progress < 100 ? `${Math.ceil(100 - progress)}% to go!` : 'All complete!'}
                  </div>
                )}
              </span>
            </div>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${progress}%` }}
              />
              <div className="progress-milestones">
                <div className="milestone"></div>
                <div className="milestone"></div>
                <div className="milestone"></div>
              </div>
            </div>
          </div>

          <div className="text-sm">
            {topics.map((topic: LibrarySchema) => {
              const isCompleted = isTopicCompleted(topic.topic_id);
              const isActive = selectedTopic?.topic_id === topic.topic_id;

              return (
                <div
                  key={topic.topic_id}
                  className={`sidebar-item ${isActive ? 'active' : ''} 
                    ${isCompleted ? 'completed' : ''}`}
                >
                  <div 
                    className="flex items-center justify-between w-full cursor-pointer"
                    onClick={() => handleTopicSelect(topic)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="status-dot" />
                      <span className="sidebar-text">{topic.title}</span>
                    </div>
                    <button 
                      className="completion-toggle"
                      onClick={(e) => toggleTopicComplete(topic.topic_id, e)}
                      aria-label={isCompleted ? "Mark as incomplete" : "Mark as complete"}
                    >
                      {isCompleted ? (
                        <FiCheckCircle className="check-icon completed" />
                      ) : (
                        <FiCircle className="check-icon" />
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Content Area */}
        <div className={`content-area ${!isSidebarOpen ? 'sidebar-collapsed' : ''} ${isEditorOpen ? 'editor-open' : ''}`}>
          {isLoadingDetails ? (
            <AppLoader />
          ) : selectedTopic ? (
            <>
              <div className="content-wrapper text-left">
                <div className="markdown-container">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>{selectedTopic.content}</ReactMarkdown>
                </div>
              </div>

              {isEditorOpen && (
                <div className="editor-wrapper">
                  <JsEditor onClose={toggleEditor} />
                </div>
              )}
            </>
          ) : null}
        </div>

        {!isEditorOpen && (
          <button
            onClick={toggleEditor}
            className={`editor-toggle gradient-button ${isEditorOpen ? 'active' : ''}`}
            aria-label="Toggle code editor"
          >
            <FiCode />
          </button>
        )}
      </div>
    </div>
  );
};

export default Library;
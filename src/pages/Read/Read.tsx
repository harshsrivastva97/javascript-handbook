import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Prism from "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import { LuCopy } from "react-icons/lu";
import { RiJavascriptLine } from "react-icons/ri";
import { FaCode } from "react-icons/fa";
import { TiTick } from "react-icons/ti";
import { HiChevronLeft } from "react-icons/hi";
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { TopicSchema } from "../../api/types/topicTypes";
import { getAllTopics, getTopicDetails } from "../../redux/slices/topicsSlice";
import { updateTopicStatus } from "../../redux/slices/progressSlice";
import { ProgressStatus } from "../../constants/enums/progressStatus";
import { calculateProgress } from "../../utils/progressUtils";
import AppLoader from "../../components/AppLoader/AppLoader";
import { useTheme } from "../../contexts/ThemeContext";
import "../../assets/styles/prism-theme.scss";
import "./Read.scss";
import { FiCode } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import Modal from "../../components/Modal/Modal";
import JsEditor from "../../components/JsEditor/JsEditor";

const Topics: React.FC = () => {
  const dispatch = useAppDispatch();
  const { theme } = useTheme();
  const [searchParams] = useSearchParams();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const topics = useAppSelector(state => state.topicsData.topics);
  const progress = useMemo(() => calculateProgress(topics), [topics]);

  const [selectedConcept, setSelectedConcept] = useState<TopicSchema | null>(null);
  const [showCopied, setShowCopied] = useState(false);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editorCode, setEditorCode] = useState('');

  const user = useAppSelector(state => state.userData.user);

  const isTopicCompleted = (topicId: number) => {
    const topic = topics.find((t: TopicSchema) => t.topic_id === topicId);
    return topic?.status === ProgressStatus.COMPLETED;
  };

  const completedCount = topics.filter((t: TopicSchema) => t.status === ProgressStatus.COMPLETED).length;

  const toggleTopicComplete = (topicId: number) => {
    if (!user?.user_id) return;

    const topic = topics.find((t: TopicSchema) => t.topic_id === topicId);
    const newStatus: ProgressStatus = topic?.status === ProgressStatus.COMPLETED ? ProgressStatus.PENDING : ProgressStatus.COMPLETED;

    dispatch(updateTopicStatus({
      user_id: user.user_id,
      topic_id: topicId,
      status: newStatus
    }));
  };

  const copyToClipboard = async (text: string | undefined) => {
    if (!text) return;

    try {
      await navigator.clipboard.writeText(text);
      setShowCopied(true);

      setTimeout(() => {
        setShowCopied(false);
      }, 2000);
    } catch (err) {
      console.error("Failed to copy code:", err);
    }
  };

  const handleTopicSelect = async (topic: TopicSchema) => {
    setIsLoadingDetails(true);
    try {
      const result = await dispatch(getTopicDetails(topic.topic_id.toString())).unwrap();
      setSelectedConcept(result);
      setEditorCode(result.code_example || '// Try your code here');
    } catch (error) {
      console.error('Failed to fetch topic details:', error);
    } finally {
      setIsLoadingDetails(false);
    }
  };

  const handleOpenEditor = () => {
    setIsEditorOpen(true);
    if (window.innerWidth < 1400 && isSidebarOpen) {
      setIsSidebarOpen(false);
    }
  };

  const handleNewTopic = () => {
    console.log("Creating new topic...");
  };

  const toggleEditor = () => {
    setIsEditorOpen(prev => !prev);
  };

  const resetProgress = () => {
    if (!user?.user_id) return;
    // Reset all topic statuses to PENDING
    topics.forEach((topic: TopicSchema) => {
      if (topic.status === ProgressStatus.COMPLETED) {
        dispatch(updateTopicStatus({
          user_id: user.user_id,
          topic_id: topic.topic_id,
          status: ProgressStatus.PENDING
        }));
      }
    });
    setShowResetConfirm(false);
  };

  useEffect(() => {
    if (user?.user_id) {
      dispatch(getAllTopics(user?.user_id));
    }
  }, [dispatch]);

  useEffect(() => {
    if (selectedConcept?.code_example) {
      Prism.highlightAll();
    }
  }, [selectedConcept]);


  useEffect(() => {
    const conceptId = searchParams.get('conceptId');
    if (conceptId && topics.length > 0) {
      const topic = topics.find(t => t.topic_id.toString() === conceptId);
      if (topic && (!selectedConcept || selectedConcept.topic_id !== topic.topic_id)) {
        handleTopicSelect(topic);
      }
    } else if (topics.length > 0 && !selectedConcept) {
      handleTopicSelect(topics[0]);
    }
  }, [searchParams, topics, selectedConcept]);

  return (
    <div className="read-page">
      {/* Sidebar Toggle Button */}
      <button
        onClick={() => setIsSidebarOpen(prev => !prev)}
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
            <button
              className="modal-button cancel"
              onClick={() => setShowResetConfirm(false)}
            >
              Cancel
            </button>
            <button
              className="modal-button confirm"
              onClick={() => {
                resetProgress();
              }}
            >
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
                <RiJavascriptLine className="size-4 gradient-text" />
                <h3 className="text-xs tracking-widest gradient-text">MUST KNOW</h3>
              </div>
              <button
                className="svg-action"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowResetConfirm(true);
                }}
                aria-label="Reset progress"
              >
                ↺
              </button>
            </div>
            <div className="progress__details">
              <span>
                {completedCount} of {topics?.length} completed
              </span>
              <span className="progress__details-percent">
                {Math.round(progress)}%
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
            {topics.map((topic: TopicSchema) => {
              const isCompleted = isTopicCompleted(topic.topic_id);
              const isActive = selectedConcept?.topic_id === topic.topic_id;

              return (
                <div
                  key={topic.topic_id}
                  className={`sidebar-item ${isActive ? 'active' : ''} 
                    ${isCompleted ? 'completed' : ''}`}
                  onClick={() => handleTopicSelect(topic)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="status-dot" />
                      <span className="text-sm">{topic.title}</span>
                    </div>
                    {isCompleted && (
                      <TiTick className="size-5" style={{
                        color: 'var(--success)',
                        filter: 'drop-shadow(0 2px 4px rgba(46, 213, 115, 0.3))'
                      }} />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Content Area */}
        <div className={`content-area ${!isSidebarOpen ? 'sidebar-collapsed' : ''} ${isEditorOpen ? 'editor-open' : ''}`}>
          {isLoadingDetails ? (
            <AppLoader fullScreen text="Loading topic details..." />
          ) : selectedConcept ? (
            <>
              <div className="content-wrapper">
                <div className="flex flex-col gap-4 mb-8">
                  <div className="flex items-center justify-between gap-6">
                    <h1 className="gradient-text text-2xl font-semibold">{selectedConcept.title}</h1>
                    <button
                      onClick={() => toggleTopicComplete(selectedConcept.topic_id)}
                      className={`complete-button gradient-button font-medium text-sm whitespace-nowrap text-center ${isTopicCompleted(selectedConcept.topic_id) ? 'completed' : 'pending'
                        }`}
                      style={{
                        padding: '0.75rem 1.5rem',
                        borderRadius: '12px',
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                      }}
                    >
                      <span className="flex items-center gap-2">
                        <TiTick className="size-5" />
                        {isTopicCompleted(selectedConcept.topic_id) ? 'Completed' : 'Mark as Complete'}
                      </span>
                    </button>
                  </div>
                </div>

                <div>
                  <div
                    className="prose"
                    dangerouslySetInnerHTML={{
                      __html: selectedConcept.explanation || '',
                    }}
                  />

                  {selectedConcept.code_example && (
                    <div className={`code-container mt-7 w-full ${theme}-theme`}>
                      <div className="code-header">
                        <h3 className="flex items-center gap-2 text-accent-primary font-semibold text-lg">
                          <FaCode className="size-5" />
                          Example Code
                        </h3>
                        <div className="flex items-center gap-3">
                          <button
                            className="try-code-button gradient-button"
                            onClick={handleOpenEditor}
                          >
                            <FiCode className="size-4" />
                            Try it
                          </button>
                          <div
                            className={`copy-icon-wrapper ${showCopied ? 'copied' : ''}`}
                            onClick={() => copyToClipboard(selectedConcept.code_example)}
                            role="button"
                            tabIndex={0}
                            aria-label={showCopied ? "Code copied!" : "Copy code"}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                copyToClipboard(selectedConcept.code_example);
                              }
                            }}
                          >
                            <LuCopy className={`w-4 h-4 ${showCopied ? 'text-success' : 'text-text-secondary'}`} />
                          </div>
                        </div>
                      </div>
                      <pre className="py-4 px-6 overflow-x-auto">
                        <code className="language-javascript">
                          {selectedConcept.code_example}
                        </code>
                      </pre>
                    </div>
                  )}

                  {selectedConcept.pro_tips && selectedConcept.pro_tips.length > 0 && (
                    <div className="pro-tips">
                      <h3>Pro Tips</h3>
                      <ul>
                        {selectedConcept.pro_tips.map((tip, index) => (
                          <li key={index}>
                            <span className="tip-bullet">•</span>
                            <span>{tip}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {selectedConcept.common_mistakes && selectedConcept.common_mistakes.length > 0 && (
                    <div className="common-mistakes">
                      <h3>Common Mistakes to Avoid</h3>
                      <ul>
                        {selectedConcept.common_mistakes.map((mistake, index) => (
                          <li key={index}>
                            <span className="mistake-bullet">•</span>
                            <span>{mistake}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="key-points p-6 hover:translate-y-[-1px] hover:shadow-lg transition-all duration-200 mb-8">
                    <h3 className="text-accent-primary font-semibold text-lg flex items-center gap-3">Key Points</h3>
                    <ul>
                      {selectedConcept.key_points?.map((point, index) => (
                        <li key={index} className="flex items-start gap-2.5 border-b border-border-color last:border-0 last:pb-0 first:pt-0 text-text-secondary">
                          <span className="text-accent-primary text-xl leading-none opacity-80">•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {isEditorOpen && (
                <div className="editor-wrapper">
                  <JsEditor
                    code={editorCode}
                    onClose={toggleEditor}
                  />
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

export default Topics;
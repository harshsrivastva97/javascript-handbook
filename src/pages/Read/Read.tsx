import React, { useState, useEffect, useMemo } from "react";
import Prism from "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { TopicSchema } from "../../api/types/topicTypes";
import { getAllTopics, getTopicDetails, updateTopicStatus } from "../../redux/slices/topicsSlice";
import { ProgressStatus } from "../../constants/enums/progressStatus";
import { calculateProgress } from "../../utils/progressUtils";
import AppLoader from "../../components/AppLoader/AppLoader";
import { useTheme } from "../../contexts/ThemeContext";
import "../../assets/styles/prism-theme.scss";
import "./Read.scss";

const Topics: React.FC = () => {
  const dispatch = useAppDispatch();
  const { theme } = useTheme();

  const topics = useAppSelector(state => state.topicsData.topics);
  const progress = useMemo(() => calculateProgress(topics), [topics]);

  const loading = useAppSelector(state => state.topicsData.loading);
  const [selectedConcept, setSelectedConcept] = useState<TopicSchema | null>(null);
  const [showCopied, setShowCopied] = useState(false);

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

  const copyToClipboard = (text: string | undefined) => {
    if (!text) return;
    navigator.clipboard.writeText(text).then(
      () => {
        setShowCopied(true);
        setTimeout(() => setShowCopied(false), 2000);
      },
      (err) => {
        console.error("Failed to copy code:", err);
      },
    );
  };

  const handleTopicSelect = async (topic: TopicSchema) => {
    setSelectedConcept(topic);
    try {
      await dispatch(getTopicDetails(topic.topic_id.toString())).unwrap();
    } catch (error) {
      console.error('Failed to fetch topic details:', error);
    }
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

  return (
    <div className="read-page">
      <div className="flex h-[calc(100vh-64px)]">
        {/* Sidebar */}
        <div className="sidebar">
          <div className="progress-container">
            <h3 className="text-xs mb-2 tracking-widest">JAVASCRIPT BASICS</h3>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-secondary">
                {completedCount} of {topics?.length} completed
              </span>
              <span className="text-sm font-medium" style={{ color: 'var(--success)' }}>
                {Math.round(progress)}%
              </span>
            </div>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="p-6">
            <div className="space-y-1">
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
                      <div className="flex items-center space-x-3">
                        <div className="status-dot" />
                        <span className="sidebar-text">{topic.title}</span>
                      </div>
                      {isCompleted && (
                        <svg
                          className="w-4 h-4 status-completed"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="content-area">
          {loading ? (
            <AppLoader fullScreen text="Loading topic details..." />
          ) : selectedConcept ? (
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <h1 className="topic-title">{selectedConcept.title}</h1>
                <button
                  onClick={() => toggleTopicComplete(selectedConcept.topic_id)}
                  className={`complete-button ${
                    isTopicCompleted(selectedConcept.topic_id) ? 'completed' : 'pending'
                  }`}
                >
                  {isTopicCompleted(selectedConcept.topic_id) ? "Completed ✓" : "Mark as Complete"}
                </button>
              </div>

              <div className="space-y-8">
                <div
                  className="prose"
                  dangerouslySetInnerHTML={{
                    __html: selectedConcept.explanation || '',
                  }}
                />

                {selectedConcept.code_example && (
                  <div className={`code-container ${theme}-theme`}>
                    <div className="code-header">
                      <h3 className="example-heading">Example</h3>
                      <div className="copy-icon-wrapper">
                        <svg
                          className={`copy-icon ${showCopied ? 'copied' : ''}`}
                          onClick={() => copyToClipboard(selectedConcept.code_example)}
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                        </svg>
                        <span className={`copy-tooltip ${showCopied ? 'show' : ''}`}>
                          Copied!
                        </span>
                      </div>
                    </div>
                    <pre>
                      <code className="language-javascript">
                        {selectedConcept.code_example}
                      </code>
                    </pre>
                  </div>
                )}

                <div className="key-points">
                  <h3>Key Points</h3>
                  <ul>
                    {selectedConcept.key_points?.map((point, index) => (
                      <li key={index}>
                        <span className="key-point-bullet">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center">
              <h2 className="text-xl text-secondary">Select a concept to start learning</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Topics;

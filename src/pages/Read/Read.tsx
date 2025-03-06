import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import Prism from "prismjs";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import { LuCopy } from "react-icons/lu";
import { RiJavascriptLine } from "react-icons/ri";
import { FaCode } from "react-icons/fa";
import { TiTick } from "react-icons/ti";
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
  const [searchParams] = useSearchParams();

  const topics = useAppSelector(state => state.topicsData.topics);
  const progress = useMemo(() => calculateProgress(topics), [topics]);

  const [selectedConcept, setSelectedConcept] = useState<TopicSchema | null>(null);
  const [showCopied, setShowCopied] = useState(false);
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);

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
    } catch (error) {
      console.error('Failed to fetch topic details:', error);
    } finally {
      setIsLoadingDetails(false);
    }
  };

  useEffect(() => {
    if (user?.user_id) {
      dispatch(getAllTopics(user?.user_id));
    }
  }, [dispatch, user?.user_id]);

  useEffect(() => {
    if (selectedConcept?.code_example) {
      Prism.highlightAll();
    }
  }, [selectedConcept]);

  useEffect(() => {
    const conceptId = searchParams.get('conceptId');
    if (conceptId && topics.length > 0) {
      const topic = topics.find(t => t.topic_id.toString() === conceptId);
      if (topic) {
        handleTopicSelect(topic);
      }
    } else if (topics.length > 0 && !selectedConcept) {
      handleTopicSelect(topics[0]);
    }
  }, [searchParams, topics]);

  return (
    <div className="read-page">
      <div className="flex h-[calc(100vh-64px)]">
        {/* Sidebar */}
        <div className="sidebar">
          <div className="progress">
            <div className="flex items-center gap-2 mb-4">
              <RiJavascriptLine className="progress__title size-4" />
              <h3 className="progress__title text-xs tracking-widest">JAVASCRIPT BASICS</h3>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-secondary">
                {completedCount} of {topics?.length} completed
              </span>
              <span className="text-sm font-medium text-success">
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

          <div className="py-4">
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
                      <div className="flex items-center">
                        <div className="status-dot" />
                        <span className="sidebar-text">{topic.title}</span>
                      </div>
                      {isCompleted && <TiTick className="check-icon" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="content-area">
          {isLoadingDetails ? (
            <AppLoader fullScreen text="Loading topic details..." />
          ) : selectedConcept ? (
            <div className="content-wrapper">
              <div className="flex flex-col gap-2 mb-6">
                <div className="flex items-center justify-between gap-4">
                  <h1 className="font-bold text-3xl gradient-text truncate">{selectedConcept.title}</h1>
                  <button
                    onClick={() => toggleTopicComplete(selectedConcept.topic_id)}
                    className={`complete-button gradient-button font-medium text-sm whitespace-nowrap text-center ${
                      isTopicCompleted(selectedConcept.topic_id) ? 'completed' : 'pending'
                    }`}
                  >
                    <span className="flex items-center justify-center">
                      <TiTick className="size-5" /> {isTopicCompleted(selectedConcept.topic_id) ? 'Completed' : 'Mark as Complete'}
                    </span>
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                <div
                  className="prose"
                  dangerouslySetInnerHTML={{
                    __html: selectedConcept.explanation || '',
                  }}
                />

                {selectedConcept.code_example && (
                  <div className={`code-container my-7 w-full ${theme}-theme`}>
                    <div className="code-header">
                      <h3 className="flex items-center gap-2 text-accent-primary font-semibold text-lg">
                        <FaCode className="size-5" />
                        Example Code
                      </h3>
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
                        <span className={`copy-tooltip ${showCopied ? 'show' : ''}`}>
                          {showCopied ? 'Copied!' : 'Copy code'}
                        </span>
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

                <div className="key-points bg-card-bg p-6 hover:translate-y-[-1px] hover:shadow-lg transition-all duration-200">
                  <h3 className="text-accent-primary font-semibold text-lg mb-5 flex items-center gap-3">Key Points</h3>
                  <ul className="space-y-3">
                    {selectedConcept.key_points?.map((point, index) => (
                      <li key={index} className="flex items-start gap-3.5 py-3 border-b border-border-color last:border-0 last:pb-0 first:pt-0 text-text-secondary">
                        <span className="text-accent-primary text-xl leading-none opacity-80">•</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Topics;

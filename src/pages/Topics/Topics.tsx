import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useBackNavigation } from "../../utility/navigationUtils";
import "./Topics.scss";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/index';
import { updateTopicStatus } from '../../redux/slices/topicsDataMapSlice';
import { concepts } from '../../data/concepts';

interface Topic {
  id: number;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
}

const Topics: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { topics } = useSelector((state: RootState) => state.topicsData);
  const [localTopics, setLocalTopics] = useState<Topic[]>([]);

  useEffect(() => {
    const initialTopics = concepts.map(concept => ({
      id: concept.id,
      title: concept.title,
      description: concept.description,
      status: topics.find((t: { id: number }) => t.id === concept.id)?.status || 'pending'
    }));
    setLocalTopics(initialTopics);
  }, [topics]);

  const handleBack = useBackNavigation();

  const handleStatusChange = (topicId: number) => {
    const topic = localTopics.find(t => t.id === topicId);
    if (topic) {
      const nextStatus = {
        pending: "in-progress",
        "in-progress": "completed",
        completed: "pending",
      } as const;
      dispatch(updateTopicStatus({ 
        topicId,
        status: nextStatus[topic.status]
      }));
    }
  };

  const calculateProgress = () => {
    if (!localTopics.length) return 0;
    const completed = localTopics.filter(
      topic => topic.status === "completed"
    ).length;
    return Math.round((completed / localTopics.length) * 100);
  };

  const handleTopicClick = (topicId: number) => {
    navigate(`/concepts?conceptId=${topicId}`);
  };

  return (
    <div className="topics-container">
      <div className="topics-header">
        <button className="back-button" onClick={handleBack}>
          ← Back
        </button>
        <h1>JavaScript Topics</h1>
      </div>

      <div className="progress-section">
        <div className="progress-info">
          <span>Progress: {calculateProgress()} / {topics.length} completed</span>
          <span className="percentage">({Math.round((calculateProgress() / topics.length) * 100)}%)</span>
        </div>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${(calculateProgress() / topics.length) * 100}%` }} 
          />
        </div>
      </div>

      <div className="topics-list">
        {topics.map((topic: Topic) => (
          <div 
            key={topic.id}
            className={`topic-item ${topic.status}`}
            onClick={() => handleTopicClick(topic.id)}
          >
            <div className="topic-content">
              <h3 className="topic-title">{topic.title}</h3>
              <p className="topic-description">{topic.description}</p>
            </div>
            <div className="topic-status">
              {topic.status === 'completed' ? (
                <span className="status-badge completed">Completed</span>
              ) : (
                <span className="status-badge pending">In Progress</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Topics;

import React, { useState } from 'react';
import './Topics.scss';

interface Topic {
  id: number;
  title: string;
  link?: string;
  completed: boolean;
}

const Topics: React.FC = () => {
  const [topics, setTopics] = useState<Topic[]>([
    { id: 1, title: 'Variables and Data Types', link: 'https://example.com/variables', completed: false },
    { id: 2, title: 'Control Flow', link: 'https://example.com/control-flow', completed: false },
    { id: 3, title: 'Functions', completed: false },
    { id: 4, title: 'Objects and Arrays', link: 'https://example.com/objects', completed: false },
    { id: 5, title: 'Classes', completed: false },
  ]);

  const handleCheckboxChange = (topicId: number) => {
    setTopics(topics.map(topic => 
      topic.id === topicId ? { ...topic, completed: !topic.completed } : topic
    ));
  };

  const calculateProgress = () => {
    const completedCount = topics.filter(topic => topic.completed).length;
    return (completedCount / topics.length) * 100;
  };

  return (
    <div className="topics-container">
      <h1>Learning Topics</h1>
      
      <div className="progress-bar-container">
        <div 
          className="progress-bar" 
          style={{ width: `${calculateProgress()}%` }}
        />
        <span className="progress-text">
          {Math.round(calculateProgress())}% Complete
        </span>
      </div>

      <div className="topics-table">
        <div className="table-header">
          <div className="column">Status</div>
          <div className="column">Topic</div>
          <div className="column">Resource</div>
        </div>
        
        {topics.map(topic => (
          <div key={topic.id} className="table-row">
            <div className="column">
              <input
                type="checkbox"
                checked={topic.completed}
                onChange={() => handleCheckboxChange(topic.id)}
                className="fancy-checkbox"
              />
            </div>
            <div className="column">{topic.title}</div>
            <div className="column">
              {topic.link ? (
                <a href={topic.link} target="_blank" rel="noopener noreferrer" className="resource-link">
                  View Resource
                </a>
              ) : (
                <button className="contribute-button" onClick={() => window.open('https://github.com/yourusername/yourrepo', '_blank')}>
                  Contribute
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Topics;

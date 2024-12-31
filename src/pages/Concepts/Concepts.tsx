import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiInfo } from 'react-icons/fi';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import { Concept } from '../../types/concept';
import { concepts } from '../../data/concepts/index.ts';
import './Concepts.scss';

const Concepts: React.FC = () => {
  const navigate = useNavigate();
  const [selectedConcept, setSelectedConcept] = useState<Concept | null>(concepts[0]);
  const [showProgress, setShowProgress] = useState(() => {
    const saved = localStorage.getItem('showProgress');
    return saved ? JSON.parse(saved) : true;
  });
  const [completedConcepts, setCompletedConcepts] = useState<number[]>(() => {
    const saved = localStorage.getItem('completedConcepts');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('completedConcepts', JSON.stringify(completedConcepts));
  }, [completedConcepts]);

  useEffect(() => {
    localStorage.setItem('showProgress', JSON.stringify(showProgress));
  }, [showProgress]);

  const progress = (completedConcepts.length / concepts.length) * 100;

  const toggleConceptComplete = (conceptId: number) => {
    setCompletedConcepts(prev => {
      if (prev.includes(conceptId)) {
        return prev.filter(id => id !== conceptId);
      }
      return [...prev, conceptId];
    });
  };

  useEffect(() => {
    if (selectedConcept?.content.codeExample) {
      Prism.highlightAll();
    }
  }, [selectedConcept]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        console.log('Code copied to clipboard');
      },
      (err) => {
        console.error('Failed to copy code:', err);
      }
    );
  };

  return (
    <div className={`concepts-container ${showProgress ? 'show-progress' : ''}`}>
      <div className="page-header">
        <button 
          className="back-button"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>
        <div className="header-content">
          <motion.div
            className="info-icon"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowProgress(!showProgress)}
            title="Click to toggle progress"
          >
            <FiInfo />
          </motion.div>
          <motion.h2
            className="title"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="title-prefix">JS</span>&nbsp;&nbsp;Concepts
          </motion.h2>
        </div>
      </div>

      {showProgress && (
        <div className="progress-container">
          <div className="progress-header">
            <h3>Your Progress</h3>
            <span className="progress-text">
              {completedConcepts.length} of {concepts.length} completed ({Math.round(progress)}%)
            </span>
          </div>
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      <div className="concepts-layout">
        <div className="topics-list">
          {concepts.map(concept => (
            <motion.div
              key={concept.id}
              className={`topic-item ${selectedConcept?.id === concept.id ? 'active' : ''} ${
                completedConcepts.includes(concept.id) ? 'completed' : ''
              }`}
              onClick={() => setSelectedConcept(concept)}
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <span className="topic-title">{concept.title}</span>
              {completedConcepts.includes(concept.id) && (
                <motion.span 
                  className="completion-icon"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500 }}
                >
                  ✓
                </motion.span>
              )}
            </motion.div>
          ))}
        </div>

        <div className="concept-details">
          {selectedConcept ? (
            <>
              <div className="concept-header">
                <h1>{selectedConcept.title}</h1>
                <button
                  className={`mark-complete-btn ${
                    completedConcepts.includes(selectedConcept.id) ? 'completed' : ''
                  }`}
                  onClick={() => toggleConceptComplete(selectedConcept.id)}
                >
                  {completedConcepts.includes(selectedConcept.id) 
                    ? 'Completed ✓' 
                    : 'Mark as Complete'}
                </button>
              </div>
              <div className="content">
                <div 
                  className="explanation"
                  dangerouslySetInnerHTML={{ __html: selectedConcept.content.explanation }}
                />
                
                {selectedConcept.content.codeExample && (
                  <div className="code-example">
                    <h3>Example:</h3>
                    <button 
                      className="copy-button"
                      onClick={() => copyToClipboard(selectedConcept.content.codeExample)}
                    >
                      Copy
                    </button>
                    <pre className="language-javascript">
                      <code>{selectedConcept.content.codeExample}</code>
                    </pre>
                  </div>
                )}

                <div className="key-points">
                  <h3>Key Points:</h3>
                  <ul>
                    {selectedConcept.content.keyPoints.map((point, index) => (
                      <li key={index}>{point}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </>
          ) : (
            <div className="no-selection">
              <h2>Select a concept to start learning</h2>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Concepts;
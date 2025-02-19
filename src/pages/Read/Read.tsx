import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import { Concept } from "../../types/concept.ts";
import { listOfConcepts } from "../../data/concepts/index.ts";
import "./Read.scss";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/index.ts';
import { updateTopicStatus } from '../../redux/slices/topicsDataMapSlice';

const Concepts: React.FC = () => {
  const location = useLocation()

  const queryParams = new URLSearchParams(location.search)
  const conceptId = Number(queryParams.get('conceptId'))
  const [selectedConcept, setSelectedConcept] = useState<Concept>(() => {
    if (conceptId) {
      const concept = listOfConcepts.find(c => c.id === conceptId);
      return concept || listOfConcepts[0];
    }
    return listOfConcepts[0];
  });
  const [showProgress, setShowProgress] = useState(() => {
    const saved = localStorage.getItem("showProgress");
    return saved ? JSON.parse(saved) : true;
  });
  const [showCopied, setShowCopied] = useState(false);

  const dispatch = useDispatch();
  const { topics } = useSelector((state: RootState) => state.topicsData);

  // Helper function to check if a concept is completed
  const isConceptCompleted = (conceptId: number) => {
    const topic = topics.find((t: { id: number }) => t.id === conceptId);
    return topic?.status === 'completed';
  };

  // Calculate progress based on Redux state
  const completedCount = topics.filter((t: { status: string }) => t.status === 'completed').length;
  const progress = (completedCount / listOfConcepts.length) * 100;

  useEffect(() => {
    if (conceptId) {
      const concept = listOfConcepts.find(c => c.id === conceptId);
      if (concept) {
        setSelectedConcept(concept);
      }
    }
  }, [conceptId]);

  useEffect(() => {
    localStorage.setItem("showProgress", JSON.stringify(showProgress));
  }, [showProgress]);

  const toggleConceptComplete = (conceptId: number) => {
    const topic = topics.find((t: { id: number }) => t.id === conceptId);
    const newStatus = topic?.status === 'completed' ? 'pending' : 'completed';
    dispatch(updateTopicStatus({
      topicId: conceptId,
      status: newStatus
    }));
  };

  useEffect(() => {
    if (selectedConcept?.content.codeExample) {
      Prism.highlightAll();
    }
  }, [selectedConcept]);

  const copyToClipboard = (text: string | undefined) => {
    if (!text) return;
    navigator.clipboard.writeText(text).then(
      () => {
        setShowCopied(true);
        setTimeout(() => setShowCopied(false), 2000); // Hide after 2 seconds
      },
      (err) => {
        console.error("Failed to copy code:", err);
      },
    );
  };

  return (
    <div className={`concepts-container ${showProgress ? "show-progress" : ""}`}>
      <div className="concepts-layout">
        <div className="topics-list">
          <div className="progress-container">
            <div className="progress-header">
              Progress: {completedCount} / {listOfConcepts.length} completed
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${progress}%` }} />
            </div>
          </div>
          <div className="topics-scroll-container">
            {listOfConcepts.map((concept: Concept) => (
              <motion.div
                key={concept.id}
                className={`topic-item ${selectedConcept?.id === concept.id ? "active" : ""} ${isConceptCompleted(concept.id) ? "completed" : ""
                  }`}
                onClick={() => setSelectedConcept(concept)}
                whileHover={{ x: 4 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <span className="topic-title">{concept.title}</span>
                {isConceptCompleted(concept.id) && (
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
        </div>

        <div className="concept-details">
          {selectedConcept ? (
            <>
              <div className="concept-header">
                <h1>{selectedConcept.title}</h1>
                <button
                  className={`mark-complete-btn ${isConceptCompleted(selectedConcept.id)
                    ? "completed"
                    : ""
                    }`}
                  onClick={() => toggleConceptComplete(selectedConcept.id)}
                >
                  {isConceptCompleted(selectedConcept.id)
                    ? "Completed"
                    : "Mark as Complete"}
                </button>
              </div>
              <div className="content">
                {selectedConcept?.content ? (
                  <>
                    <div
                      className="explanation"
                      dangerouslySetInnerHTML={{
                        __html: selectedConcept.content.explanation || '',
                      }}
                    />

                    {selectedConcept.content.codeExample && (
                      <div className="code-example">
                        <h3>Example:</h3>
                        <button
                          className={`copy-button ${showCopied ? 'copied' : ''}`}
                          onClick={() => copyToClipboard(selectedConcept.content.codeExample)}
                        >
                          {showCopied ? 'Copied!' : 'Copy'}
                        </button>
                        <pre className="language-javascript">
                          <code>{selectedConcept.content.codeExample}</code>
                        </pre>
                      </div>
                    )}

                    <div className="key-points">
                      <h3>Key Points:</h3>
                      <ul>
                        {selectedConcept.content.keyPoints?.map((point, index) => (
                          <li key={index}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  </>
                ) : (
                  <div>Loading content...</div>
                )}
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

import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";
import "prismjs/components/prism-javascript";
import "prismjs/components/prism-typescript";
import { Concept } from "../../utils/types/concept";
import { listOfConcepts } from "../../data/concepts/index";
import "./Read.scss";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/index';
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

  const isConceptCompleted = (conceptId: number) => {
    const topic = topics.find((t: { id: number }) => t.id === conceptId);
    return topic?.status === 'completed';
  };

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
        setTimeout(() => setShowCopied(false), 2000);
      },
      (err) => {
        console.error("Failed to copy code:", err);
      },
    );
  };

  return (
    <div className="read-page min-h-screen">
      <div className="mx-auto border border-theme overflow-hidden">
        <div className="flex flex-col md:flex-row h-[calc(100vh-64px)]">
          <div className="w-full md:w-80 border-r border-theme flex flex-col">
            <div className="p-6 border-b border-theme">
              <h3 className="text-sm font-medium text-secondary uppercase tracking-wider mb-3">
                Learning Progress
              </h3>
              <div className="mb-3 flex justify-between items-center">
                <span className="text-sm text-secondary">
                  {completedCount} of {listOfConcepts.length} completed
                </span>
                <span className="text-sm font-medium" style={{ color: 'var(--primary-color)' }}>
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

            <div className="flex-1 overflow-y-auto">
              <div className="p-6">
                <h3 className="text-sm font-medium text-secondary uppercase tracking-wider mb-4">
                  Concepts
                </h3>
                <div className="space-y-2">
                  {listOfConcepts.map((concept: Concept) => (
                    <div
                      key={concept.id}
                      className={`sidebar-item group relative px-4 py-3 rounded-lg cursor-pointer
                        ${selectedConcept?.id === concept.id ? "active" : ""}
                        ${isConceptCompleted(concept.id) ? "completed" : ""}`}
                      onClick={() => setSelectedConcept(concept)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`status-dot ${isConceptCompleted(concept.id)
                            ? "completed"
                            : selectedConcept?.id === concept.id
                              ? "active"
                              : "default"}`}
                          />
                          <span className={`sidebar-text ${selectedConcept?.id === concept.id
                            ? "active"
                            : "default"}`}>
                            {concept.title}
                          </span>
                        </div>
                        {isConceptCompleted(concept.id) && (
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
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto">
            {selectedConcept ? (
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h1 className="text-2xl font-bold gradient-text">
                    {selectedConcept.title}
                  </h1>
                  <button
                    onClick={() => toggleConceptComplete(selectedConcept.id)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all
                      ${isConceptCompleted(selectedConcept.id)
                        ? "button-completed"
                        : "button-pending"}`}
                  >
                    {isConceptCompleted(selectedConcept.id) ? "Completed ✓" : "Mark as Complete"}
                  </button>
                </div>

                {selectedConcept?.content ? (
                  <div className="space-y-6">
                    <div
                      className="prose max-w-none"
                      dangerouslySetInnerHTML={{
                        __html: selectedConcept.content.explanation || '',
                      }}
                    />

                    {selectedConcept.content.codeExample && (
                      <div className="relative mt-4 code-container rounded-lg p-4">
                        <h3 className="text-lg font-semibold example-heading mb-2">Example:</h3>
                        <button
                          className={`absolute top-4 right-4 px-3 py-1 rounded text-sm copy-button
                            ${showCopied ? "copied" : ""}`}
                          onClick={() => copyToClipboard(selectedConcept.content.codeExample)}
                        >
                          {showCopied ? 'Copied!' : 'Copy'}
                        </button>
                        <pre className="language-javascript rounded-lg">
                          <code>{selectedConcept.content.codeExample}</code>
                        </pre>
                      </div>
                    )}

                    <div className="key-points rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-primary mb-4">Key Points:</h3>
                      <ul className="space-y-2">
                        {selectedConcept.content.keyPoints?.map((point, index) => (
                          <li key={index} className="flex items-start">
                            <span className="key-point-bullet mr-2">•</span>
                            <span className="text-primary">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="text-secondary">Loading content...</div>
                )}
              </div>
            ) : (
              <div className="h-full flex items-center justify-center">
                <h2 className="text-xl text-secondary">Select a concept to start learning</h2>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Concepts;

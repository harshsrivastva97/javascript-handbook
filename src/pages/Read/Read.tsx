import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";
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
    <div className="min-h-screen bg-gray-900">
      <div className="mx-auto bg-gray-800 border border-purple-500/20 overflow-hidden">
        <div className="flex flex-col md:flex-row h-[calc(100vh-64px)]">
          {/* Left Sidebar */}
          <div className="w-full md:w-80 bg-gray-800/50 border-r border-purple-500/20 flex flex-col">
            {/* Progress Section */}
            <div className="p-6 border-b border-purple-500/20 bg-gray-800/80">
              <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-3">
                Learning Progress
              </h3>
              <div className="mb-3 flex justify-between items-center">
                <span className="text-sm text-gray-400">
                  {completedCount} of {listOfConcepts.length} completed
                </span>
                <span className="text-sm font-medium text-purple-400">
                  {Math.round(progress)}%
                </span>
              </div>
              <div className="h-1.5 bg-gray-700/50 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-purple-700 transition-all duration-300 ease-in-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Concepts List */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-6">
                <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">
                  Concepts
                </h3>
                <div className="space-y-2">
                  {listOfConcepts.map((concept: Concept) => (
                    <motion.div
                      key={concept.id}
                      className={`group relative px-4 py-3 rounded-lg cursor-pointer transition-all
                        ${selectedConcept?.id === concept.id
                          ? "bg-purple-500/20 border border-purple-500/30"
                          : "hover:bg-gray-700/50"}
                        ${isConceptCompleted(concept.id)
                          ? "border border-purple-500/10"
                          : "border border-transparent"}`}
                      onClick={() => setSelectedConcept(concept)}
                      whileHover={{ x: 4 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-2 h-2 rounded-full transition-colors
                            ${isConceptCompleted(concept.id)
                              ? "bg-green-500"
                              : selectedConcept?.id === concept.id
                                ? "bg-purple-500"
                                : "bg-gray-600"}`}
                          />
                          <span className={`text-sm font-medium transition-colors
                            ${selectedConcept?.id === concept.id
                              ? "text-purple-400"
                              : "text-gray-300 group-hover:text-purple-400"}`}>
                            {concept.title}
                          </span>
                        </div>
                        {isConceptCompleted(concept.id) && (
                          <motion.svg
                            className="w-4 h-4 text-green-500"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </motion.svg>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-y-auto bg-gray-800">
            {selectedConcept ? (
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
                    {selectedConcept.title}
                  </h1>
                  <button
                    onClick={() => toggleConceptComplete(selectedConcept.id)}
                    className={`px-4 py-2 rounded-lg font-medium transition-all
                      ${isConceptCompleted(selectedConcept.id)
                        ? "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                        : "bg-purple-500/20 text-purple-400 hover:bg-purple-500/30"}`}
                  >
                    {isConceptCompleted(selectedConcept.id) ? "Completed ✓" : "Mark as Complete"}
                  </button>
                </div>

                {selectedConcept?.content ? (
                  <div className="space-y-6">
                    <div
                      className="prose prose-invert max-w-none"
                      dangerouslySetInnerHTML={{
                        __html: selectedConcept.content.explanation || '',
                      }}
                    />

                    {selectedConcept.content.codeExample && (
                      <div className="relative mt-4 bg-gray-900 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-gray-300 mb-2">Example:</h3>
                        <button
                          className={`absolute top-4 right-4 px-3 py-1 rounded text-sm
                            ${showCopied
                              ? "bg-green-500/20 text-green-400"
                              : "bg-gray-700 text-gray-400 hover:bg-gray-600"}`}
                          onClick={() => copyToClipboard(selectedConcept.content.codeExample)}
                        >
                          {showCopied ? 'Copied!' : 'Copy'}
                        </button>
                        <pre className="language-javascript rounded-lg">
                          <code>{selectedConcept.content.codeExample}</code>
                        </pre>
                      </div>
                    )}

                    <div className="bg-gray-900/50 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-gray-300 mb-4">Key Points:</h3>
                      <ul className="space-y-2">
                        {selectedConcept.content.keyPoints?.map((point, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-purple-500 mr-2">•</span>
                            <span className="text-gray-300">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ) : (
                  <div className="text-gray-400">Loading content...</div>
                )}
              </div>
            ) : (
              <div className="h-full flex items-center justify-center">
                <h2 className="text-xl text-gray-400">Select a concept to start learning</h2>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Concepts;

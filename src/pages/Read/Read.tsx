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
        <div className="flex flex-col md:flex-row h-[calc(100vh-72px)]">
          {/* Left Sidebar */}
          <div className="w-full md:w-80 bg-gray-800 border-r border-purple-500/20">
            <div className="p-4 border-b border-purple-500/20">
              <div className="mb-2 text-gray-400">
                Progress: {completedCount} / {listOfConcepts.length} completed
              </div>
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            <div className="overflow-y-auto h-full p-2">
              {listOfConcepts.map((concept: Concept) => (
                <motion.div
                  key={concept.id}
                  className={`p-3 rounded-lg cursor-pointer mb-2 transition-all
                    ${selectedConcept?.id === concept.id
                      ? "bg-purple-500/20 border border-purple-500/30"
                      : "hover:bg-gray-700"}
                    ${isConceptCompleted(concept.id) ? "border border-green-500/30" : ""}`}
                  onClick={() => setSelectedConcept(concept)}
                  whileHover={{ x: 4 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">{concept.title}</span>
                    {isConceptCompleted(concept.id) && (
                      <motion.span
                        className="text-green-500"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                      >
                        ✓
                      </motion.span>
                    )}
                  </div>
                </motion.div>
              ))}
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

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import "./Topics.scss";

interface Topic {
  id: number;
  title: string;
  status: "completed" | "in-progress" | "pending";
}

const Topics: React.FC = () => {
  const navigate = useNavigate();

  const [topics, setTopics] = useState<Topic[]>([
    {
      id: 1,
      title: "JavaScript Basics (Data types, JS engine)",
      status: "pending",
    },
    { id: 2, title: "Variables (var, let, const)", status: "pending" },
    {
      id: 3,
      title: "Functions (Arrow functions & regular)",
      status: "pending",
    },
    {
      id: 4,
      title: "Objects (Properties, methods, destructuring)",
      status: "pending",
    },
    {
      id: 5,
      title: "Arrays (Methods, iteration, destructuring)",
      status: "pending",
    },
    { id: 6, title: "References vs. Values", status: "pending" },
    { id: 7, title: "Hoisting (Variables, functions)", status: "pending" },
    {
      id: 8,
      title: "Closures (Variable scope, lexical environment)",
      status: "pending",
    },
    {
      id: 9,
      title: "Storage (Session, Local storage & Cookies)",
      status: "pending",
    },
    { id: 10, title: "This keyword (Binding and context)", status: "pending" },
    {
      id: 11,
      title: "Function Methods (Apply, Call, Bind)",
      status: "pending",
    },
    {
      id: 12,
      title: "Debounce & Throttling (Performance optimization)",
      status: "pending",
    },
    {
      id: 13,
      title: "Mixins, Higher-Order Functions (HOF)",
      status: "pending",
    },
    {
      id: 14,
      title: "Asynchronous JS (Callbacks, Promise, async/await)",
      status: "pending",
    },
    { id: 15, title: "Event Loop (Microtasks, Macrotasks)", status: "pending" },
    {
      id: 16,
      title: "Global Execution Context & Call Stack",
      status: "pending",
    },
    {
      id: 17,
      title: "Type Coercion (Equality checks, implicit/explicit conversion)",
      status: "pending",
    },
    {
      id: 18,
      title: "Operators (Spread, Rest, Nullish Coalescing, Optional Chaining)",
      status: "pending",
    },
    {
      id: 19,
      title: "Timers (setTimeout, setInterval, clearInterval)",
      status: "pending",
    },
    {
      id: 20,
      title: "Making API Calls (Fetch, Axios, async patterns)",
      status: "pending",
    },
    {
      id: 21,
      title: "Async & Defer (Script loading strategies)",
      status: "pending",
    },
    {
      id: 22,
      title: "Modules (ES6 modules, CommonJS, AMD)",
      status: "pending",
    },
    {
      id: 23,
      title: "Advanced Patterns (Currying, Generators)",
      status: "pending",
    },
    {
      id: 24,
      title: "Classes (Syntax, inheritance, private fields)",
      status: "pending",
    },
    {
      id: 25,
      title: "Event Handling (Bubbling, Capturing, Delegation)",
      status: "pending",
    },
    {
      id: 26,
      title: "File Handling (Blob, FileReader, WebSockets)",
      status: "pending",
    },
    {
      id: 27,
      title: "Error Handling (try-catch, custom errors)",
      status: "pending",
    },
    {
      id: 28,
      title: "Memory Management (Garbage collection)",
      status: "pending",
    },
    { id: 29, title: "Performance Optimization Techniques", status: "pending" },
    { id: 30, title: "Security (CORS, CSRF, XSS)", status: "pending" },
  ]);

  const [newTopic, setNewTopic] = useState("");
  const [isAdding, setIsAdding] = useState(false);

  const handleStatusChange = (topicId: number) => {
    setTopics(
      topics.map((topic) => {
        if (topic.id === topicId) {
          // Cycle through states: pending -> in-progress -> completed -> pending
          const nextStatus = {
            pending: "in-progress",
            "in-progress": "completed",
            completed: "pending",
          } as const;
          return { ...topic, status: nextStatus[topic.status] };
        }
        return topic;
      }),
    );
  };

  const handleAddTopic = (e: React.FormEvent) => {
    e.preventDefault();
    if (newTopic.trim()) {
      const newId =
        topics.length > 0 ? Math.max(...topics.map((t) => t.id)) + 1 : 1;
      setTopics((prevTopics) => [
        ...prevTopics,
        {
          id: newId,
          title: newTopic.trim(),
          status: "pending" as const,
        },
      ]);
      setNewTopic("");
      setIsAdding(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      setIsAdding(false);
      setNewTopic("");
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return "✓";
      case "in-progress":
        return "⋯";
      default:
        return "○";
    }
  };

  const calculateProgress = () => {
    const completed = topics.filter(
      (topic) => topic.status === "completed",
    ).length;
    return Math.round((completed / topics.length) * 100);
  };

  return (
    <div className="max-w-3xl mx-auto p-8 h-screen flex flex-col text-gray-700">
      <div className="topics-header">
        <button
          className="absolute left-0 bg-transparent border-none text-gray-600 text-base p-2 rounded hover:bg-gray-100 hover:text-gray-800 transition-all"
          onClick={() => navigate(-1)}
        >
          ← Back
        </button>
        <h1 className="text-2xl font-semibold flex-1 text-center">
          JavaScript Interview Topics
        </h1>
      </div>

      <div className="bg-gray-100 rounded-lg h-2 mb-8 relative overflow-hidden">
        <div
          className="h-full bg-blue-500 transition-all duration-300"
          style={{ width: `${calculateProgress()}%` }}
        />
        <span className="absolute right-0 -top-6 text-sm text-gray-500">
          {calculateProgress()}% Complete
        </span>
      </div>

      <div className="flex-1 min-h-0 relative bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="absolute inset-0 overflow-y-auto overflow-x-hidden scrollbar">
          {topics.map((topic) => (
            <div
              key={topic.id}
              className={`flex items-center p-3 border-b border-gray-100 cursor-pointer transition-all hover:bg-gray-50 hover:translate-x-1 w-full box-border
                ${
                  topic.status === "completed"
                    ? "text-green-500"
                    : topic.status === "in-progress"
                      ? "text-yellow-500"
                      : "text-gray-400"
                }`}
              onClick={() => handleStatusChange(topic.id)}
            >
              <div className="flex-shrink-0 w-6 text-lg flex items-center justify-center transition-transform hover:scale-110">
                {getStatusIcon(topic.status)}
              </div>
              <div className="ml-3 text-base text-gray-700 flex-1 min-w-0 overflow-hidden text-ellipsis break-words">
                {topic.title}
              </div>
            </div>
          ))}

          <AnimatePresence mode="wait">
            {isAdding ? (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <form className="add-topic-form" onSubmit={handleAddTopic}>
                  <input
                    type="text"
                    value={newTopic}
                    onChange={(e) => setNewTopic(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Enter new topic..."
                    className="w-full p-2 border border-gray-200 rounded text-base mb-2 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    autoFocus
                  />
                  <div className="flex gap-2">
                    <button
                      type="submit"
                      onClick={handleAddTopic}
                      disabled={!newTopic.trim()}
                      className="px-4 py-1.5 rounded text-sm bg-blue-500 text-white transition-colors hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                      Add
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setIsAdding(false);
                        setNewTopic("");
                      }}
                      className="px-4 py-1.5 rounded text-sm border border-gray-200 text-gray-600 transition-all hover:bg-gray-50 hover:border-gray-300"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </motion.div>
            ) : (
              <motion.div
                className="add-topic-button flex items-center justify-center p-2 text-gray-300 cursor-pointer transition-all text-2xl h-10 mt-auto border-t border-gray-100 hover:text-blue-500"
                onClick={() => setIsAdding(true)}
                title="Add New Topic"
                initial={{ height: 40 }}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Topics;

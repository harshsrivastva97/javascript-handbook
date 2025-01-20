import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaClock, FaStar, FaCode, FaPlay, FaLightbulb } from "react-icons/fa";
import "./Exercises.scss";

interface Exercise {
  id: number;
  title: string;
  description: string;
  difficulty: "Easy" | "Medium" | "Hard";
  status: "completed" | "in-progress" | "pending";
  requirements: string[];
  timeEstimate: string;
  skills: string[];
  example?: {
    input?: string;
    output?: string;
    animation?: React.ReactNode;
  };
  hints?: string[];
}

const Exercises: React.FC = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [showHint, setShowHint] = useState<{ [key: number]: number }>({});
  const [exercises, setExercises] = useState<Exercise[]>([
    {
      id: 1,
      title: "Todo List Application",
      description: "Create a simple todo list application with basic CRUD operations. This exercise will help you understand state management and local storage in React.",
      difficulty: "Easy",
      status: "pending",
      timeEstimate: "2-3 hours",
      skills: ["React", "localStorage", "State Management", "DOM Events"],
      requirements: [
        "Add new todos with a input field and submit button",
        "Mark todos as complete with a checkbox",
        "Delete todos with a delete button",
        "Store todos in localStorage to persist data",
        "Filter todos by status (All/Active/Completed)",
      ],
      example: {
        input: `addTodo("Learn React")
toggleTodo(1)
deleteTodo(1)`,
        output: `// After adding
[{ id: 1, text: "Learn React", completed: false }]

// After toggle
[{ id: 1, text: "Learn React", completed: true }]

// After delete
[]`,
      },
      hints: [
        "Start by creating a Todo interface with id, text, and completed properties",
        "Use useState to manage your todos array",
        "Remember to use useEffect for localStorage synchronization",
        "Consider using filter() for showing different todo states",
      ],
    },
    {
      id: 2,
      title: "Infinite Scroll Implementation",
      description: "Implement infinite scrolling functionality using Intersection Observer API. Learn about modern browser APIs and optimize performance for large datasets.",
      difficulty: "Medium",
      status: "pending",
      timeEstimate: "3-4 hours",
      skills: ["JavaScript", "Intersection Observer", "DOM", "Performance"],
      requirements: [
        "Use Intersection Observer API",
        "Load items in batches of 10",
        "Show loading indicator",
        "Handle errors gracefully",
      ],
      example: {
        input: `const observer = new IntersectionObserver(callback)
observer.observe(targetElement)`,
        output: `// When target element is visible
loadNextBatch()
showLoadingSpinner()
// After loading
hideLoadingSpinner()
appendNewItems()`
      },
      hints: [
        "Research the IntersectionObserver API documentation",
        "Consider using a throttle function for performance",
        "Implement error boundaries for error handling",
      ],
    },
    {
      id: 3,
      title: "Custom Event Emitter",
      description: "Build a custom event emitter class that allows subscription to events and emitting events with data. Master the observer pattern and event-driven programming.",
      difficulty: "Medium",
      status: "pending",
      timeEstimate: "4-5 hours",
      skills: ["JavaScript", "Design Patterns", "Event Handling", "OOP"],
      requirements: [
        "Implement on() method for subscribing to events",
        "Implement emit() method for triggering events",
        "Support multiple subscribers for the same event",
        "Allow passing data when emitting events",
        "Implement off() method to remove subscribers",
      ],
      example: {
        input: `const emitter = new EventEmitter()
emitter.on('userLogin', (user) => console.log(user))
emitter.emit('userLogin', { id: 1, name: 'John' })`,
        output: `// Console output:
{ id: 1, name: 'John' }`
      },
      hints: [
        "Use a Map to store event listeners",
        "Consider memory management when removing listeners",
        "Implement method chaining for better API",
      ],
    },
    {
      id: 4,
      title: "Debounce Function Implementation",
      description: "Create a debounce utility function that limits the rate at which a function can fire. Perfect for handling frequent events like window resize or search input.",
      difficulty: "Hard",
      status: "pending",
      timeEstimate: "3-4 hours",
      skills: ["JavaScript", "Closures", "Timing Functions", "Function Decorators"],
      requirements: [
        "Implement debounce function with setTimeout",
        "Support immediate execution option",
        "Handle this context correctly",
        "Support cancellation of delayed execution",
        "Preserve and pass original function arguments",
      ],
      example: {
        input: `const debouncedSearch = debounce(search, 300)
input.addEventListener('input', debouncedSearch)`,
        output: `// Only executes search after 300ms of no input
// Multiple rapid inputs only trigger one search`
      },
      hints: [
        "Use closures to maintain state between calls",
        "Remember to clear previous timeouts",
        "Consider using Function.prototype.apply for context",
      ],
    },
    {
      id: 5,
      title: "DOM Element Builder",
      description: "Create a fluent API for building and manipulating DOM elements programmatically. Learn about method chaining and DOM manipulation patterns.",
      difficulty: "Medium",
      status: "pending",
      timeEstimate: "4-5 hours",
      skills: ["JavaScript", "DOM API", "Fluent Interface", "Design Patterns"],
      requirements: [
        "Create chainable methods for setting attributes",
        "Support adding child elements",
        "Add methods for setting styles",
        "Support event listener attachment",
        "Implement method for inserting element into DOM",
        "Allow removal of element from DOM",
      ],
      example: {
        input: `element('div')
  .addClass('container')
  .setStyle('background', 'blue')
  .addChild('p')
    .setText('Hello')
    .addClass('greeting')
  .appendTo(document.body)`,
        output: `// Creates and appends:
<div class="container" style="background: blue">
  <p class="greeting">Hello</p>
</div>`
      },
      hints: [
        "Return this from chainable methods",
        "Keep track of current element in focus",
        "Implement a way to traverse up the tree",
      ],
    },
  ]);

  const handleStatusChange = (exerciseId: number) => {
    setExercises(
      exercises.map((exercise) => {
        if (exercise.id === exerciseId) {
          const nextStatus = {
            pending: "in-progress",
            "in-progress": "completed",
            completed: "pending",
          } as const;
          return { ...exercise, status: nextStatus[exercise.status] };
        }
        return exercise;
      }),
    );
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return "✓";
      case "in-progress":
        return "↻";
      default:
        return "○";
    }
  };

  const getDifficultyDetails = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return {
          color: "text-green-500",
          stars: 1,
          text: "Perfect for beginners",
        };
      case "Medium":
        return {
          color: "text-yellow-500",
          stars: 2,
          text: "Some programming experience needed",
        };
      case "Hard":
        return {
          color: "text-red-500",
          stars: 3,
          text: "Advanced concepts involved",
        };
      default:
        return { color: "", stars: 0, text: "" };
    }
  };

  const showNextHint = (exerciseId: number) => {
    setShowHint(prev => ({
      ...prev,
      [exerciseId]: (prev[exerciseId] || 0) + 1
    }));
  };

  const calculateProgress = () => {
    const completed = exercises.filter(
      (exercise) => exercise.status === "completed",
    ).length;
    return Math.round((completed / exercises.length) * 100);
  };

  return (
    <div className="exercises-container">
      <div className="progress-section">
        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${calculateProgress()}%` }}
          />
        </div>
        <div className="progress-text">
          {calculateProgress()}% Complete
        </div>
      </div>

      <div className="exercises-list">
        {exercises.map((exercise) => (
          <div key={exercise.id} className="exercise-item">
            <div className="exercise-header">
              <div
                className={`status-icon ${exercise.status}`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleStatusChange(exercise.id);
                }}
              >
                {getStatusIcon(exercise.status)}
              </div>
              <div
                className="exercise-info"
                onClick={() =>
                  setExpandedId(expandedId === exercise.id ? null : exercise.id)
                }
              >
                <div className="title-section">
                  <span className="title">{exercise.title}</span>
                  <div className="exercise-meta">
                    <span className="time-estimate">
                      <FaClock /> {exercise.timeEstimate}
                    </span>
                    <div className="difficulty-indicator">
                      {[...Array(getDifficultyDetails(exercise.difficulty).stars)].map((_, i) => (
                        <FaStar key={i} />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="skills-tags">
                  {exercise.skills.map((skill, index) => (
                    <span key={index} className="skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <AnimatePresence>
              {expandedId === exercise.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="exercise-details"
                >
                  <p className="description">{exercise.description}</p>

                  <div className="requirements-section">
                    <h4>Requirements</h4>
                    <ul className="requirements-list">
                      {exercise.requirements.map((req, index) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>
                  </div>

                  {exercise.example && (
                    <div className="example-section">
                      <h4>Example</h4>
                      <div className="code-preview">
                        <div className="input">
                          <h5>Input:</h5>
                          <pre>{exercise.example.input}</pre>
                        </div>
                        <div className="output">
                          <h5>Expected Output:</h5>
                          <pre>{exercise.example.output}</pre>
                        </div>
                        {exercise.example.animation && (
                          <div className="animation-preview">
                            {exercise.example.animation}
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {exercise.hints && (
                    <div className="hints-section">
                      <button
                        className="hint-button"
                        onClick={() => showNextHint(exercise.id)}
                      >
                        <FaLightbulb /> Need a hint?
                      </button>
                      {showHint[exercise.id] && (
                        <div className="hint-content">
                          {exercise.hints
                            .slice(0, showHint[exercise.id])
                            .map((hint, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="hint-item"
                              >
                                {hint}
                              </motion.div>
                            ))}
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Exercises;

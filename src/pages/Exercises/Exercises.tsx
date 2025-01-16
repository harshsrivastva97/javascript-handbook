import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Exercises.scss";

interface Exercise {
  id: number;
  title: string;
  description: string;
  difficulty: "Easy" | "Medium" | "Hard";
  status: "completed" | "in-progress" | "pending";
  requirements?: string[];
}

const Exercises: React.FC = () => {
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const [exercises, setExercises] = useState<Exercise[]>([
    {
      id: 1,
      title: "Todo List Application",
      description:
        "Create a simple todo list application with basic CRUD operations.",
      difficulty: "Easy",
      status: "pending",
      requirements: [
        "Add new todos",
        "Mark todos as complete",
        "Delete todos",
        "Store todos in localStorage",
        "Filter todos by status",
      ],
    },
    {
      id: 2,
      title: "Infinite Scroll Implementation",
      description:
        "Implement infinite scrolling functionality using Intersection Observer API.",
      difficulty: "Medium",
      status: "pending",
      requirements: [
        "Use Intersection Observer API",
        "Load items in batches of 10",
        "Show loading indicator",
        "Handle errors gracefully",
      ],
    },
    {
      id: 3,
      title: "Custom Event Emitter",
      description:
        "Build a custom event emitter class that allows subscription to events and emitting events with data.",
      difficulty: "Medium",
      status: "pending",
      requirements: [
        "Implement on() method for subscribing to events",
        "Implement emit() method for triggering events",
        "Support multiple subscribers for the same event",
        "Allow passing data when emitting events",
        "Implement off() method to remove subscribers",
      ],
    },
    {
      id: 4,
      title: "Debounce Function Implementation",
      description:
        "Create a debounce utility function that limits the rate at which a function can fire.",
      difficulty: "Hard",
      status: "pending",
      requirements: [
        "Implement debounce function with setTimeout",
        "Support immediate execution option",
        "Handle this context correctly",
        "Support cancellation of delayed execution",
        "Preserve and pass original function arguments",
      ],
    },
    {
      id: 5,
      title: "DOM Element Builder",
      description:
        "Create a fluent API for building and manipulating DOM elements programmatically.",
      difficulty: "Medium",
      status: "pending",
      requirements: [
        "Create chainable methods for setting attributes",
        "Support adding child elements",
        "Add methods for setting styles",
        "Support event listener attachment",
        "Implement method for inserting element into DOM",
        "Allow removal of element from DOM",
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

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "text-green-500";
      case "Medium":
        return "text-yellow-500";
      case "Hard":
        return "text-red-500";
      default:
        return "";
    }
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
                <span className="title">{exercise.title}</span>
                <span className={`difficulty ${exercise.difficulty}`}>
                  {exercise.difficulty}
                </span>
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
                  {exercise.requirements && (
                    <div className="requirements-list">
                      <h4>Requirements</h4>
                      <ul>
                        {exercise.requirements.map((req, index) => (
                          <li key={index}>{req}</li>
                        ))}
                      </ul>
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

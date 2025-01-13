import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useBackNavigation } from "../../utility/navigationUtils.ts";
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
  const navigate = useNavigate();
  const location = useLocation()

  const handleBack = useBackNavigation()

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
        return "⋯";
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
    <div className="max-w-3xl mx-auto p-8 h-screen flex flex-col text-gray-700">
      <div className="exercises-header">
        <button
          className="absolute left-0 bg-transparent border-none text-gray-600 text-base p-2 rounded hover:bg-gray-100 hover:text-gray-800 transition-all"
          onClick={handleBack}
        >
          ← Back
        </button>
        <motion.h1
          className="text-2xl font-light flex-1 text-center cursor-pointer"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <span className="text-blue-500 font-bold">JS</span> Exercises
        </motion.h1>
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
          {exercises.map((exercise) => (
            <div key={exercise.id} className="border-b border-gray-100">
              <div
                className={`flex items-center p-3 cursor-pointer transition-all hover:bg-gray-50 w-full box-border
                  ${exercise.status === "completed"
                    ? "text-green-500"
                    : exercise.status === "in-progress"
                      ? "text-yellow-500"
                      : "text-gray-400"
                  }`}
              >
                <div
                  className="flex-shrink-0 w-6 text-lg flex items-center justify-center transition-transform hover:scale-110"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleStatusChange(exercise.id);
                  }}
                >
                  {getStatusIcon(exercise.status)}
                </div>
                <div
                  className="ml-3 flex-1 flex items-center justify-between"
                  onClick={() =>
                    setExpandedId(
                      expandedId === exercise.id ? null : exercise.id,
                    )
                  }
                >
                  <span className="text-gray-700">{exercise.title}</span>
                  <span
                    className={`text-sm ${getDifficultyColor(exercise.difficulty)} mr-2`}
                  >
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
                    className="bg-gray-50 px-6 py-4"
                  >
                    <p className="text-gray-600 mb-3">{exercise.description}</p>
                    {exercise.requirements && (
                      <div className="requirements-list">
                        <h4 className="text-sm font-semibold text-gray-700 mb-2">
                          Requirements:
                        </h4>
                        <ul className="list-disc pl-5 text-sm text-gray-600">
                          {exercise.requirements.map((req, index) => (
                            <li key={index} className="mb-1">
                              {req}
                            </li>
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
    </div>
  );
};

export default Exercises;

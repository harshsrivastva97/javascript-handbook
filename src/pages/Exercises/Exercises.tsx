import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaClock, FaStar, FaCode, FaPlay, FaLightbulb, FaDumbbell } from "react-icons/fa";
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
      title: "String Calculator",
      description: "Build a calculator that evaluates mathematical expressions given as strings. Learn about string parsing, recursion, and operator precedence.",
      difficulty: "Medium",
      status: "pending",
      timeEstimate: "2-3 hours",
      skills: ["String Manipulation", "Recursion", "Math Operations"],
      requirements: [
        "Support basic operations (+, -, *, /)",
        "Handle parentheses correctly",
        "Respect operator precedence",
        "Support floating-point numbers",
        "Handle invalid input gracefully",
      ],
      example: {
        input: `calculate("2 + 3 * 4");
calculate("(2 + 3) * 4");
calculate("1.5 * (2 + 3.5)");`,
        output: `// Result: 14
// Result: 20
// Result: 8.25`
      },
      hints: [
        "Split the problem into tokenization and evaluation",
        "Use a stack to handle parentheses",
        "Consider using the Shunting Yard algorithm",
      ],
    },
    {
      id: 3,
      title: "Memory Game",
      description: "Create a classic memory card matching game. Practice DOM manipulation, event handling, and game state management.",
      difficulty: "Easy",
      status: "pending",
      timeEstimate: "2-3 hours",
      skills: ["DOM Manipulation", "CSS Animation", "Game Logic"],
      requirements: [
        "Create a 4x4 grid of cards",
        "Implement card flipping animation",
        "Match pairs of cards",
        "Track and display score",
        "Add win condition and reset option",
      ],
      example: {
        input: `initializeGame(16); // 8 pairs
// Player clicks first card
flipCard(card1);
// Player clicks second card
flipCard(card2);`,
        output: `// If cards match:
keepCardsVisible();
updateScore();
// If cards don't match:
flipCardsBack();
nextTurn();`
      },
      hints: [
        "Use CSS transforms for card flipping",
        "Store card state in a data structure",
        "Consider using setTimeout for timing",
      ],
    },
    {
      id: 4,
      title: "Mini State Manager",
      description: "Build a simplified version of Redux/Vuex state management system. Understand how state management libraries work under the hood.",
      difficulty: "Hard",
      status: "pending",
      timeEstimate: "3-4 hours",
      skills: ["State Management", "Observer Pattern", "Immutability"],
      requirements: [
        "Create a store with initial state",
        "Implement subscribe/unsubscribe methods",
        "Add dispatch method for actions",
        "Support middleware",
        "Maintain immutable state updates",
      ],
      example: {
        input: `const store = createStore({count: 0});
store.subscribe(state => console.log(state));
store.dispatch({ type: 'INCREMENT' });`,
        output: `// Initial state
{ count: 0 }
// After INCREMENT action
{ count: 1 }`
      },
      hints: [
        "Use an array to store subscribers",
        "Keep state private using closures",
        "Implement middleware as function composition",
      ],
    },
    {
      id: 5,
      title: "Form Validator",
      description: "Create a reusable form validation library. Learn about regular expressions, error handling, and builder patterns.",
      difficulty: "Medium",
      status: "pending",
      timeEstimate: "2-3 hours",
      skills: ["RegExp", "Error Handling", "Builder Pattern"],
      requirements: [
        "Validate email addresses",
        "Check password strength",
        "Validate phone numbers",
        "Support custom validation rules",
        "Return detailed error messages",
      ],
      example: {
        input: `const validator = new FormValidator();
validator
  .field('email')
    .required()
    .email()
  .field('password')
    .required()
    .minLength(8)
    .hasNumber()
    .hasSpecialChar();`,
        output: `// Valid input
{ isValid: true, errors: {} }

// Invalid input
{
  isValid: false,
  errors: {
    password: ['Must contain a number']
  }
}`
      },
      hints: [
        "Start with basic regex patterns",
        "Use builder pattern for chainable API",
        "Create reusable validation functions",
      ],
    },
    {
      id: 6,
      title: "Array Manipulator",
      description: "Create functions to manipulate arrays without using built-in methods like map, filter, or reduce. This exercise will strengthen your understanding of array operations and loop control.",
      difficulty: "Easy",
      status: "pending",
      timeEstimate: "1-2 hours",
      skills: ["Arrays", "Loops", "Basic Algorithms"],
      requirements: [
        "Implement myMap(arr, fn) that works like Array.map()",
        "Create myFilter(arr, fn) that works like Array.filter()",
        "Build myReduce(arr, fn, initial) that works like Array.reduce()",
        "Write tests for each function",
        "Handle edge cases (empty arrays, undefined values)",
      ],
      example: {
        input: `const numbers = [1, 2, 3, 4, 5];
myMap(numbers, x => x * 2);
myFilter(numbers, x => x % 2 === 0);
myReduce(numbers, (acc, curr) => acc + curr, 0);`,
        output: `// myMap result:
[2, 4, 6, 8, 10]

// myFilter result:
[2, 4]

// myReduce result:
15`
      },
      hints: [
        "Start with a simple for loop for each function",
        "Remember to create new arrays for map and filter",
        "Think about how to handle the accumulator in reduce",
      ],
    },
    {
      id: 7,
      title: "String Calculator",
      description: "Build a calculator that evaluates mathematical expressions given as strings. Learn about string parsing, recursion, and operator precedence.",
      difficulty: "Medium",
      status: "pending",
      timeEstimate: "2-3 hours",
      skills: ["String Manipulation", "Recursion", "Math Operations"],
      requirements: [
        "Support basic operations (+, -, *, /)",
        "Handle parentheses correctly",
        "Respect operator precedence",
        "Support floating-point numbers",
        "Handle invalid input gracefully",
      ],
      example: {
        input: `calculate("2 + 3 * 4");
calculate("(2 + 3) * 4");
calculate("1.5 * (2 + 3.5)");`,
        output: `// Result: 14
// Result: 20
// Result: 8.25`
      },
      hints: [
        "Split the problem into tokenization and evaluation",
        "Use a stack to handle parentheses",
        "Consider using the Shunting Yard algorithm",
      ],
    },
    {
      id: 8,
      title: "Memory Game",
      description: "Create a classic memory card matching game. Practice DOM manipulation, event handling, and game state management.",
      difficulty: "Easy",
      status: "pending",
      timeEstimate: "2-3 hours",
      skills: ["DOM Manipulation", "CSS Animation", "Game Logic"],
      requirements: [
        "Create a 4x4 grid of cards",
        "Implement card flipping animation",
        "Match pairs of cards",
        "Track and display score",
        "Add win condition and reset option",
      ],
      example: {
        input: `initializeGame(16); // 8 pairs
// Player clicks first card
flipCard(card1);
// Player clicks second card
flipCard(card2);`,
        output: `// If cards match:
keepCardsVisible();
updateScore();
// If cards don't match:
flipCardsBack();
nextTurn();`
      },
      hints: [
        "Use CSS transforms for card flipping",
        "Store card state in a data structure",
        "Consider using setTimeout for timing",
      ],
    },
    {
      id: 9,
      title: "Mini State Manager",
      description: "Build a simplified version of Redux/Vuex state management system. Understand how state management libraries work under the hood.",
      difficulty: "Hard",
      status: "pending",
      timeEstimate: "3-4 hours",
      skills: ["State Management", "Observer Pattern", "Immutability"],
      requirements: [
        "Create a store with initial state",
        "Implement subscribe/unsubscribe methods",
        "Add dispatch method for actions",
        "Support middleware",
        "Maintain immutable state updates",
      ],
      example: {
        input: `const store = createStore({count: 0});
store.subscribe(state => console.log(state));
store.dispatch({ type: 'INCREMENT' });`,
        output: `// Initial state
{ count: 0 }
// After INCREMENT action
{ count: 1 }`
      },
      hints: [
        "Use an array to store subscribers",
        "Keep state private using closures",
        "Implement middleware as function composition",
      ],
    },
    {
      id: 10,
      title: "Form Validator",
      description: "Create a reusable form validation library. Learn about regular expressions, error handling, and builder patterns.",
      difficulty: "Medium",
      status: "pending",
      timeEstimate: "2-3 hours",
      skills: ["RegExp", "Error Handling", "Builder Pattern"],
      requirements: [
        "Validate email addresses",
        "Check password strength",
        "Validate phone numbers",
        "Support custom validation rules",
        "Return detailed error messages",
      ],
      example: {
        input: `const validator = new FormValidator();
validator
  .field('email')
    .required()
    .email()
  .field('password')
    .required()
    .minLength(8)
    .hasNumber()
    .hasSpecialChar();`,
        output: `// Valid input
{ isValid: true, errors: {} }

// Invalid input
{
  isValid: false,
  errors: {
    password: ['Must contain a number']
  }
}`
      },
      hints: [
        "Start with basic regex patterns",
        "Use builder pattern for chainable API",
        "Create reusable validation functions",
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
    <div className="scrollable min-h-screen bg-gray-900 text-gray-100 pt-10 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-600">
            Coding Exercises
          </h1>
          <p className="text-lg text-gray-400">
            Practice makes perfect. Choose an exercise and start coding!
          </p>
        </div>

        {/* Progress Section */}
        <div className="bg-gray-800/50 rounded-xl p-6 mb-8 backdrop-blur-sm border border-gray-700/50">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-300 font-medium">Progress Overview</span>
            <span className="text-gray-400">{calculateProgress()}% Complete</span>
          </div>
          <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300"
              style={{ width: `${calculateProgress()}%` }}
            />
          </div>
        </div>

        {/* Exercises List */}
        <div className="space-y-4">
          {exercises.map((exercise) => (
            <div
              key={exercise.id}
              className="bg-gray-800/50 rounded-xl overflow-hidden backdrop-blur-sm border border-gray-700/50 transition-all hover:border-gray-600/50"
            >
              <div className="p-6">
                <div className="flex items-center gap-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStatusChange(exercise.id);
                    }}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${exercise.status === 'completed'
                      ? 'bg-green-500/20 text-green-500 hover:bg-green-500/30'
                      : exercise.status === 'in-progress'
                        ? 'bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/30'
                        : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                      }`}
                  >
                    {getStatusIcon(exercise.status)}
                  </button>

                  <div className="flex-grow">
                    <div
                      className="flex items-center justify-between cursor-pointer"
                      onClick={() => setExpandedId(expandedId === exercise.id ? null : exercise.id)}
                    >
                      <div>
                        <h3 className="text-xl font-semibold text-white mb-2">
                          {exercise.title}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-gray-400">
                          <span className="flex items-center gap-2">
                            <FaClock /> {exercise.timeEstimate}
                          </span>
                          <div className={`flex gap-1 ${getDifficultyDetails(exercise.difficulty).color}`}>
                            {[...Array(getDifficultyDetails(exercise.difficulty).stars)].map((_, i) => (
                              <FaStar key={i} />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-3">
                      {exercise.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1 text-sm rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
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
                    className="border-t border-gray-700/50 p-6 bg-gray-800/30"
                  >
                    <p className="text-gray-300 mb-8 leading-relaxed">
                      {exercise.description}
                    </p>

                    <div className="mb-8">
                      <h4 className="text-lg font-semibold text-white mb-4">Requirements</h4>
                      <ul className="space-y-2">
                        {exercise.requirements.map((req, index) => (
                          <li key={index} className="flex items-center gap-3 text-gray-300">
                            <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {exercise.example && (
                      <div className="mb-8">
                        <h4 className="text-lg font-semibold text-white mb-4">Example</h4>
                        <div className="bg-gray-900/50 rounded-lg p-6 space-y-4">
                          <div>
                            <h5 className="text-sm font-medium text-gray-400 mb-2">Input:</h5>
                            <pre className="font-mono text-sm text-blue-400 bg-gray-900/50 p-4 rounded-lg">
                              {exercise.example.input}
                            </pre>
                          </div>
                          <div>
                            <h5 className="text-sm font-medium text-gray-400 mb-2">Expected Output:</h5>
                            <pre className="font-mono text-sm text-green-400 bg-gray-900/50 p-4 rounded-lg">
                              {exercise.example.output}
                            </pre>
                          </div>
                        </div>
                      </div>
                    )}

                    {exercise.hints && (
                      <div>
                        <button
                          className="px-4 py-2 bg-purple-500/20 text-purple-400 rounded-lg flex items-center gap-2 hover:bg-purple-500/30 transition-colors"
                          onClick={() => showNextHint(exercise.id)}
                        >
                          <FaLightbulb /> Need a hint?
                        </button>
                        {showHint[exercise.id] && (
                          <div className="mt-4 space-y-3">
                            {exercise.hints
                              .slice(0, showHint[exercise.id])
                              .map((hint, index) => (
                                <motion.div
                                  key={index}
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  className="bg-purple-500/10 border border-purple-500/20 p-4 rounded-lg text-gray-300"
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
    </div>
  );
};

export default Exercises;

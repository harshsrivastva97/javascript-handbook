import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaClock, FaStar, FaCode, FaPlay, FaLightbulb, FaDumbbell, FaChevronDown, FaCheckCircle, FaHourglassHalf, FaRegCircle } from "react-icons/fa";
import { FiTarget, FiAward, FiCheckCircle as FiCheck, FiClock, FiList, FiCode } from "react-icons/fi";
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
  const [filterType, setFilterType] = useState<'all' | 'completed' | 'in-progress' | 'pending'>('all');
  const [animateProgress, setAnimateProgress] = useState(false);
  const [exercises, setExercises] = useState<Exercise[]>([
    {
      id: 1,
      title: "Closures and Module Pattern",
      description: "Create a counter module that uses closures to maintain private state. This exercise will help you understand JavaScript closures and the module pattern.",
      difficulty: "Medium",
      status: "pending",
      timeEstimate: "1-2 hours",
      skills: ["Closures", "Module Pattern", "Private Variables", "JavaScript Patterns"],
      requirements: [
        "Create a counter function using closures",
        "Implement increment and decrement methods",
        "Include a reset function to restore initial value",
        "Keep internal state private",
        "Add an optional step parameter to control increment/decrement amount"
      ],
      example: {
        input: `const counter = createCounter(10);
counter.increment();
counter.increment(5);
counter.getValue();
counter.decrement(2);
counter.getValue();
counter.reset();
counter.getValue();`,
        output: `// After initial increments
16
// After decrement by 2
14
// After reset
10`
      },
      hints: [
        "Use a function that returns an object with methods",
        "Store the counter value in a variable within the outer function's scope",
        "The returned methods will have access to that variable via closure",
        "Default the step parameter with a default argument value"
      ],
    },
    {
      id: 2,
      title: "Custom Promise Implementation",
      description: "Build your own Promise implementation to understand how JavaScript Promises work under the hood. Learn about async control flow, state management, and error handling.",
      difficulty: "Hard",
      status: "pending",
      timeEstimate: "3-4 hours",
      skills: ["Promises", "Async Control Flow", "Error Handling", "JavaScript Internals"],
      requirements: [
        "Implement then() and catch() methods",
        "Support Promise chaining",
        "Handle both synchronous and asynchronous resolution",
        "Add support for Promise.all() and Promise.race()",
        "Properly propagate errors through the chain"
      ],
      example: {
        input: `const myPromise = new MyPromise((resolve, reject) => {
  setTimeout(() => resolve('Success!'), 1000);
});

myPromise
  .then(result => {
    console.log(result);
    return result + ' And chained!';
  })
  .then(result => console.log(result))
  .catch(error => console.error(error));
  
MyPromise.all([
  MyPromise.resolve(1),
  MyPromise.resolve(2)
]).then(results => console.log(results));`,
        output: `// After 1 second:
'Success!'
'Success! And chained!'

// From Promise.all():
[1, 2]`
      },
      hints: [
        "Start by implementing a constructor that takes an executor function",
        "Maintain internal state (pending, fulfilled, rejected) and value/reason",
        "Implement 'then' to register callbacks to be executed when the promise resolves",
        "Store callbacks in arrays if the promise is still pending",
        "For Promise.all, use an array to collect all results"
      ],
    },
    {
      id: 3,
      title: "Deep Object Immutability",
      description: "Create a utility for working with deeply nested objects in an immutable way without any external libraries. Practice functional programming concepts and understand immutability patterns.",
      difficulty: "Medium",
      status: "pending",
      timeEstimate: "2-3 hours",
      skills: ["Immutability", "Functional Programming", "Deep Cloning", "Object Manipulation"],
      requirements: [
        "Create a deepClone function to copy objects/arrays deeply",
        "Implement a set function to update nested values without mutation",
        "Add a merge function to combine objects immutably",
        "Handle arrays appropriately in all functions",
        "Support path-based updates (e.g., 'user.address.city')"
      ],
      example: {
        input: `const user = {
  name: 'John',
  address: {
    city: 'New York',
    coords: [40.7128, -74.0060]
  },
  hobbies: ['reading', 'coding']
};

// Update without mutation
const updated = immutable.set(user, 'address.city', 'Boston');
console.log(user.address.city); // Still 'New York'
console.log(updated.address.city); // 'Boston'

// Array update
const withNewHobby = immutable.set(user, 'hobbies[1]', 'running');
console.log(user.hobbies[1]); // Still 'coding'
console.log(withNewHobby.hobbies[1]); // 'running'`,
        output: `// Original object is untouched
'New York'
// New object has updated value
'Boston'

// Original array item is untouched
'coding'
// New array has updated value
'running'`
      },
      hints: [
        "Use recursion for deep cloning objects and arrays",
        "Split the path string into parts to navigate nested objects",
        "Create new object/array copies at each level of the update path",
        "Use regular expressions to detect array notation in paths",
        "Leverage Object.assign or the spread operator for shallow copying"
      ],
    },
    {
      id: 4,
      title: "Advanced Async/Await Error Handling",
      description: "Create a robust error handling system for async functions. Learn about best practices for handling errors in asynchronous JavaScript code with async/await.",
      difficulty: "Hard",
      status: "pending",
      timeEstimate: "2-3 hours",
      skills: ["Async/Await", "Error Handling", "Functional Programming", "Promise Chains"],
      requirements: [
        "Create a wrapper function that handles errors for async functions",
        "Return both error and data in a consistent format",
        "Support for retry logic with configurable attempts",
        "Add timeout functionality to prevent hanging promises",
        "Implement circuit breaker pattern for failing services"
      ],
      example: {
        input: `// Our implementation of try-catch wrapper
const [error, data] = await asyncHandler(fetchUserData, userId);

if (error) {
  console.error('Failed to fetch user:', error);
} else {
  console.log('User data:', data);
}

// With retry logic
const [err, result] = await asyncHandler(
  unreliableFunction,
  { retries: 3, timeout: 1000 },
  ...functionArgs
);`,
        output: `// On success:
[null, { id: 123, name: 'Alice' }]

// On error:
[Error: Failed to fetch user data, 3 retries attempted]

// With circuit breaker triggered:
[Error: Circuit open: Too many failures detected]`
      },
      hints: [
        "Use a tuple return type [error, data] for consistent handling",
        "Implement retry with exponential backoff using setTimeout and recursion",
        "Use Promise.race() with a timeout promise to implement timeouts",
        "Store circuit state in a closure to track failure rates",
        "Consider making the wrapper function customizable with options"
      ],
    },
    {
      id: 5,
      title: "JavaScript Observable Pattern",
      description: "Build a simple Observable implementation similar to RxJS basics. Learn about reactive programming patterns and event handling in JavaScript.",
      difficulty: "Medium",
      status: "pending",
      timeEstimate: "2-3 hours",
      skills: ["Reactive Programming", "Observer Pattern", "Event Handling", "Functional Operators"],
      requirements: [
        "Create an Observable class with subscribe method",
        "Support next, error, and complete notifications",
        "Implement map, filter, and mergeMap operators",
        "Add ability to unsubscribe from observables",
        "Handle both synchronous and asynchronous data sources"
      ],
      example: {
        input: `// Create a simple observable
const observable = new Observable(observer => {
  observer.next(1);
  observer.next(2);
  setTimeout(() => {
    observer.next(3);
    observer.complete();
  }, 1000);
  
  return () => console.log('Cleaned up');
});

// Subscribe to it
const subscription = observable
  .pipe(
    filter(x => x % 2 === 1),
    map(x => x * 10)
  )
  .subscribe({
    next: value => console.log(value),
    error: err => console.error(err),
    complete: () => console.log('Done')
  });

// Later unsubscribe
setTimeout(() => subscription.unsubscribe(), 500);`,
        output: `// Immediately:
10 // (1 passed filter, then mapped to 10)
// After 1 second (never happens due to unsubscribe):
// 30 would appear here if we didn't unsubscribe
// Done would appear here if we didn't unsubscribe

// From unsubscribe:
'Cleaned up'`
      },
      hints: [
        "Create a Subscription class to handle unsubscribing and cleanup",
        "Implement operators as functions that take and return Observables",
        "Use closures to maintain the chain of operations",
        "Pass observer object with next/error/complete methods to subscribers",
        "Return an unsubscribe function from subscribe method"
      ],
    },
    {
      id: 6,
      title: "JavaScript Memoization Utility",
      description: "Implement a versatile memoization utility that works with various function types. Learn about function optimization, caching strategies, and advanced JavaScript techniques.",
      difficulty: "Medium",
      status: "pending",
      timeEstimate: "1-2 hours",
      skills: ["Memoization", "Function Optimization", "Caching", "Higher-Order Functions"],
      requirements: [
        "Create a memoize function that caches results based on arguments",
        "Support complex argument types (objects, arrays)",
        "Add cache expiration and size limiting features",
        "Implement cache statistics (hits/misses)",
        "Allow custom cache key generation"
      ],
      example: {
        input: `// Expensive calculation
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

// Memoize it
const fastFib = memoize(fibonacci);

console.time('First call');
fastFib(40);
console.timeEnd('First call');

console.time('Second call');
fastFib(40);
console.timeEnd('Second call');

// With options
const limitedMemo = memoize(expensiveFunc, {
  maxSize: 100,
  maxAge: 60000,
  keyFn: args => JSON.stringify(args)
});`,
        output: `// First call with standard recursion is slow
'First call: 1255ms'
// Second call uses cached result
'Second call: 0.03ms'

// Cache statistics
{ hits: 1, misses: 1, size: 1 }`
      },
      hints: [
        "Use a Map or plain object as the cache store",
        "Create a default key generation function that handles different argument types",
        "Use optional parameters to configure cache behavior",
        "Implement LRU (Least Recently Used) logic for cache eviction",
        "Consider WeakMap for better memory management with object keys"
      ],
    },
    {
      id: 7,
      title: "Event Delegation System",
      description: "Build a robust event delegation system for efficient DOM event handling. Learn about event bubbling, capturing, and delegation patterns in JavaScript.",
      difficulty: "Easy",
      status: "pending",
      timeEstimate: "1-2 hours",
      skills: ["DOM Events", "Event Delegation", "Event Bubbling", "DOM Manipulation"],
      requirements: [
        "Create a delegate function that attaches a single event listener to a parent",
        "Filter events based on a CSS selector",
        "Support event removal and cleaning up listeners",
        "Add ability to delegate multiple events at once",
        "Implement event data and context passing"
      ],
      example: {
        input: `// Efficient event handling - one listener for many elements
const delegate = createEventDelegator(document.querySelector('#todo-list'));

// Handle clicks on any button within the list
delegate('click', 'button.delete', (event, delegateTarget) => {
  // delegateTarget is the button that matched the selector
  const todoId = delegateTarget.dataset.id;
  removeTodo(todoId);
});

// Handle multiple events
delegate(['mouseenter', 'mouseleave'], 'li.todo-item', (event) => {
  event.target.classList.toggle('hover', event.type === 'mouseenter');
});

// Later, remove the delegation
delegate.off('click', 'button.delete');`,
        output: `// When a delete button is clicked:
'Removing todo with id: 42'

// When mouse interacts with items:
'Item 1 hover state toggled'`
      },
      hints: [
        "Use element.addEventListener for the main parent element",
        "Use element.matches() to check if the event target matches the selector",
        "Store event handlers in a Map to enable proper removal",
        "Use event.target vs event.currentTarget correctly",
        "Consider supporting both capture and bubble phase events"
      ],
    },
    {
      id: 8,
      title: "JavaScript Currying and Composition",
      description: "Implement utility functions for currying and function composition in JavaScript. Learn about functional programming concepts and their practical applications.",
      difficulty: "Medium",
      status: "pending",
      timeEstimate: "1-2 hours",
      skills: ["Functional Programming", "Currying", "Function Composition", "Higher-Order Functions"],
      requirements: [
        "Create a curry function that converts a regular function to a curried one",
        "Implement a compose function for right-to-left function composition",
        "Add a pipe function for left-to-right composition",
        "Support partial application with placeholders",
        "Handle variable argument functions"
      ],
      example: {
        input: `// Currying
const sum = (a, b, c) => a + b + c;
const curriedSum = curry(sum);

curriedSum(1)(2)(3); // 6
curriedSum(1, 2)(3); // 6
curriedSum(1)(2, 3); // 6

// Composition
const double = x => x * 2;
const increment = x => x + 1;
const square = x => x * x;

const pipeline = pipe(increment, double, square);
pipeline(3); // ((3 + 1) * 2)² = 64

const reversed = compose(square, double, increment);
reversed(3); // square(double(increment(3))) = 64`,
        output: `// Curried function results
6
6
6

// Composed function result
64

// Reverse composed function result
64`
      },
      hints: [
        "Use recursion and closures to implement currying",
        "Track accumulated arguments in each curried function layer",
        "For compose/pipe, use Array.reduce to combine functions",
        "Handle edge cases like empty composition chains",
        "Consider using rest parameters and argument length checks"
      ],
    },
    {
      id: 9,
      title: "Custom JavaScript Iterator & Generator",
      description: "Create custom iterators and generators to work with collection data. Master JavaScript's iteration protocols and generator functions.",
      difficulty: "Hard",
      status: "pending",
      timeEstimate: "2-3 hours",
      skills: ["Iterators", "Generators", "Symbol.iterator", "ES6 Features"],
      requirements: [
        "Implement a custom collection with Symbol.iterator",
        "Create sequential, reverse, and filtered iteration methods",
        "Build a paginated data access pattern using generators",
        "Support asynchronous iteration with Symbol.asyncIterator",
        "Add helper utilities for working with infinite sequences"
      ],
      example: {
        input: `// Create a custom collection
const collection = new IterableCollection([1, 2, 3, 4, 5]);

// Use standard iteration
for (const item of collection) {
  console.log(item);
}

// Use specialized iterators
for (const item of collection.reverse()) {
  console.log(item);
}

// Generating paginated data
const paginator = createPaginator(fetchData, { pageSize: 10 });

for await (const page of paginator) {
  console.log(\`Loaded page with \${page.length} items\`);
  if (page.length < 10) break; // Last page
}`,
        output: `// Standard iteration
1
2
3
4
5

// Reverse iteration
5
4
3
2
1

// Pagination results
'Loaded page with 10 items'
'Loaded page with 10 items'
'Loaded page with 5 items'`
      },
      hints: [
        "Implement the iterator protocol by returning an object with next() method",
        "Use generator functions (function*) for easier iterator creation",
        "Remember that generators can yield multiple values over time",
        "For async iteration, return promises from next() or use async generators",
        "Be mindful of infinite sequences and provide ways to limit iteration"
      ],
    },
    {
      id: 10,
      title: "JavaScript Proxy State Management",
      description: "Build a state management system using JavaScript Proxies. Learn about advanced object manipulation, reactivity systems, and modern JavaScript features.",
      difficulty: "Hard",
      status: "pending",
      timeEstimate: "3-4 hours",
      skills: ["Proxies", "State Management", "Reactivity", "Object Manipulation"],
      requirements: [
        "Create a reactive state system using Proxies",
        "Implement subscription to state changes",
        "Add support for computed properties",
        "Handle nested objects and arrays reactively",
        "Implement state transactions and history (undo/redo)"
      ],
      example: {
        input: `// Create a reactive store
const store = createStore({
  count: 0,
  todos: [
    { id: 1, text: 'Learn JS', completed: false }
  ]
});

// Subscribe to changes
store.subscribe(state => console.log('State updated:', state));

// Create a computed property
store.computed('incompleteTodos', 
  state => state.todos.filter(todo => !todo.completed));

// Update the state
store.count++; // Triggers subscription
store.todos.push({ id: 2, text: 'Master Proxies', completed: false });

// Undo last change
store.undo();`,
        output: `// After first update
'State updated: { count: 1, todos: [...] }'

// After second update
'State updated: { count: 1, todos: [..., {id: 2, ...}] }'
'Computed incompleteTodos updated: [{id: 1, ...}, {id: 2, ...}]'

// After undo
'State updated: { count: 1, todos: [{id: 1, ...}] }'`
      },
      hints: [
        "Use JavaScript Proxy to intercept property access and modifications",
        "Maintain a subscription system for notifying about changes",
        "Remember to handle nested objects by wrapping them in proxies too",
        "Track state history in an array for undo/redo functionality",
        "Cache computed values and only recalculate when dependencies change"
      ],
    },
  ]);

  // Animate progress bar on mount
  useEffect(() => {
    setAnimateProgress(true);
  }, []);

  // Filter exercises based on selected filter
  const filteredExercises = exercises.filter(exercise => {
    if (filterType === 'all') return true;
    return exercise.status === filterType;
  });

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
        return <FaCheckCircle className="status-icon completed" />;
      case "in-progress":
        return <FaHourglassHalf className="status-icon in-progress" />;
      default:
        return <FaRegCircle className="status-icon pending" />;
    }
  };

  const getDifficultyDetails = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return {
          class: "easy",
          icon: <FiTarget />,
          stars: 1,
          text: "Beginner friendly",
          color: "var(--success)"
        };
      case "Medium":
        return {
          class: "medium",
          icon: <FiTarget />,
          stars: 2,
          text: "Intermediate level",
          color: "var(--warning)"
        };
      case "Hard":
        return {
          class: "hard",
          icon: <FiAward />,
          stars: 3,
          text: "Advanced concepts",
          color: "var(--danger)"
        };
      default:
        return { class: "", icon: null, stars: 0, text: "", color: "" };
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
    <div className="exercises-page scrollable min-h-screen pt-10 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-4 gradient-text">
            Coding Exercises
          </h1>
          <p className="text-lg text-secondary">
            Practice makes perfect. Choose an exercise and start coding!
          </p>
        </motion.div>

        {/* Progress & Filters Section */}
        <motion.div 
          className="mb-8 grid gap-6 md:grid-cols-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Progress Card */}
          <div className="progress-container rounded-xl p-6 border md:col-span-2">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <FiCheck className="text-primary" />
                <span className="text-primary font-medium">Your Progress</span>
              </div>
              <span className="text-secondary font-semibold">{calculateProgress()}% Complete</span>
            </div>
            <div className="progress-bar relative h-2 rounded-full overflow-hidden">
              <div className="absolute inset-0 bg-gray-200 dark:bg-gray-700"></div>
              <motion.div
                className="progress-fill absolute h-full left-0 top-0"
                initial={{ width: 0 }}
                animate={{ width: animateProgress ? `${calculateProgress()}%` : 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
            <div className="progress-milestones flex justify-between mt-2">
              <div className="flex items-center gap-1 text-xs text-secondary">
                <div className={`milestone-dot w-2 h-2 rounded-full ${calculateProgress() >= 33 ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
                <span>Beginner</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-secondary">
                <div className={`milestone-dot w-2 h-2 rounded-full ${calculateProgress() >= 66 ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
                <span>Intermediate</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-secondary">
                <div className={`milestone-dot w-2 h-2 rounded-full ${calculateProgress() >= 100 ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'}`}></div>
                <span>Advanced</span>
              </div>
            </div>
          </div>

          {/* Filters Card */}
          <div className="filter-container rounded-xl p-6 border">
            <div className="flex items-center gap-2 mb-3">
              <FiList className="text-primary" /> 
              <span className="text-primary font-medium">Filter Exercises</span>
            </div>
            <div className="filter-buttons grid grid-cols-2 gap-2">
              <button 
                className={`filter-button px-3 py-2 text-sm rounded-lg transition-all ${filterType === 'all' ? 'active' : ''}`}
                onClick={() => setFilterType('all')}
              >
                All
              </button>
              <button 
                className={`filter-button px-3 py-2 text-sm rounded-lg transition-all ${filterType === 'pending' ? 'active' : ''}`}
                onClick={() => setFilterType('pending')}
              >
                Not Started
              </button>
              <button 
                className={`filter-button px-3 py-2 text-sm rounded-lg transition-all ${filterType === 'in-progress' ? 'active' : ''}`}
                onClick={() => setFilterType('in-progress')}
              >
                In Progress
              </button>
              <button 
                className={`filter-button px-3 py-2 text-sm rounded-lg transition-all ${filterType === 'completed' ? 'active' : ''}`}
                onClick={() => setFilterType('completed')}
              >
                Completed
              </button>
            </div>
          </div>
        </motion.div>

        {/* Exercises List */}
        <div className="space-y-4">
          {filteredExercises.length === 0 ? (
            <motion.div 
              className="empty-state rounded-xl border p-10 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="flex flex-col items-center gap-4">
                <div className="empty-icon p-4 rounded-full">
                  <FaCode className="text-3xl text-secondary" />
                </div>
                <h3 className="text-xl font-semibold">No exercises found</h3>
                <p className="text-secondary">Try changing your filter selection</p>
                <button 
                  className="primary-button px-4 py-2 rounded-lg mt-2"
                  onClick={() => setFilterType('all')}
                >
                  View All Exercises
                </button>
              </div>
            </motion.div>
          ) : (
            filteredExercises.map((exercise, index) => (
              <motion.div
                key={exercise.id}
                className="exercise-card rounded-xl overflow-hidden border transition-all"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 + 0.3 }}
                whileHover={{ y: -4, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)" }}
              >
                <div className="p-6">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStatusChange(exercise.id);
                      }}
                      className={`status-button w-10 h-10 rounded-full flex items-center justify-center transition-all ${exercise.status}`}
                      aria-label={`Mark as ${exercise.status === "completed" ? "pending" : exercise.status === "in-progress" ? "completed" : "in progress"}`}
                    >
                      {getStatusIcon(exercise.status)}
                    </button>

                    <div className="flex-grow">
                      <div
                        className="flex items-center justify-between cursor-pointer"
                        onClick={() => setExpandedId(expandedId === exercise.id ? null : exercise.id)}
                      >
                        <div className="flex-grow">
                          <h3 className="text-xl font-semibold text-primary mb-2">
                            {exercise.title}
                          </h3>
                          <div className="flex flex-wrap items-center gap-4 text-sm text-secondary">
                            <span className="flex items-center gap-2">
                              <FiClock className="text-primary" /> {exercise.timeEstimate}
                            </span>
                            <div className={`difficulty-badge flex items-center gap-1 px-2 py-1 rounded-full text-xs ${getDifficultyDetails(exercise.difficulty).class}`}>
                              {getDifficultyDetails(exercise.difficulty).icon}
                              <span>{exercise.difficulty}</span>
                            </div>
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className={`expand-icon rounded-full p-2 transition-transform ${expandedId === exercise.id ? 'rotate-180' : ''}`}>
                            <FaChevronDown className="text-secondary" />
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2 mt-3">
                        {exercise.skills.map((skill, index) => (
                          <span
                            key={index}
                            className="skill-tag px-3 py-1 text-sm rounded-full border flex items-center gap-1"
                          >
                            <FiCode className="skill-icon" />
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
                      transition={{ duration: 0.3 }}
                      className="border-t p-6 exercise-details"
                    >
                      <p className="text-primary mb-8 leading-relaxed">
                        {exercise.description}
                      </p>

                      <div className="mb-8">
                        <h4 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
                          <FiList className="text-primary" />
                          Requirements
                        </h4>
                        <ul className="requirements-list space-y-3 pl-2">
                          {exercise.requirements.map((req, index) => (
                            <motion.li 
                              key={index} 
                              className="requirement-item flex items-start gap-3 text-secondary"
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.2, delay: index * 0.05 }}
                            >
                              <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                              <span>{req}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </div>

                      {exercise.example && (
                        <div className="mb-8 example-section p-5 rounded-xl border">
                          <h4 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
                            <FaPlay className="text-primary" />
                            Example
                          </h4>
                          <div className="rounded-lg space-y-4">
                            <div>
                              <h5 className="text-sm font-medium text-secondary mb-2 flex items-center gap-1">
                                <span className="inline-block w-3 h-3 bg-blue-500 rounded-full"></span>
                                Input:
                              </h5>
                              <pre className="code-block input font-mono text-sm p-4 rounded-lg overflow-x-auto">
                                {exercise.example.input}
                              </pre>
                            </div>
                            <div>
                              <h5 className="text-sm font-medium text-secondary mb-2 flex items-center gap-1">
                                <span className="inline-block w-3 h-3 bg-green-500 rounded-full"></span>
                                Expected Output:
                              </h5>
                              <pre className="code-block output font-mono text-sm p-4 rounded-lg overflow-x-auto">
                                {exercise.example.output}
                              </pre>
                            </div>
                          </div>
                        </div>
                      )}

                      {exercise.hints && (
                        <div className="hints-section">
                          <button
                            className="hint-button px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
                            onClick={() => showNextHint(exercise.id)}
                          >
                            <FaLightbulb className="text-primary" /> {showHint[exercise.id] ? "Show Next Hint" : "Need a hint?"}
                          </button>
                          <AnimatePresence>
                            {showHint[exercise.id] && (
                              <motion.div 
                                className="mt-4 space-y-3"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                              >
                                {exercise.hints
                                  .slice(0, showHint[exercise.id])
                                  .map((hint, index) => (
                                    <motion.div
                                      key={index}
                                      initial={{ opacity: 0, y: 20 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{ duration: 0.3 }}
                                      className="hint-container p-4 rounded-lg text-primary border"
                                    >
                                      <div className="flex items-start gap-3">
                                        <FaLightbulb className="text-primary mt-1 flex-shrink-0" />
                                        <p>{hint}</p>
                                      </div>
                                    </motion.div>
                                  ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      )}
                      
                      <div className="flex justify-end mt-6">
                        <button 
                          className={`status-update-button px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${exercise.status === "completed" ? "completed" : exercise.status === "in-progress" ? "in-progress" : "pending"}`}
                          onClick={() => handleStatusChange(exercise.id)}
                        >
                          {exercise.status === "completed" ? (
                            <>
                              <FaCheckCircle /> Mark as Not Started
                            </>
                          ) : exercise.status === "in-progress" ? (
                            <>
                              <FaCheckCircle /> Mark as Complete
                            </>
                          ) : (
                            <>
                              <FaHourglassHalf /> Start Exercise
                            </>
                          )}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Exercises;

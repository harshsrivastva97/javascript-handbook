import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Topic {
  id: number;
  title: string;
  status: 'completed' | 'in-progress' | 'pending';
}

interface TopicsState {
  topics: Topic[];
  topicsToConceptsMap: { [topicId: number]: number };
}

// Load initial state from localStorage or use default
const loadInitialState = (): TopicsState => {
  const savedState = localStorage.getItem('topicsState');
  if (savedState) {
    return JSON.parse(savedState);
  }

  return {
    topics: [
      { id: 1, title: "JavaScript Basics (Data types, JS engine)", status: "pending" },
      { id: 2, title: "Variables (var, let, const)", status: "pending" },
      { id: 3, title: "Functions (Arrow functions & regular)", status: "pending" },
      { id: 4, title: "Objects (Properties, methods, destructuring)", status: "pending" },
      { id: 5, title: "Arrays (Methods, iteration, destructuring)", status: "pending" },
      { id: 6, title: "References vs. Values", status: "pending" },
      { id: 7, title: "Hoisting (Variables, functions)", status: "pending" },
      { id: 8, title: "Closures (Variable scope, lexical environment)", status: "pending" },
      { id: 9, title: "Storage (Session, Local storage & Cookies)", status: "pending" },
      { id: 10, title: "This keyword (Binding and context)", status: "pending" },
      { id: 11, title: "Function Methods (Apply, Call, Bind)", status: "pending" },
      { id: 12, title: "Debounce & Throttling (Performance optimization)", status: "pending" },
      { id: 13, title: "Mixins, Higher-Order Functions (HOF)", status: "pending" },
      { id: 14, title: "Asynchronous JS (Callbacks, Promise, async/await)", status: "pending" },
      { id: 15, title: "Event Loop (Microtasks, Macrotasks)", status: "pending" },
      { id: 16, title: "Global Execution Context & Call Stack", status: "pending" },
      { id: 17, title: "Type Coercion (Equality checks, implicit/explicit conversion)", status: "pending" },
      { id: 18, title: "Operators (Spread, Rest, Nullish Coalescing, Optional Chaining)", status: "pending" },
      { id: 19, title: "Timers (setTimeout, setInterval, clearInterval)", status: "pending" },
      { id: 20, title: "Making API Calls (Fetch, Axios, async patterns)", status: "pending" },
      { id: 21, title: "Async & Defer (Script loading strategies)", status: "pending" },
      { id: 22, title: "Modules (ES6 modules, CommonJS, AMD)", status: "pending" },
      { id: 23, title: "Advanced Patterns (Currying, Generators)", status: "pending" },
      { id: 24, title: "Classes (Syntax, inheritance, private fields)", status: "pending" },
      { id: 25, title: "Event Handling (Bubbling, Capturing, Delegation)", status: "pending" },
      { id: 26, title: "File Handling (Blob, FileReader, WebSockets)", status: "pending" },
      { id: 27, title: "Error Handling (try-catch, custom errors)", status: "pending" },
      { id: 28, title: "Memory Management (Garbage collection)", status: "pending" },
      { id: 29, title: "Performance Optimization Techniques", status: "pending" },
      { id: 30, title: "Security (CORS, CSRF, XSS)", status: "pending" }
    ],
    topicsToConceptsMap: {
      1: 100,  // JavaScript Basics -> jsBasics concept
      2: 102,  // Variables -> variables concept
      3: 103,  // Functions -> functions concept
      4: 104,  // Objects -> objects concept
      5: 105,  // Arrays -> arrays concept
      6: 106,  // References vs Values -> referencesVsValues concept
      7: 107,  // Hoisting -> hoisting concept
      8: 101,  // Closures -> closures concept
      9: 108,  // Storage -> storage concept
      10: 109, // This keyword -> thisKeyword concept
      11: 110, // Function Methods -> callApplyBind concept
      12: 111, // Debounce & Throttling -> debounceThrottle concept
      13: 112, // Mixins & HOF -> mixinsHOF concept
      14: 113, // Async JS -> asyncJS concept
      15: 114, // Event Loop -> eventLoop concept
      16: 115, // Global Execution Context -> executionContext concept
      17: 116, // Type Coercion -> typeCoercion concept
      18: 117, // Operators -> operators concept
      19: 118, // Timers -> timers concept
      20: 119, // API Calls -> apiCalls concept
      21: 120, // Async & Defer -> asyncDefer concept
      22: 121, // Modules -> modules concept
      23: 122, // Advanced Patterns -> advancedPatterns concept
      24: 123, // Classes -> classes concept
      25: 124, // Event Handling -> eventHandling concept
      26: 125, // File Handling -> fileHandling concept
      27: 126, // Error Handling -> errorHandling concept
      28: 127, // Memory Management -> memoryManagement concept
      29: 128, // Performance Optimization -> performance concept
      30: 129  // Security -> security concept
    }
  };
};

const topicsDataMapSlice = createSlice({
  name: 'topicsDataMap',
  initialState: loadInitialState(),
  reducers: {
    updateTopicStatus: (
      state,
      action: PayloadAction<{ topicId: number; status: 'completed' | 'in-progress' | 'pending' }>
    ) => {
      const topic = state.topics.find(t => t.id === action.payload.topicId);
      if (topic) {
        topic.status = action.payload.status;
        // Save to localStorage after each update
        localStorage.setItem('topicsState', JSON.stringify(state));
      }
    },
    addTopic: (
      state,
      action: PayloadAction<{ title: string; conceptId?: number }>
    ) => {
      const newId = Math.max(...state.topics.map(t => t.id)) + 1;
      state.topics.push({
        id: newId,
        title: action.payload.title,
        status: 'pending'
      });
      if (action.payload.conceptId) {
        state.topicsToConceptsMap[newId] = action.payload.conceptId;
      }
      localStorage.setItem('topicsState', JSON.stringify(state));
    }
  }
});

export const { updateTopicStatus, addTopic } = topicsDataMapSlice.actions;
export default topicsDataMapSlice.reducer;
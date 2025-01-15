import { asyncAwait } from './asyncAwait';
import { callApplyBind } from './callApplyBind';
import { closures } from './closures';
import { currying } from './currying';
import { debounce } from './debounce';
import { eventBubbling } from './eventBubbling';
import { eventLoop } from './eventLoop';
import { hoisting } from './hoisting';
import { memoryManagement } from './memoryManagement';
import { promises } from './promises';
import { throttle } from './throttle';
import { variables } from './variables';
import { prototypes } from './prototypes';
import { jsBasics } from './jsBasics';
import { functions } from './functions';
import { objects } from './objects';
import { arrays } from './arrays';
import { referencesVsValues } from './referencesVsValues';
import { storage } from './storage';
import { thisKeyword } from './thisKeyword';
import { mixinsHOF } from './mixinsHOF';
import { executionContext } from './executionContext';
import { typeCoercion } from './typeCoercion';
import { operators } from './operators';
import { timers } from './timers';
import { apiCalls } from './apiCalls';
import { asyncDefer } from './asyncDefer';
import { modules } from './modules';
import { classes } from './classes';
import { fileHandling } from './fileHandling';
import { errorHandling } from './errorHandling';
import { performance } from './performance';
import { security } from './security';
import { Concept } from '../../types/concept';

export const listOfConcepts: Concept[] = [
  {
    id: 100,
    content: jsBasics,
    title: "JavaScript Basics",
    status: "pending"
  },
  {
    id: 101,
    content: closures,
    title: "Closures",
    status: "pending"
  },
  {
    id: 102,
    content: variables,
    title: "Variables",
    status: "pending"
  },
  {
    id: 103,
    content: functions,
    title: "Functions",
    status: "pending"
  },
  {
    id: 104,
    content: objects,
    title: "Objects",
    status: "pending"
  },
  {
    id: 105,
    content: arrays,
    title: "Arrays",
    status: "pending"
  },
  {
    id: 106,
    content: referencesVsValues,
    title: "References vs Values",
    status: "pending"
  },
  {
    id: 107,
    content: hoisting,
    title: "Hoisting",
    status: "pending"
  },
  {
    id: 108,
    content: storage,
    title: "Storage",
    status: "pending"
  },
  {
    id: 109,
    content: thisKeyword,
    title: "This Keyword",
    status: "pending"
  },
  {
    id: 110,
    content: callApplyBind,
    title: "Call, Apply, and Bind",
    status: "pending"
  },
  {
    id: 111,
    content: debounce,
    title: "Debounce",
    status: "pending"
  },
  {
    id: 112,
    content: mixinsHOF,
    title: "Mixins and Higher-Order Functions",
    status: "pending"
  },
  {
    id: 113,
    content: asyncAwait,
    title: "Async/Await",
    status: "pending"
  },
  {
    id: 114,
    content: eventLoop,
    title: "Event Loop",
    status: "pending"
  },
  {
    id: 115,
    content: executionContext,
    title: "Execution Context",
    status: "pending"
  },
  {
    id: 116,
    content: typeCoercion,
    title: "Type Coercion",
    status: "pending"
  },
  {
    id: 117,
    content: operators,
    title: "Operators",
    status: "pending"
  },
  {
    id: 118,
    content: timers,
    title: "Timers",
    status: "pending"
  },
  {
    id: 119,
    content: apiCalls,
    title: "API Calls",
    status: "pending"
  },
  {
    id: 120,
    content: asyncDefer,
    title: "Async/Defer",
    status: "pending"
  },
  {
    id: 121,
    content: modules,
    title: "Modules",
    status: "pending"
  },
  {
    id: 122,
    content: currying,
    title: "Currying",
    status: "pending"
  },
  {
    id: 123,
    content: classes,
    title: "Classes",
    status: "pending"
  },
  {
    id: 124,
    content: eventBubbling,
    title: "Event Bubbling",
    status: "pending"
  },
  {
    id: 125,
    content: fileHandling,
    title: "File Handling",
    status: "pending"
  },
  {
    id: 126,
    content: errorHandling,
    title: "Error Handling",
    status: "pending"
  },
  {
    id: 127,
    content: memoryManagement,
    title: "Memory Management",
    status: "pending"
  },
  {
    id: 128,
    content: performance,
    title: "Performance",
    status: "pending"
  },
  {
    id: 129,
    content: security,
    title: "Security",
    status: "pending"
  },
  {
    id: 130,
    content: promises,
    title: "Promises",
    status: "pending"
  },
  {
    id: 131,
    content: asyncAwait,
    title: "Async/Await",
    status: "pending"
  },
  {
    id: 132,
    content: throttle,
    title: "Throttle",
    status: "pending"
  },
  {
    id: 133,
    content: prototypes,
    title: "Prototypes",
    status: "pending"
  }
]

import { Concept } from "../../types/concept";

export const modules: Concept = {
  id: 121,
  title: "Modules",
  content: {
    explanation: `<p>JavaScript modules allow you to split code into separate files for better organization and maintainability. ES6 introduced a standardized module format.</p>

<h3>Module Features:</h3>
<ul>
  <li>ES6 Modules: import/export syntax</li>
  <li>CommonJS: require/module.exports</li>
  <li>Module Scope: Encapsulated code</li>
  <li>Dynamic Imports: Lazy loading</li>
</ul>`,
    codeExample: `// Named exports
export const sum = (a, b) => a + b;
export const multiply = (a, b) => a * b;

// Default export
export default class Calculator {
  add(a, b) { return a + b; }
}

// Named imports
import { sum, multiply } from './math';

// Default import
import Calculator from './Calculator';

// Import all as namespace
import * as mathUtils from './math';

// Dynamic import
const loadModule = async () => {
  const module = await import('./dynamicModule.js');
  module.doSomething();
};

// Re-exporting
export { sum as addition } from './math';

// CommonJS (Node.js)
const fs = require('fs');
module.exports = { readFile: fs.readFile };`,
    keyPoints: [
      "Modules have their own scope",
      "Support named and default exports",
      "Enable code splitting and lazy loading",
      "Improve code organization",
      "Support circular dependencies",
      "Compatible with bundlers like webpack"
    ],
  },
}; 
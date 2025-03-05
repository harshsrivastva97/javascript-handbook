import { ConceptContent } from "../../constants/types/concept";

export const closures: ConceptContent = {
  explanation: `<p>Closures are one of the most powerful features in JavaScript. A closure is formed when a function is defined inside another function, allowing the inner function to access variables from the outer (enclosing) function's scope, even after the outer function has finished executing.</p>

<h3>How Closures Work:</h3>
<ol>
  <li><strong>Lexical Scoping:</strong> Functions in JavaScript create their own scope, and they have access to variables in their own scope and any outer scopes.</li>
  <li><strong>Variable Retention:</strong> When a function is created, it maintains a reference to its outer lexical environment.</li>
  <li><strong>Data Privacy:</strong> Variables in the outer function become private to the inner function, creating data encapsulation.</li>
</ol>

<h3>Common Use Cases:</h3>
<ul>
  <li><strong>Data Privacy:</strong> Create private variables and methods that are inaccessible from the outside.</li>
  <li><strong>State Management:</strong> Maintain state between function calls without using global variables.</li>
  <li><strong>Factory Functions:</strong> Create functions with some pre-configured behavior.</li>
  <li><strong>Module Pattern:</strong> Create modules with public and private members.</li>
  <li><strong>Partial Application:</strong> Create new functions with some arguments pre-set.</li>
  <li><strong>Event Handlers:</strong> Preserve data from the time the handler was created.</li>
</ul>

<h3>Important Concepts:</h3>
<ul>
  <li><strong>Memory Management:</strong> Closures keep references to their outer scope, which prevents garbage collection of those variables.</li>
  <li><strong>Scope Chain:</strong> Closures have access to their own scope, their outer function's scope, and the global scope.</li>
  <li><strong>Value vs Reference:</strong> Closures capture variables by reference, not by value.</li>
</ul>`,
  codeExample: `// Example 1: Basic Closure for Data Privacy
function createCounter() {
  let count = 0;  // Private variable
  
  return {
    increment: function() {
      count++;
      return count;
    },
    decrement: function() {
      count--;
      return count;
    },
    getCount: function() {
      return count;
    }
  };
}

const counter = createCounter();
console.log(counter.getCount());  // 0
console.log(counter.increment()); // 1
console.log(counter.increment()); // 2
console.log(counter.decrement()); // 1
// count variable is not accessible directly: console.log(counter.count) // undefined

// Example 2: Factory Function with Closure
function createMultiplier(factor) {
  return function(number) {
    return number * factor;
  };
}

const double = createMultiplier(2);
const triple = createMultiplier(3);
console.log(double(5));  // 10
console.log(triple(5));  // 15

// Example 3: Event Handler with Closure
function setupHandler(element, event, callback) {
  let timesCalled = 0;
  
  element.addEventListener(event, function() {
    timesCalled++;
    callback(timesCalled);
  });
}

// Example 4: Module Pattern
const bankAccount = (function() {
  let balance = 0;  // Private variable
  
  return {
    deposit: function(amount) {
      if (amount > 0) {
        balance += amount;
        return true;
      }
      return false;
    },
    withdraw: function(amount) {
      if (amount <= balance) {
        balance -= amount;
        return true;
      }
      return false;
    },
    getBalance: function() {
      return balance;
    }
  };
})();`,
  keyPoints: [
    "Closures provide data privacy and encapsulation",
    "They maintain access to their outer scope's variables",
    "Useful for creating factory functions and modules",
    "Enable stateful functions without global variables",
    "Commonly used in event handlers and callbacks",
    "Help implement the module pattern in JavaScript",
    "Variables in closures are captured by reference",
    "Memory efficient when used properly, but can cause memory leaks if not managed well",
  ]
};

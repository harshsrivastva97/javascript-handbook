import { ConceptContent } from "../../types/concept";

export const thisKeyword: ConceptContent = {
    explanation: `<p>The 'this' keyword in JavaScript refers to the current execution context and its behavior can vary based on how and where a function is called.</p>

<h3>Context Rules:</h3>
<ul>
  <li>Global context: 'this' refers to the global object (window in browsers)</li>
  <li>Method context: 'this' refers to the object owning the method</li>
  <li>Event handlers: 'this' refers to the element that triggered the event</li>
  <li>Constructor context: 'this' refers to the newly created instance</li>
</ul>`,
    codeExample: `// Global Context
console.log(this === window); // true (in browser)

// Method Context
const person = {
  name: 'John',
  greet() {
    return \`Hello, \${this.name}!\`;
  }
};

// Constructor Context
function User(name) {
  this.name = name;
  this.sayHi = function() {
    return \`Hi, \${this.name}!\`;
  };
}

// Arrow Functions
const obj = {
  name: 'Object',
  regularMethod: function() {
    console.log(this.name); // 'Object'
    const arrowFunc = () => {
      console.log(this.name); // 'Object'
    };
    arrowFunc();
  }
};

// Event Handler Context
button.addEventListener('click', function() {
  console.log(this); // button element
});`,
    keyPoints: [
        "Context depends on how function is called",
        "Arrow functions inherit 'this' from enclosing scope",
        "Methods like call(), apply(), bind() can change 'this'",
        "'this' in global scope refers to global object",
        "Strict mode affects 'this' behavior",
        "Common source of bugs in JavaScript"
    ]
}; 
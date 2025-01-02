import { Concept } from "../../types/concept";

export const callApplyBind: Concept = {
  id: 8,
  title: "Call, Apply, and Bind",
  content: {
    explanation: `<p>The methods <strong>call</strong>, <strong>apply</strong>, and <strong>bind</strong> allow us to explicitly set the value of <code>this</code> for a function. They are particularly useful when borrowing methods from one object or controlling the execution context of a function.</p>

<h3>How They Work:</h3>
<ul>
<li><strong>Call:</strong> Invokes the function immediately with arguments passed individually.</li>
<li><strong>Apply:</strong> Invokes the function immediately with arguments passed as an array.</li>
<li><strong>Bind:</strong> Returns a new function with a fixed <code>this</code>, but does not execute immediately.</li>
</ul>

<h3>Common Use Cases:</h3>
<ol>
<li>Borrowing methods from other objects.</li>
<li>Fixing <code>this</code> context in event listeners or callbacks.</li>
</ol>`,
    codeExample: `const person = {
name: 'Alice',
greet: function (greeting) {
  console.log(\`\${greeting}, \${this.name}\`);
},
};

const anotherPerson = { name: 'Bob' };

// Call
person.greet.call(anotherPerson, 'Hello'); // "Hello, Bob"

// Apply
person.greet.apply(anotherPerson, ['Hi']); // "Hi, Bob"

// Bind
const boundGreet = person.greet.bind(anotherPerson, 'Hey');
boundGreet(); // "Hey, Bob"`,
    keyPoints: [
      'Call and apply invoke the function immediately, with a specific "this".',
      'Bind returns a new function with the specified "this", to be invoked later.',
      'Useful for borrowing methods and fixing "this" context in callbacks.',
    ],
  },
};

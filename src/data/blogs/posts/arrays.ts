export const arraysPost = {
  id: "2",
  title: "Mastering JavaScript Array Methods",
  excerpt: "Deep dive into powerful array methods like map, filter, reduce, and more",
  content: `
    <h2>Essential Array Methods in Modern JavaScript</h2>
    <p>JavaScript provides a rich set of array methods that make data manipulation easier and more intuitive. Understanding these methods is crucial for writing clean and efficient code.</p>

    <h3>The map() Method</h3>
    <p>The map() method creates a new array with the results of calling a function for every array element.</p>
    <pre><code>const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(num => num * 2);
// Result: [2, 4, 6, 8, 10]</code></pre>

    <h3>The filter() Method</h3>
    <p>Use filter() to create a new array with elements that pass a test condition.</p>
    <pre><code>const numbers = [1, 2, 3, 4, 5, 6];
const evenNumbers = numbers.filter(num => num % 2 === 0);
// Result: [2, 4, 6]</code></pre>

    <h3>The reduce() Method</h3>
    <p>The reduce() method reduces an array to a single value (from left-to-right).</p>
    <pre><code>const numbers = [1, 2, 3, 4, 5];
const sum = numbers.reduce((acc, curr) => acc + curr, 0);
// Result: 15</code></pre>

    <h2>Advanced Array Operations</h2>
    
    <h3>Chaining Methods</h3>
    <pre><code>const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const result = numbers
  .filter(num => num % 2 === 0)
  .map(num => num * 2)
  .reduce((acc, curr) => acc + curr, 0);
// Result: 60</code></pre>

    <h3>The find() and findIndex() Methods</h3>
    <pre><code>const users = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' },
  { id: 3, name: 'Bob' }
];

const jane = users.find(user => user.name === 'Jane');
const janeIndex = users.findIndex(user => user.name === 'Jane');</code></pre>

    <h2>Best Practices</h2>
    <ul>
      <li>Use map() when you want to transform elements</li>
      <li>Use filter() for selecting elements that match criteria</li>
      <li>Use reduce() for accumulating values</li>
      <li>Chain methods responsibly to maintain readability</li>
      <li>Consider performance with large arrays</li>
    </ul>

    <h2>Common Use Cases</h2>
    <p>Here are some practical examples of array methods in real-world scenarios:</p>

    <h3>Data Transformation</h3>
    <pre><code>const products = [
  { id: 1, name: 'Laptop', price: 999 },
  { id: 2, name: 'Phone', price: 699 },
  { id: 3, name: 'Tablet', price: 399 }
];

const formattedProducts = products.map(product => ({
  ...product,
  price: [price]
}));</code></pre>

    <h2>Conclusion</h2>
    <p>Mastering array methods is essential for modern JavaScript development. They provide clean, functional approaches to data manipulation and help write more maintainable code.</p>
  `,
  image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?auto=format&fit=crop&w=1600&h=900",
  link: "/array-methods",
  tags: ["JavaScript", "Arrays", "ES6"]
}; 
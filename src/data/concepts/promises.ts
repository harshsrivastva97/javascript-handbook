import { Concept } from '../../types/concept';

export const promises: Concept = {
  id: 3,
  title: 'Promises',
  content: {
    explanation: `<p>Promises are objects that represent the eventual completion (or failure) of an asynchronous operation. They provide a more elegant and manageable way to handle asynchronous operations compared to callbacks.</p>

<h3>States of a Promise:</h3>
<ol>
<li><strong>Pending:</strong> Initial state when the Promise is created and hasn't been fulfilled or rejected yet.</li>
<li><strong>Fulfilled:</strong> The operation completed successfully, and the promise has a resulting value.</li>
<li><strong>Rejected:</strong> The operation failed, and the promise has a reason for the failure.</li>
</ol>

<h3>Creating Promises:</h3>
<p>A Promise is created using the Promise constructor which takes an executor function. This function receives two arguments: resolve and reject.</p>

<h3>Promise Methods:</h3>
<ul>
<li><strong>.then()</strong>: Handles the success case and returns a new Promise.</li>
<li><strong>.catch()</strong>: Handles any errors that occurred in the chain.</li>
<li><strong>.finally()</strong>: Executes code regardless of success or failure.</li>
</ul>

<h3>Common Promise Static Methods:</h3>
<ul>
<li><strong>Promise.all()</strong>: Waits for all promises to resolve or any to reject.</li>
<li><strong>Promise.race()</strong>: Settles as soon as any promise settles (resolves or rejects).</li>
<li><strong>Promise.allSettled()</strong>: Waits for all promises to settle regardless of success/failure.</li>
<li><strong>Promise.any()</strong>: Fulfills when any promise fulfills, rejects if all reject.</li>
</ul>

<h3>Why Use Promises:</h3>
<ul>
<li>Better error handling with .catch() compared to try-catch in callbacks.</li>
<li>Chaining multiple asynchronous operations with .then() prevents callback hell.</li>
<li>Promises are immutable once settled, preventing state modification.</li>
<li>Built-in support for async/await syntax in modern JavaScript.</li>
<li>Easier parallel execution of multiple async operations.</li>
</ul>`,
    codeExample: `// Creating a simple promise
const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve('Data fetched'), 2000);
  });
};

// Basic usage
fetchData()
  .then(data => console.log(data))
  .catch(error => console.error(error));

// Chaining promises
const processData = async () => {
  try {
    const data = await fetchData();
    const processed = await transformData(data);
    const saved = await saveToDatabase(processed);
    return saved;
  } catch (error) {
    console.error('Error:', error);
  }
};

// Parallel execution
const promises = [fetchUsers(), fetchPosts(), fetchComments()];
Promise.all(promises)
  .then(([users, posts, comments]) => {
    console.log('All data fetched:', { users, posts, comments });
  })
  .catch(error => console.error('One of the requests failed:', error));

// Error handling
const fetchWithTimeout = (timeout) => {
  return Promise.race([
    fetch('https://api.example.com/data'),
    new Promise((_, reject) => 
      setTimeout(() => reject(new Error('Timeout')), timeout)
    )
  ]);
};`,
    keyPoints: [
      'Promises provide a clean solution for handling asynchronous operations',
      'They have three states: pending, fulfilled, and rejected',
      'Promise chaining allows sequential async operations with .then()',
      'Error handling is simplified with .catch()',
      'Static methods like Promise.all() enable parallel execution',
      'Promises are the foundation for async/await syntax',
      'They are immutable once settled, ensuring reliable state management',
    ],
  },
};
export const promisesPost = {
  id: "1",
  title: "Understanding JavaScript Promises and Async/Await",
  excerpt: "A comprehensive guide to handling asynchronous operations in modern JavaScript",
  content: `
    <h2>Introduction to Promises</h2>
    <p>Promises are a fundamental concept in modern JavaScript that help us handle asynchronous operations more effectively. They represent a value that might not be available immediately but will be resolved at some point in the future.</p>

    <h3>Basic Promise Syntax</h3>
    <pre><code>
const myPromise = new Promise((resolve, reject) => {
  // Asynchronous operation here
  if (success) {
    resolve(result);
  } else {
    reject(error);
  }
});
    </code></pre>

    <h2>Async/Await: A Better Way to Handle Promises</h2>
    <p>The async/await syntax provides a more elegant way to work with Promises, making asynchronous code look and behave more like synchronous code. It allows us to write asynchronous code that looks synchronous, making it easier to understand and maintain.</p>

    <h3>Example Implementation</h3>
    <pre><code>
async function fetchUserData() {
  try {
    const response = await fetch('/api/user');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
}
    </code></pre>

    <h2>Best Practices</h2>
    <ul>
      <li>Always handle Promise rejections using try/catch blocks</li>
      <li>Use Promise.all() for parallel operations</li>
      <li>Keep error messages informative and specific</li>
      <li>Consider using Promise.race() for timeout implementations</li>
    </ul>

    <h2>Advanced Promise Patterns</h2>
    <p>Let's explore some advanced patterns when working with Promises:</p>

    <h3>Promise Chaining</h3>
    <pre><code>
fetchUserProfile()
  .then(profile => fetchUserPosts(profile.id))
  .then(posts => processUserPosts(posts))
  .catch(error => handleError(error));
    </code></pre>

    <h3>Parallel Promise Execution</h3>
    <pre><code>
const promises = [
  fetch('/api/users'),
  fetch('/api/posts'),
  fetch('/api/comments')
];

Promise.all(promises)
  .then(([users, posts, comments]) => {
    // Process all the data
  })
  .catch(error => {
    // Handle any errors
  });
    </code></pre>

    <h2>Common Pitfalls</h2>
    <p>When working with Promises and async/await, there are several common mistakes to avoid:</p>
    <ul>
      <li>Forgetting to handle errors</li>
      <li>Not considering Promise.all() for parallel operations</li>
      <li>Unnecessary async/await usage</li>
      <li>Not understanding the event loop</li>
      <li>Forgetting to return promises in chains</li>
    </ul>

    <h2>Conclusion</h2>
    <p>Understanding Promises and async/await is crucial for modern JavaScript development. These patterns help us write more maintainable and efficient asynchronous code. Practice these concepts regularly and always consider error handling in your implementations.</p>
  `,
  image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=1600&h=900",
  link: "/understanding-promises",
  tags: ["JavaScript", "Async", "Promises", "ES6"]
}; 
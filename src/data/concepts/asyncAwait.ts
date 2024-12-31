import { Concept } from '../../types/concept';

export const asyncAwait: Concept = {
  id: 4,
  title: 'Async/Await',
  content: {
    explanation: `<p>Async/Await is a revolutionary syntax in JavaScript that transforms how we write asynchronous code. It builds on top of Promises to provide a more intuitive and synchronous-looking way to handle asynchronous operations.</p>

<h3>Understanding Async Functions:</h3>
<ul>
  <li><strong>Declaration:</strong>
    <ul>
      <li>Created by adding the 'async' keyword before a function declaration</li>
      <li>Can be used with regular functions, arrow functions, and class methods</li>
      <li>Always returns a Promise, even if you return a non-Promise value</li>
    </ul>
  </li>
  <li><strong>Return Behavior:</strong>
    <ul>
      <li>Return value → Promise.resolve(value)</li>
      <li>Thrown error → Promise.reject(error)</li>
      <li>Returned promise → Used as-is</li>
    </ul>
  </li>
</ul>

<h3>The Power of Await:</h3>
<ul>
  <li><strong>Purpose:</strong>
    <ul>
      <li>Pauses execution of async function until Promise settles</li>
      <li>Unwraps the Promise to return its resolved value</li>
      <li>Converts Promise rejection into thrown error</li>
    </ul>
  </li>
  <li><strong>Rules:</strong>
    <ul>
      <li>Can only be used inside async functions</li>
      <li>Works with any "thenable" object (Promise-like)</li>
      <li>Maintains proper error propagation chain</li>
    </ul>
  </li>
</ul>

<h3>Advanced Concepts:</h3>
<ul>
  <li><strong>Execution Flow:</strong>
    <ul>
      <li>Async functions execute synchronously until first await</li>
      <li>Control is yielded back to calling context during await</li>
      <li>Execution resumes when awaited Promise settles</li>
    </ul>
  </li>
  <li><strong>Error Handling:</strong>
    <ul>
      <li>try/catch blocks work naturally with await</li>
      <li>Errors propagate through async function calls</li>
      <li>Unhandled rejections become uncaught exceptions</li>
    </ul>
  </li>
</ul>

<h3>Performance Considerations:</h3>
<ul>
  <li><strong>Sequential vs Parallel:</strong>
    <ul>
      <li>Sequential: Use multiple await statements in sequence</li>
      <li>Parallel: Combine Promise.all() with await</li>
      <li>Mixed: Start operations together, await as needed</li>
    </ul>
  </li>
  <li><strong>Common Pitfalls:</strong>
    <ul>
      <li>Unnecessary sequential awaits slowing execution</li>
      <li>Forgetting to handle errors properly</li>
      <li>Not considering Promise.all() for parallel operations</li>
    </ul>
  </li>
</ul>

<h3>Best Practices:</h3>
<ul>
  <li><strong>Error Handling:</strong>
    <ul>
      <li>Always use try/catch blocks for await statements</li>
      <li>Consider creating error boundaries for groups of operations</li>
      <li>Properly propagate errors to calling code</li>
    </ul>
  </li>
  <li><strong>Code Organization:</strong>
    <ul>
      <li>Keep async functions focused and single-purpose</li>
      <li>Use meaningful names that indicate asynchronous nature</li>
      <li>Consider extracting reusable async operations</li>
    </ul>
  </li>
</ul>`,
    codeExample: `// 1. Basic Pattern with Error Handling
async function fetchUserProfile(userId) {
  try {
    const user = await fetchUser(userId);
    const preferences = await fetchPreferences(userId);
    return { ...user, ...preferences };
  } catch (error) {
    console.error('Failed to fetch profile:', error);
    throw new Error('Profile fetch failed');
  }
}

// 2. Optimized Parallel Execution
async function loadDashboardData(userId) {
  try {
    // Start all fetches simultaneously
    const [
      userPromise,
      postsPromise,
      notificationsPromise
    ] = [
      fetchUser(userId),
      fetchUserPosts(userId),
      fetchNotifications(userId)
    ];

    // Await results together
    const [user, posts, notifications] = await Promise.all([
      userPromise,
      postsPromise,
      notificationsPromise
    ]);

    return { user, posts, notifications };
  } catch (error) {
    throw new Error('Dashboard data load failed');
  }
}

// 3. Advanced Error Handling with Retries
async function robustFetch(url, options = {}) {
  const MAX_RETRIES = 3;
  let lastError;

  for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
    try {
      const response = await fetch(url, {
        ...options,
        timeout: 5000
      });

      if (!response.ok) {
        throw new Error(\`HTTP error! status: \${response.status}\`);
      }

      return await response.json();
    } catch (error) {
      lastError = error;
      await new Promise(resolve => 
        setTimeout(resolve, Math.pow(2, attempt) * 1000)
      );
    }
  }

  throw new Error(\`Failed after \${MAX_RETRIES} attempts: \${lastError.message}\`);
}

// 4. Conditional Async Operations
async function smartFetch(urls, options = {}) {
  const results = [];
  const errors = [];

  for (const url of urls) {
    if (!options.skipValidation) {
      try {
        await validateUrl(url);
      } catch (error) {
        errors.push({ url, error: 'Validation failed' });
        continue;
      }
    }

    try {
      const data = await robustFetch(url);
      results.push({ url, data });
    } catch (error) {
      errors.push({ url, error: error.message });
    }
  }

  return { results, errors };
}`,
    keyPoints: [
      'Async functions automatically wrap returns in Promises',
      'Await pauses execution while maintaining program responsiveness',
      'Enables linear code flow for asynchronous operations',
      'Supports both sequential and parallel execution patterns',
      'Provides natural error handling with try/catch',
      'Simplifies complex asynchronous workflows',
      'Improves code readability and maintenance',
      'Integrates seamlessly with existing Promise-based code',
      'Allows for better error tracking and debugging',
      'Supports advanced patterns like retries and timeouts'
    ],
  },
}; 
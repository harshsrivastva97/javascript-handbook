export const reactHooksPost = {
  id: "3",
  title: "Understanding React Hooks",
  excerpt: "Complete guide to React Hooks and functional components",
  content: `
    <h2>Introduction to React Hooks</h2>
    <p>React Hooks revolutionized how we write components by enabling state and other React features in functional components. They provide a more direct way to use state and lifecycle features without writing a class.</p>

    <h3>The useState Hook</h3>
    <p>useState is the most basic Hook that lets you add state to functional components.</p>
    <pre><code>import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}</code></pre>

    <h3>The useEffect Hook</h3>
    <p>useEffect lets you perform side effects in function components.</p>
    <pre><code>import React, { useState, useEffect } from 'react';

function UserProfile({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      const response = await fetch(API_URL);
      const data = await response.json();
      setUser(data);
    }
    fetchUser();
  }, [userId]);

  if (!user) return 'Loading...';
  return <div>{user.name}</div>;
}</code></pre>

    <h2>Custom Hooks</h2>
    <p>Create reusable logic with custom hooks:</p>
    <pre><code>function useWindowSize() {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return size;
}</code></pre>

    <h2>Advanced Hooks</h2>
    
    <h3>useCallback</h3>
    <pre><code>const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b],
);</code></pre>

    <h3>useMemo</h3>
    <pre><code>const memoizedValue = useMemo(
  () => computeExpensiveValue(a, b),
  [a, b]
);</code></pre>

    <h2>Best Practices</h2>
    <ul>
      <li>Only call Hooks at the top level</li>
      <li>Only call Hooks from React function components</li>
      <li>Use the ESLint plugin for Hooks</li>
      <li>Keep custom Hooks focused and reusable</li>
      <li>Use dependency arrays wisely</li>
    </ul>

    <h2>Common Patterns</h2>
    <p>Here are some common patterns when working with Hooks:</p>

    <h3>Data Fetching</h3>
    <pre><code>function useData(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setData(json);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    }
    fetchData();
  }, [url]);

  return { data, loading, error };
}</code></pre>

    <h2>Conclusion</h2>
    <p>React Hooks provide a powerful way to use state and other React features without classes. They enable better code reuse, more readable code, and can help avoid common pitfalls in React development.</p>
  `,
  image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=1600&h=900",
  link: "/react-hooks",
  tags: ["React", "Hooks", "JavaScript"]
}; 
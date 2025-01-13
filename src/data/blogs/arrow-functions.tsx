import React from 'react';
import { Blog } from './index';

const arrowFunctions: Blog = {
  id: 1,
  title: "Arrow Functions vs Regular Functions: More Than Just Syntax",
  excerpt: "Dive deep into the key differences between arrow functions and regular functions, including 'this' binding, constructors, and best practices for when to use each.",
  date: "2024-03-20",
  readTime: "8 min read",
  tags: ["JavaScript", "Functions", "ES6"],
  link: "/arrow-vs-regular-functions",
  image: "https://via.placeholder.com/800x400?text=Arrow+Functions",
  content: (
    <>
      <h2>Introduction</h2>
      <p>
        Arrow functions were introduced in ES6 as a new syntax for writing JavaScript functions. 
        However, they're more than just a shorter way to write functions - they come with their own 
        set of behaviors that make them fundamentally different from regular functions.
      </p>

      <h2>Key Differences</h2>
      <p>
        The main differences between arrow functions and regular functions can be categorized into 
        several key areas:
      </p>

      <h3>1. 'this' Binding</h3>
      <p>
        Arrow functions don't have their own 'this' context. Instead, they inherit 'this' from the 
        enclosing scope. This makes them particularly useful in callback functions and methods that 
        need to preserve the outer context.
      </p>

      <pre><code>{`
// Regular function
function Counter() {
  this.count = 0;
  this.increment = function() {
    setTimeout(function() {
      this.count++; // 'this' is undefined
    }, 1000);
  }
}

// Arrow function
function Counter() {
  this.count = 0;
  this.increment = function() {
    setTimeout(() => {
      this.count++; // 'this' refers to Counter instance
    }, 1000);
  }
}
      `}</code></pre>

      {/* Add more content sections here */}
    </>
  )
};

export default arrowFunctions; 
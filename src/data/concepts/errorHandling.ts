import { ConceptContent } from "../../utils/types/concept";

export const errorHandling: ConceptContent = {
  explanation: `<p>Error handling in JavaScript involves catching and managing runtime errors using try-catch blocks and custom error types.</p>

<h3>Error Handling Concepts:</h3>
<ul>
  <li>Try-Catch Blocks</li>
  <li>Custom Error Types</li>
  <li>Error Propagation</li>
  <li>Async Error Handling</li>
</ul>`,
  codeExample: `// Basic Try-Catch
try {
  throw new Error('Something went wrong');
} catch (error) {
  console.error(error.message);
} finally {
  console.log('Cleanup code');
}

// Custom Error Types
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ValidationError';
  }
}

// Async Error Handling
async function fetchData() {
  try {
    const response = await fetch('api/data');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return await response.json();
  } catch (error) {
    console.error('Fetch error:', error);
    throw error; // Re-throwing
  }
}

// Error Boundaries (React)
class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    logErrorToService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}`,
  keyPoints: [
    "Try-catch blocks handle runtime errors",
    "Custom errors extend Error class",
    "Finally block always executes",
    "Async functions use try-catch with await",
    "Error boundaries catch React component errors",
    "Error propagation follows call stack"
  ]
}; 

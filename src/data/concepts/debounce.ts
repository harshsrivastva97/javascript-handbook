import { Concept } from "../../types/concept";

export const debounce: Concept = {
  id: 6,
  title: "Debounce",
  content: {
    explanation: `<p>Debounce is a programming pattern that delays the execution of a function until after a period of inactivity.</p>

<h3>What is Debouncing?</h3>
<p>Think of debouncing like an elevator: Instead of immediately moving after each button press, it waits until people stop pressing buttons for a few seconds before moving.</p>

<h3>Key Characteristics:</h3>
<ul>
<li><strong>Delay-based:</strong> Function executes only after a specified delay of inactivity</li>
<li><strong>Timer Reset:</strong> Each new event resets the delay timer</li>
<li><strong>Last Call Wins:</strong> Only the final function call gets executed</li>
</ul>

<h3>Common Use Cases:</h3>
<ol>
<li><strong>Search Input:</strong> Wait until user stops typing before making API calls</li>
<li><strong>Window Resize:</strong> Update layout only after user finishes resizing</li>
<li><strong>Save Drafts:</strong> Auto-save only after user stops typing</li>
</ol>

<h3>Visual Representation:</h3>
<pre>
Events:   ┃━━┃━━┃━━━━━┃━━━━━━━━━┃
Debounce: ━━━━━━━━━━━━━━━━━━━━━┃
        └─Delay─┘
</pre>
<p>The function only executes after the specified delay of inactivity.</p>`,
    codeExample: `function debounce(func, delay) {
let timeoutId;

return function (...args) {
  // Cancel previous timeout
  clearTimeout(timeoutId);
  
  // Set new timeout
  timeoutId = setTimeout(() => {
    func.apply(this, args);
  }, delay);
};
}

// Example Usage
const searchInput = document.querySelector('input');
const handleSearch = debounce((event) => {
// Make API call with search term
console.log('Searching:', event.target.value);
}, 500);

searchInput.addEventListener('input', handleSearch);`,
    keyPoints: [
      "Executes function only after a period of inactivity",
      "Useful for expensive operations that don't need to run on every event",
      "Cancels pending executions when new events occur",
      "Perfect for search inputs, form validation, and window resize events",
    ],
  },
};

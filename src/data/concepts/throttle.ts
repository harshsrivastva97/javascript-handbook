import { ConceptContent } from "../../types/concept";

export const throttle: ConceptContent = {
  explanation: `<p>Throttle limits the rate at which a function can execute, ensuring it runs at a regular interval regardless of how frequently the event occurs.</p>

<h3>What is Throttling?</h3>
<p>Think of throttling like a rate limiter on a water pipe: No matter how much water pressure (events) you apply, the flow remains constant.</p>

<h3>Key Characteristics:</h3>
<ul>
<li><strong>Time-based:</strong> Function executes at a fixed time interval</li>
<li><strong>Regular Execution:</strong> Guarantees function runs at steady intervals</li>
<li><strong>First Call Priority:</strong> Executes the first call immediately</li>
</ul>

<h3>Common Use Cases:</h3>
<ol>
<li><strong>Scroll Events:</strong> Update UI elements while scrolling</li>
<li><strong>Game Controls:</strong> Limit player action rates</li>
<li><strong>API Rate Limiting:</strong> Prevent excessive server requests</li>
</ol>

<h3>Visual Representation:</h3>
<pre>
Events:   ┃━━┃━━┃━━━━━┃━━━━━━━━━┃
Throttle: ┃━━━━━┃━━━━━┃━━━━━┃━━━━
        └─Interval─┘
</pre>
<p>The function executes at regular intervals, regardless of event frequency.</p>

<h3>Throttle vs Debounce:</h3>
<ul>
<li><strong>Throttle:</strong> Regular execution at fixed intervals</li>
<li><strong>Debounce:</strong> Execution after period of inactivity</li>
</ul>`,
  codeExample: `function throttle(func, limit) {
let inThrottle = false;

return function (...args) {
  if (!inThrottle) {
    func.apply(this, args);
    inThrottle = true;
    
    setTimeout(() => {
      inThrottle = false;
    }, limit);
  }
};
}

// Example Usage
const handleScroll = throttle(() => {
// Update UI based on scroll position
console.log('Scroll position:', window.scrollY);
}, 100);

window.addEventListener('scroll', handleScroll);`,
  keyPoints: [
    "Executes function at a regular interval",
    "Guarantees a maximum execution rate",
    "Ideal for continuous events like scrolling or dragging",
    "Different from debounce: runs regularly vs. waiting for inactivity",
  ]
};

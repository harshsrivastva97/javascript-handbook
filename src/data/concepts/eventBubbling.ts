import { Concept } from "../../types/concept";

export const eventBubbling: Concept = {
  id: 11,
  title: "Event Bubbling and Capturing",
  content: {
    explanation: `<p>Event bubbling and capturing are fundamental concepts in DOM event propagation. When an event occurs on an element, it triggers a complex propagation process through the DOM tree.</p>

<h3>Event Propagation Phases:</h3>
<ol>
  <li><strong>Capturing Phase (Phase 1):</strong>
    <ul>
      <li>Event starts from the window → document → root element → target's parent → ... → target's direct parent</li>
      <li>Rarely used but useful for specific scenarios</li>
      <li>Enabled by setting the third parameter of addEventListener to true</li>
    </ul>
  </li>
  
  <li><strong>Target Phase (Phase 2):</strong>
    <ul>
      <li>Event reaches the target element</li>
      <li>All handlers on the target element are executed</li>
      <li>Order depends on handler registration sequence</li>
    </ul>
  </li>
  
  <li><strong>Bubbling Phase (Phase 3):</strong>
    <ul>
      <li>Event bubbles up from target → target's parent → ... → root element → document → window</li>
      <li>Most commonly used phase</li>
      <li>Default behavior for most events</li>
    </ul>
  </li>
</ol>

<h3>Important Concepts:</h3>
<ul>
  <li><strong>event.target:</strong> The element that triggered the event</li>
  <li><strong>event.currentTarget:</strong> The element handling the event (where the listener is attached)</li>
  <li><strong>event.eventPhase:</strong> Indicates current phase (1: capturing, 2: target, 3: bubbling)</li>
</ul>

<h3>Control Methods:</h3>
<ul>
  <li><strong>event.stopPropagation():</strong>
    <ul>
      <li>Stops event from moving to next element</li>
      <li>Other handlers on current element still execute</li>
    </ul>
  </li>
  <li><strong>event.stopImmediatePropagation():</strong>
    <ul>
      <li>Stops event completely</li>
      <li>Prevents other handlers on same element from executing</li>
    </ul>
  </li>
  <li><strong>event.preventDefault():</strong>
    <ul>
      <li>Prevents default browser behavior</li>
      <li>Doesn't stop propagation</li>
    </ul>
  </li>
</ul>

<h3>Event Delegation Benefits:</h3>
<ul>
  <li>Improved memory efficiency (fewer event listeners)</li>
  <li>Dynamic elements handled automatically</li>
  <li>No need to attach/detach handlers for new elements</li>
  <li>Cleaner and more maintainable code</li>
</ul>`,
    codeExample: `// 1. Basic Event Bubbling and Capturing
document.addEventListener('DOMContentLoaded', () => {
  const parent = document.getElementById('parent');
  const child = document.getElementById('child');
  const grandchild = document.getElementById('grandchild');

  // Capturing phase listeners
  parent.addEventListener('click', e => {
    console.log('Parent Capturing', e.target.id, e.currentTarget.id);
  }, true);

  child.addEventListener('click', e => {
    console.log('Child Capturing', e.target.id, e.currentTarget.id);
  }, true);

  // Bubbling phase listeners
  grandchild.addEventListener('click', e => {
    console.log('Grandchild Bubbling', e.target.id, e.currentTarget.id);
  });

  child.addEventListener('click', e => {
    console.log('Child Bubbling', e.target.id, e.currentTarget.id);
  });

  parent.addEventListener('click', e => {
    console.log('Parent Bubbling', e.target.id, e.currentTarget.id);
  });
});

// 2. Event Delegation Pattern
function setupTodoList() {
  const todoList = document.querySelector('.todo-list');
  
  todoList.addEventListener('click', e => {
    // Handle different actions based on clicked element
    if (e.target.matches('.delete-btn')) {
      e.target.closest('li').remove();
    } else if (e.target.matches('.edit-btn')) {
      const todoItem = e.target.closest('li');
      startEditing(todoItem);
    } else if (e.target.matches('.checkbox')) {
      const todoItem = e.target.closest('li');
      toggleComplete(todoItem);
    }
  });
}

// 3. Stopping Propagation Example
function setupModal() {
  const modal = document.querySelector('.modal');
  const modalContent = modal.querySelector('.modal-content');

  modal.addEventListener('click', e => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });

  modalContent.addEventListener('click', e => {
    e.stopPropagation(); // Prevents clicks inside modal from closing it
  });
}

// 4. Custom Event Bubbling
function createCustomEvent() {
  const customEvent = new CustomEvent('userAction', {
    bubbles: true, // Enable bubbling
    cancelable: true, // Allow preventDefault()
    detail: { // Custom data
      actionType: 'save',
      timestamp: Date.now()
    }
  });

  document.dispatchEvent(customEvent);
}`,
    keyPoints: [
      "Events propagate in three phases: capturing, target, and bubbling",
      "Event delegation improves performance and simplifies dynamic content handling",
      "event.target vs event.currentTarget helps identify event source and handler",
      "stopPropagation() and stopImmediatePropagation() control event flow",
      "preventDefault() stops default browser behavior without affecting propagation",
      "Custom events can leverage the bubbling mechanism",
      "Event delegation reduces memory usage and simplifies maintenance",
      "Capturing phase is useful for specific intercepting scenarios",
      "Understanding event flow is crucial for complex interactive applications",
      "Proper event handling prevents memory leaks and improves performance",
    ],
  },
};

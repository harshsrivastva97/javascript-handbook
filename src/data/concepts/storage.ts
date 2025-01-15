import { ConceptContent } from "../../types/concept";

export const storage: ConceptContent = {
    explanation: `<p>Web Storage APIs provide mechanisms to store data in the browser. The main storage types are localStorage, sessionStorage, and cookies, each with its own use cases and limitations.</p>

<h3>Storage Types:</h3>
<ul>
  <li>localStorage: Persistent storage without expiration</li>
  <li>sessionStorage: Temporary storage for session duration</li>
  <li>Cookies: Small text files with configurable expiration</li>
</ul>`,
    codeExample: `// localStorage
localStorage.setItem('user', 'John');
const user = localStorage.getItem('user');
localStorage.removeItem('user');
localStorage.clear();

// sessionStorage
sessionStorage.setItem('token', '123456');
const token = sessionStorage.getItem('token');
sessionStorage.removeItem('token');
sessionStorage.clear();

// Cookies
document.cookie = "username=John; expires=Thu, 18 Dec 2023 12:00:00 UTC; path=/";
document.cookie = "preferences=dark; max-age=31536000; secure; samesite=strict";

// Storing Objects
const data = { name: 'John', age: 30 };
localStorage.setItem('userData', JSON.stringify(data));
const stored = JSON.parse(localStorage.getItem('userData'));

// Storage Event
window.addEventListener('storage', (e) => {
  console.log('Storage changed:', e.key, e.newValue);
});`,
    keyPoints: [
        "localStorage persists across browser sessions",
        "sessionStorage clears when tab is closed",
        "Cookies can be set with expiration and security flags",
        "Storage is limited by browser quotas",
        "Can only store strings (need JSON for objects)",
        "Storage events fire for cross-tab communication"
    ]
}; 
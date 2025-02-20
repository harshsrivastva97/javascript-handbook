import { ConceptContent } from "../../utils/types/concept";

export const security: ConceptContent = {
  explanation: `<p>JavaScript security involves protecting against common web vulnerabilities like XSS, CSRF, and implementing proper authentication and data validation.</p>

<h3>Security Concerns:</h3>
<ul>
  <li>Cross-Site Scripting (XSS)</li>
  <li>Cross-Site Request Forgery (CSRF)</li>
  <li>Content Security Policy (CSP)</li>
  <li>Secure Data Storage</li>
</ul>`,
  codeExample: `// XSS Prevention
const escapeHTML = (str) => {
  return str.replace(/[&<>"']/g, (match) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  })[match]);
};

// CSRF Token Handling
const csrfToken = document.querySelector('meta[name="csrf-token"]').content;
fetch('/api/data', {
  method: 'POST',
  headers: {
    'CSRF-Token': csrfToken
  },
  body: JSON.stringify(data)
});

// Content Security Policy
// In HTML: <meta http-equiv="Content-Security-Policy" content="default-src 'self'">

// Secure Cookie Settings
document.cookie = 'session=123; Secure; SameSite=Strict; HttpOnly';

// Input Validation
const validateInput = (input) => {
  const pattern = /^[a-zA-Z0-9]+$/;
  if (!pattern.test(input)) {
    throw new Error('Invalid input');
  }
  return input;
};

// Secure Local Storage
const secureStorage = {
  set(key, value) {
    const encrypted = encrypt(JSON.stringify(value));
    localStorage.setItem(key, encrypted);
  },
  get(key) {
    const encrypted = localStorage.getItem(key);
    return encrypted ? JSON.parse(decrypt(encrypted)) : null;
  }
};`,
  keyPoints: [
    "Always sanitize user input",
    "Implement CSRF protection",
    "Use Content Security Policy",
    "Set secure cookie attributes",
    "Encrypt sensitive data",
    "Regular security audits"
  ]
}; 
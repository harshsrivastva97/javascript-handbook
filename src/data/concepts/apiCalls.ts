import { ConceptContent } from "../../types/concept";

export const apiCalls: ConceptContent = {
    explanation: `<p>Modern JavaScript provides multiple ways to make API calls, with fetch being the built-in standard and Axios being a popular alternative.</p>`,
    codeExample: `// Using Fetch API
fetch('https://api.example.com/data')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));`,
    keyPoints: [
        "Fetch is built into modern browsers",
        "Promises handle async operations",
        "Error handling is crucial for API calls",
        "Response needs to be parsed"
    ]
}; 
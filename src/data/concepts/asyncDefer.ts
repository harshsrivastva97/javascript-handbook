import { ConceptContent } from "../../constants/types/concept";

export const asyncDefer: ConceptContent = {
    explanation: `<p>Script loading strategies in JavaScript using async and defer attributes help optimize page load performance.</p>`,
    codeExample: `// Regular script
<script src="script.js"></script>

// Async loading
<script async src="script.js"></script>

// Deferred loading
<script defer src="script.js"></script>`,
    keyPoints: [
        "Async loads scripts asynchronously",
        "Defer loads after HTML parsing",
        "Regular scripts block parsing",
        "Choose based on script dependencies"
    ]
}; 
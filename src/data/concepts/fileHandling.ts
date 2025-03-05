import { ConceptContent } from "../../constants/types/concept";

export const fileHandling: ConceptContent = {
  explanation: `<p>JavaScript provides various APIs for handling files in the browser, including Blob, FileReader, and WebSockets for real-time file operations.</p>

<h3>File APIs:</h3>
<ul>
  <li>File & Blob APIs</li>
  <li>FileReader Interface</li>
  <li>File Upload/Download</li>
  <li>Drag & Drop Operations</li>
</ul>`,
  codeExample: `// File Input Handling
const fileInput = document.querySelector('input[type="file"]');
fileInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  console.log('File name:', file.name);
  console.log('File size:', file.size);
  console.log('File type:', file.type);
});

// FileReader Usage
const reader = new FileReader();
reader.onload = (e) => {
  console.log('File contents:', e.target.result);
};
reader.readAsText(file);

// Blob Creation and Handling
const blob = new Blob(['Hello, World!'], { type: 'text/plain' });
const url = URL.createObjectURL(blob);
const link = document.createElement('a');
link.href = url;
link.download = 'hello.txt';
link.click();

// Drag and Drop
const dropZone = document.getElementById('dropZone');
dropZone.addEventListener('dragover', (e) => {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'copy';
});

dropZone.addEventListener('drop', (e) => {
  e.preventDefault();
  const files = Array.from(e.dataTransfer.files);
  files.forEach(processFile);
});`,
  keyPoints: [
    "FileReader reads file contents asynchronously",
    "Blob represents raw binary data",
    "URL.createObjectURL creates temporary URLs",
    "Support for drag and drop operations",
    "Multiple file upload handling",
    "Progress events for large files"
  ]
}; 
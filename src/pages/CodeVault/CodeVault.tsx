import React, { useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar.tsx";
import CodeEditor from "../../components/CodeEditor/CodeEditor.tsx";
import "./CodeVault.scss";

const defaultJsTemplate = `// Welcome to JavaScript Essentials! 🚀
// Select a topic from the sidebar to get started.

// Example:
const message = "Start coding!";
console.log(message);
`;

const CodeVault: React.FC = () => {
  const [currentCode, setCurrentCode] = useState(defaultJsTemplate);

  const errorScript = (
    fileName: string,
  ) => `// Error loading the script: ${fileName}.js
// Please try again or refresh the page.`;

  const [selectedFileName, setSelectedFileName] = useState("");

  const handleTabSelect = async (fileName: string) => {
    if (!fileName) {
      setCurrentCode(defaultJsTemplate);
      setSelectedFileName("");
      return;
    }

    setSelectedFileName(fileName);

    try {
      const response = await fetch(`/scripts/${fileName}.js`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const code = await response.text();
      setCurrentCode(code);
    } catch (error) {
      console.error("Error loading the script:", error);
      setCurrentCode(errorScript(fileName));
    }
  };

  return (
    <div className="code-vault">
      <Sidebar onTabSelect={handleTabSelect} />
      <main className="code-vault__main">
        <div className="code-vault__content">
          <CodeEditor code={currentCode} selectedFile={selectedFileName} />
        </div>
      </main>
    </div>
  );
};

export default CodeVault;

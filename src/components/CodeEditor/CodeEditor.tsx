import React, { useState, useEffect } from "react";
import { Sandpack } from "@codesandbox/sandpack-react";
import "./CodeEditor.scss";

interface CodeEditorProps {
  code: string;
  selectedFile: string;
}

const defaultHtmlTemplate = `<!DOCTYPE html>
<html>
  <body>
    <div id="app">
      <h2>Welcome to the JS Handbook! 🚀</h2>
      <p>Ready to level up your JavaScript skills? Let's get started!</p>
    </div>
    <script src="index.js"></script>
  </body>
</html>`;

const CodeEditor: React.FC<CodeEditorProps> = ({ code, selectedFile }) => {
  const [currentCode, setCurrentCode] = useState(code);

  useEffect(() => {
    setCurrentCode(code);
  }, [code]);

  const fileOptions = {
    "/index.html": {
      code: defaultHtmlTemplate,
      active: selectedFile === "/index.html",
    },
    "/index.js": {
      code: currentCode,
      active: selectedFile === "/index.js",
    },
  };

  return (
    <div className="code-editor">
      <Sandpack
        files={fileOptions}
        theme="auto"
        template="vanilla"
        options={{
          showConsole: true,
          showConsoleButton: true,
          showLineNumbers: true,
          showTabs: true,
        }}
      />
    </div>
  );
};

export default CodeEditor;

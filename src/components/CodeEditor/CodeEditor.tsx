import React, { useState, useEffect } from "react";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  useSandpack,
  SandpackConsole,
  SandpackFiles
} from "@codesandbox/sandpack-react";
import { useTheme } from "../../contexts/ThemeContext";
import { FaPlay } from "react-icons/fa";
import "./CodeEditor.scss";

interface CodeEditorProps {
  code: string;
  selectedFile: string;
}

const defaultHtmlTemplate = `<!DOCTYPE html>
<html>
  <body>
    <div id="app">
      <h2>Welcome to the JS Handbook!</h2>
      <p>Ready to level up your JavaScript skills? Let's get started!</p>
    </div>
    <script src="index.js"></script>
  </body>
</html>`;

const RunButton = () => {
  const { sandpack } = useSandpack();
  const [isRunning, setIsRunning] = useState(false);

  const handleRun = () => {
    setIsRunning(true);
    try {
      sandpack.runSandpack();
    } catch (error) {
      console.error("Error running code:", error);
    }
    setTimeout(() => setIsRunning(false), 500);
  };

  return (
    <button
      className={`run-button gradient-button ${isRunning ? 'running' : ''}`}
      onClick={handleRun}
      title="Run code"
      disabled={isRunning}
    >
      <FaPlay className="run-icon" />
      {isRunning ? 'Running...' : 'Run'}
    </button>
  );
};

const CodeEditor: React.FC<CodeEditorProps> = ({ code, selectedFile }) => {
  const { theme } = useTheme();
  const [currentCode, setCurrentCode] = useState(code);

  useEffect(() => {
    setCurrentCode(code);
  }, [code]);

  const processedCode = currentCode;

  const files: SandpackFiles = {
    "/index.js": {
      code: processedCode,
      active: true,
    },
    "/index.html": {
      code: defaultHtmlTemplate,
      active: selectedFile === "/index.html",
    }
  };

  return (
    <div className={`code-editor`}>
      <SandpackProvider
        files={files}
        theme={theme === "dark" ? "dark" : "light"}
        template="vanilla"
        options={{
          autorun: false,
          recompileMode: "immediate",
          recompileDelay: 300
        }}
        customSetup={{
          entry: "/index.js",
          dependencies: {
            "lodash": "^4.17.21"
          }
        }}
      >
        <div className="code-editor__header">
          <RunButton />
        </div>
          <SandpackLayout>
            <SandpackCodeEditor
              showTabs={true}
              showLineNumbers={true}
              showInlineErrors={true}
              wrapContent={true}
            />
            <SandpackPreview showRefreshButton={true} />
            <SandpackConsole
              showHeader={true}
              maxMessageCount={100}
            />
          </SandpackLayout>
      </SandpackProvider>
    </div>
  );
};

export default CodeEditor;

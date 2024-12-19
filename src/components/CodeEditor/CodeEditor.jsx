import Editor from "@monaco-editor/react";
import { useState } from "react";
import "./CodeEditor.scss";

function CodeEditor({ initialCode = "", onCodeChange }) {
  const [code, setCode] = useState(initialCode);
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [isRunning, setIsRunning] = useState(false);

  const handleEditorChange = (value) => {
    setCode(value);
    if (onCodeChange) {
      onCodeChange(value);
    }
  };

  const handleRunCode = async () => {
    try {
      setIsRunning(true);
      setError("");
      setOutput("");

      // Capture console.log output
      const originalConsoleLog = console.log;
      let outputString = "";

      console.log = (...args) => {
        outputString +=
          args
            .map((arg) =>
              typeof arg === "object" ? JSON.stringify(arg, null, 2) : arg,
            )
            .join(" ") + "\n";
        originalConsoleLog(...args); // Ensure logs also appear in the browser console
      };

      // Wrap code execution to capture async outputs
      const executeCode = async () => {
        const asyncWrapper = new Function(
          `
          return (async () => {
            ${code}
          })();
          `,
        );
        await asyncWrapper();
      };

      await executeCode();

      // Restore console.log and set the output
      console.log = originalConsoleLog;
      setOutput(outputString.trim());
    } catch (err) {
      setError(err.toString());
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="code-editor">
      <div className="code-editor__header">
        <div className="code-editor__title">
          <span className="code-editor__title-icon">⚡</span>
          <div className="code-editor__title-text">
            <h2>Code Editor</h2>
            <p>JavaScript Playground</p>
          </div>
        </div>
        <button
          className={`code-editor__run-btn ${isRunning ? "running" : ""}`}
          onClick={handleRunCode}
          disabled={isRunning}
        >
          {isRunning ? (
            <>
              <span className="spinner"></span>
              <span>Running</span>
            </>
          ) : (
            <>
              <span className="run-icon">▶</span>
              <span className="ml-2">Run</span>
            </>
          )}
        </button>
      </div>
      <div className="code-editor__container">
        <div className="code-editor__main">
          <Editor
            height="100%"
            defaultLanguage="javascript"
            theme="vs-dark"
            value={code}
            onChange={handleEditorChange}
            options={{
              minimap: { enabled: false },
              fontSize: 14,
              padding: { top: 16 },
              scrollBeyondLastLine: false,
              lineNumbers: "on",
              roundedSelection: false,
              automaticLayout: true,
              fontFamily: "'Fira Code', monospace",
              fontLigatures: true,
              renderLineHighlight: "all",
              cursorStyle: "line",
              cursorWidth: 2,
              scrollbar: {
                vertical: "visible",
                horizontal: "visible",
                verticalScrollbarSize: 12,
                horizontalScrollbarSize: 12,
              },
            }}
          />
        </div>

        {(output || error) && (
          <div className="code-editor__output">
            <div className="output-header">
              <div className="output-title">
                <span className="output-icon">{error ? "⚠️" : "📤"}</span>
                <span>{error ? "Error Console" : "Output Console"}</span>
              </div>
              <div className="output-actions">
                <button
                  className="output-action-btn"
                  onClick={() => {
                    setOutput("");
                    setError("");
                  }}
                  title="Clear output"
                >
                  <span className="action-icon">✕</span>
                </button>
              </div>
            </div>
            <div className="output-content">
              {error ? (
                <pre className="code-editor__error">{error}</pre>
              ) : (
                <pre className="code-editor__result">{output}</pre>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CodeEditor;

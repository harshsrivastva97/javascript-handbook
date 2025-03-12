import React, { useState, useEffect } from "react";
import {
  SandpackProvider,
  SandpackCodeEditor,
  SandpackPreview,
  useSandpack,
  SandpackConsole,
  SandpackFiles
} from "@codesandbox/sandpack-react";
import { useTheme } from "../../contexts/ThemeContext";
import { FaPlay } from "react-icons/fa";
import { MdChevronRight, MdChevronLeft } from "react-icons/md";
import { VscTerminal, VscChevronDown, VscChevronUp, VscWindow } from "react-icons/vsc";
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

// Create a context to share console visibility state
const VisibilityContext = React.createContext<{
  isPreviewVisible: boolean;
  setIsPreviewVisible: React.Dispatch<React.SetStateAction<boolean>>;
  isConsoleVisible: boolean;
  setIsConsoleVisible: React.Dispatch<React.SetStateAction<boolean>>;
} | null>(null);

const RunButton = () => {
  const { sandpack } = useSandpack();
  const [isRunning, setIsRunning] = useState(false);

  // Get visibility context
  const visibilityContext = React.useContext(VisibilityContext);

  const handleRun = () => {
    setIsRunning(true);
    try {
      sandpack.runSandpack();
      // Show preview panel when running code
      if (visibilityContext) {
        // Always show the preview when running code
        if (!visibilityContext.isPreviewVisible) {
          visibilityContext.setIsPreviewVisible(true);
        }
        // Ensure console is also visible
        if (!visibilityContext.isConsoleVisible) {
          visibilityContext.setIsConsoleVisible(true);
        }
      }
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

// Toggle bar component for preview section
const PreviewToggleBar = ({ isVisible, onToggle }: { isVisible: boolean; onToggle: () => void }) => (
  <div
    className={`code-editor__preview-toggle ${isVisible ? 'as-header' : 'as-footer'}`}
    onClick={onToggle}
  >
    <div className="toggle-content">
      <VscWindow className="toggle-icon" />
      <span>{isVisible ? 'Preview' : 'Show Preview'}</span>
      {isVisible ? <VscChevronDown className="chevron-icon" /> : <VscChevronUp className="chevron-icon" />}
    </div>
  </div>
);

// Toggle bar component for console section
const ConsoleToggleBar = ({ isVisible, onToggle }: { isVisible: boolean; onToggle: () => void }) => (
  <div
    className={`code-editor__console-toggle ${isVisible ? 'as-header' : 'as-footer'}`}
    onClick={onToggle}
  >
    <div className="toggle-content">
      <VscTerminal className="toggle-icon" />
      <span>{isVisible ? 'Console' : 'Show Console'}</span>
      {isVisible ? <VscChevronDown className="chevron-icon" /> : <VscChevronUp className="chevron-icon" />}
    </div>
  </div>
);

const CodeEditor: React.FC<CodeEditorProps> = ({ code, selectedFile }) => {
  const { theme } = useTheme();
  const [currentCode, setCurrentCode] = useState(code);
  // Always keep right panel visible
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const [isConsoleVisible, setIsConsoleVisible] = useState(true);

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

  const togglePreviewVisibility = () => {
    setIsPreviewVisible(prev => !prev);
  };

  const toggleConsoleVisibility = () => {
    setIsConsoleVisible(prev => !prev);
  };

  // Add appropriate classes based on visibility states
  const rightPanelClasses = `
    code-editor__right-pane 
    ${!isPreviewVisible ? 'preview-hidden' : ''} 
    ${!isConsoleVisible ? 'console-hidden' : ''}
  `;

  return (
    <div className="code-editor">
      <VisibilityContext.Provider value={{
        isPreviewVisible,
        setIsPreviewVisible,
        isConsoleVisible,
        setIsConsoleVisible
      }}>
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
          style={{height: "100%"}}
        >
          <div className="code-editor__header">
            <div className="header-left">
              <RunButton />
            </div>
            <div className="header-right">
              {/* Right panel toggle button removed */}
            </div>
          </div>
          <div className="code-editor__content">
            <div className="code-editor__editor-pane">
              <SandpackCodeEditor
                showTabs={true}
                showLineNumbers={true}
                showInlineErrors={true}
                wrapContent={true}
                style={{height: "100%"}}
              />
            </div>

            <div className={rightPanelClasses}>
              {/* Preview section with toggle */}
              {isPreviewVisible ? (
                <div className="code-editor__preview">
                  <PreviewToggleBar isVisible={true} onToggle={togglePreviewVisibility} />
                  <div className="preview-content">
                    <SandpackPreview showRefreshButton={true} style={{height: "100%"}} />
                  </div>
                </div>
              ) : (
                <PreviewToggleBar isVisible={false} onToggle={togglePreviewVisibility} />
              )}

              {/* Console section with toggle */}
              {isConsoleVisible ? (
                <div className="code-editor__console">
                  <ConsoleToggleBar isVisible={true} onToggle={toggleConsoleVisibility} />
                  <div className="console-content">
                    <SandpackConsole
                      showHeader={false}
                      maxMessageCount={100}
                    />
                  </div>
                </div>
              ) : (
                <ConsoleToggleBar isVisible={false} onToggle={toggleConsoleVisibility} />
              )}
            </div>
          </div>
        </SandpackProvider>
      </VisibilityContext.Provider>
    </div>
  );
};

export default CodeEditor;

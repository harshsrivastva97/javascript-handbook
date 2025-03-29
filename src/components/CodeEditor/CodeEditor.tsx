import React, { useState, useEffect, useMemo } from "react";
import {
  SandpackProvider,
  SandpackCodeEditor,
  SandpackPreview,
  useSandpack,
  SandpackConsole,
  SandpackFiles,
  useActiveCode
} from "@codesandbox/sandpack-react";
import { useTheme } from "../../contexts/ThemeContext";
import { FaPlay } from "react-icons/fa";
import { VscTerminal, VscChevronDown, VscChevronUp, VscWindow } from "react-icons/vsc";
import { defaultHtmlTemplate } from "../../constants/consts";
import "./CodeEditor.scss";

interface CodeEditorProps {
  code: string;
}

const VisibilityContext = React.createContext<{
  isPreviewVisible: boolean;
  setIsPreviewVisible: React.Dispatch<React.SetStateAction<boolean>>;
  isConsoleVisible: boolean;
  setIsConsoleVisible: React.Dispatch<React.SetStateAction<boolean>>;
} | null>(null);

const RunButton = () => {
  const { sandpack } = useSandpack();
  const [isRunning, setIsRunning] = useState(false);

  const visibilityContext = React.useContext(VisibilityContext);

  const handleRun = () => {
    setIsRunning(true);
    try {
      sandpack.runSandpack();
      if (visibilityContext) {
        if (!visibilityContext.isPreviewVisible) {
          visibilityContext.setIsPreviewVisible(true);
        }
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

const PreviewToggleBar = ({ isVisible, onToggle }: { isVisible: boolean; onToggle: () => void }) => (
  <div
    className={`code-editor__preview-toggle ${isVisible ? 'as-header' : 'as-footer'}`}
    onClick={onToggle}
  >
    <div className="toggle-content">
      <VscWindow className="toggle-icon" />
      <span>{isVisible ? 'Preview' : 'Show Preview'}</span>
      {isVisible ? <VscChevronUp className="chevron-icon" /> : <VscChevronDown className="chevron-icon" />}
    </div>
  </div>
);

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

const CodeListener = ({ onCodeChange, onHtmlChange }: { 
  onCodeChange: (code: string) => void,
  onHtmlChange: (html: string) => void 
}) => {
  const { code } = useActiveCode();
  const { sandpack } = useSandpack();
  
  useEffect(() => {
    const activeFile = sandpack.activeFile;
    if (activeFile === "/index.js") {
      onCodeChange(code);
    } else if (activeFile === "/index.html") {
      onHtmlChange(code);
    }
  }, [code, sandpack.activeFile, onCodeChange, onHtmlChange]);
  
  return null;
};

const CodeEditor: React.FC<CodeEditorProps> = ({ code }) => {
  const { theme } = useTheme();
  const [currentCode, setCurrentCode] = useState(code);
  const [activeHtmlCode, setActiveHtmlCode] = useState(defaultHtmlTemplate);

  const [isPreviewVisible, setIsPreviewVisible] = useState(true);
  const [isConsoleVisible, setIsConsoleVisible] = useState(true);

  useEffect(() => {
    setCurrentCode(code);
  }, [code]);

  const handleCodeChange = (newCode: string) => {
    setCurrentCode(newCode);
  };
  
  const handleHtmlChange = (newHtml: string) => {
    setActiveHtmlCode(newHtml);
  };

  const files: SandpackFiles = useMemo(() => ({
    "/index.js": {
      code: currentCode,
      active: true,
    },
    "/index.html": {
      code: activeHtmlCode,
      active: false,
    }
  }), [currentCode, activeHtmlCode]);

  const togglePreviewVisibility = () => {
    setIsPreviewVisible(prev => !prev);
  };

  const toggleConsoleVisibility = () => {
    setIsConsoleVisible(prev => !prev);
  };

  const visibilityContextValue = useMemo(() => ({
    isPreviewVisible,
    setIsPreviewVisible,
    isConsoleVisible,
    setIsConsoleVisible
  }), [isPreviewVisible, isConsoleVisible]);

  const rightPanelClasses = `
    code-editor__right-pane 
    ${!isPreviewVisible ? 'preview-hidden' : ''} 
    ${!isConsoleVisible ? 'console-hidden' : ''}
  `;

  return (
    <div className="code-editor">
      <VisibilityContext.Provider value={visibilityContextValue}>
        <SandpackProvider
          files={files}
          theme={theme === "dark" ? "dark" : "light"}
          template="vanilla"
          options={{
            autorun: false,
            recompileMode: "delayed",
            recompileDelay: 500
          }}
          customSetup={{
            entry: "/index.js",
            dependencies: {
              "lodash": "^4.17.21"
            }
          }}
          style={{height: "100%"}}
        >
          <CodeListener 
            onCodeChange={handleCodeChange} 
            onHtmlChange={handleHtmlChange} 
          />

          <div className="code-editor__header">
            <div className="header-left">
              <RunButton />
            </div>
            <div className="header-right">
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

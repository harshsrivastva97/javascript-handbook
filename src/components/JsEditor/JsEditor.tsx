import React, { useState, useEffect } from "react";
import {
    SandpackProvider,
    SandpackCodeEditor,
    useSandpack,
    SandpackConsole,
    SandpackFiles,
    SandpackLayout,
    SandpackPreview
} from "@codesandbox/sandpack-react";
import { useTheme } from "../../contexts/ThemeContext";
import { FaPlay } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { VscTerminal, VscChevronDown, VscChevronUp } from "react-icons/vsc";
import "./JsEditor.scss";

interface JsEditorProps {
    code: string;
    onClose?: () => void;
}

// Create a context to share console visibility state
const ConsoleVisibilityContext = React.createContext<{
    isConsoleVisible: boolean;
    setIsConsoleVisible: React.Dispatch<React.SetStateAction<boolean>>;
} | null>(null);

const RunButton = () => {
    const { sandpack } = useSandpack();
    const [isRunning, setIsRunning] = useState(false);
    
    // Parent component reference for accessing isConsoleVisible state
    const parentContext = React.useContext(ConsoleVisibilityContext);
    
    const handleRun = () => {
        setIsRunning(true);
        try {
            sandpack.runSandpack();
            // Show console when code is run
            if (parentContext && !parentContext.isConsoleVisible) {
                parentContext.setIsConsoleVisible(true);
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

// Console toggle component to be used in multiple places
const ConsoleToggleBar = ({ isVisible, onToggle }: { isVisible: boolean; onToggle: () => void }) => (
    <div 
        className={`code-editor__console-toggle ${isVisible ? 'as-header' : 'as-footer'}`}
        onClick={onToggle}
    >
        <div className="console-toggle-content">
            <VscTerminal className="console-icon" />
            <span>{isVisible ? 'Console Output' : 'Console'}</span>
            {isVisible ? <VscChevronDown className="chevron-icon" /> : <VscChevronUp className="chevron-icon" />}
        </div>
    </div>
);

const JsEditor: React.FC<JsEditorProps> = ({ code, onClose }) => {
    const { theme } = useTheme();
    const [currentCode, setCurrentCode] = useState(code);
    const [isConsoleVisible, setIsConsoleVisible] = useState(false);

    useEffect(() => {
        setCurrentCode(code);
    }, [code]);

    const files: SandpackFiles = {
        "/index.js": {
            code: currentCode,
            active: true,
        }
    };

    const toggleConsoleVisibility = () => {
        setIsConsoleVisible(prev => !prev);
    };

    return (
        <div className={`code-editor ${isConsoleVisible ? 'console-visible' : 'console-hidden'}`}>
            <ConsoleVisibilityContext.Provider value={{ isConsoleVisible, setIsConsoleVisible }}>
                <SandpackProvider
                    files={files}
                    theme={theme === "dark" ? "dark" : "light"}
                    template="vanilla"
                    options={{
                        autorun: false,
                        recompileMode: "delayed",
                        recompileDelay: 1000
                    }}
                    customSetup={{
                        entry: "/index.js",
                        dependencies: { lodash: "^4.17.21" },
                    }}
                >
                    {/* Editor Header with Run Button */}
                    <div className="code-editor__header">
                        <RunButton />
                        {onClose && (
                            <button className="close-button" onClick={onClose} title="Close editor">
                                <IoMdClose className="close-icon" />
                            </button>
                        )}
                    </div>

                    {/* Editor Content Area */}
                    <div className="sp-wrapper">
                        <SandpackLayout className={`flex flex-col ${isConsoleVisible ? 'with-console' : 'no-console'}`}>
                            <SandpackCodeEditor
                                showTabs={false}
                                showLineNumbers={true}
                                showInlineErrors={true}
                                wrapContent={true}
                            />
                            <SandpackPreview style={{display: "none"}} />
                            
                            {isConsoleVisible && (
                                <div className="code-editor__console">
                                    {/* Console Header is the toggle bar when console is visible */}
                                    <ConsoleToggleBar isVisible={true} onToggle={toggleConsoleVisibility} />
                                    <div className="console-content">
                                        <SandpackConsole showHeader={false} maxMessageCount={100} />
                                    </div>
                                </div>
                            )}
                        </SandpackLayout>
                        
                        {/* Render the toggle bar at the bottom only when console is hidden */}
                        {!isConsoleVisible && (
                            <ConsoleToggleBar isVisible={false} onToggle={toggleConsoleVisibility} />
                        )}
                    </div>
                </SandpackProvider>
            </ConsoleVisibilityContext.Provider>
        </div>
    );
};

export default JsEditor;

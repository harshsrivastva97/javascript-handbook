import { useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar.jsx";
import CodeEditor from "../../components/CodeEditor/CodeEditor.jsx";
import "./Home.scss";

function Home() {
  const [currentCode, setCurrentCode] = useState(
    `// Welcome to JavaScript Essentials! 🚀
// Select a topic from the sidebar to get started.

// Example:
const message = "Hello, JavaScript!";
console.log(message);`,
  );

  const handleTabSelect = async (fileName) => {
    try {
      const response = await fetch(`./scripts/${fileName}.js`);
      if (!response.ok) throw new Error("Failed to load the script");

      const code = await response.text();
      setCurrentCode(code);
    } catch (error) {
      console.error("Error loading the script:", error);
      setCurrentCode(`// Error loading the script. Please try again.
// If the problem persists, please refresh the page.`);
    }
  };

  return (
    <div className="home">
      <Sidebar onTabSelect={handleTabSelect} />
      <main className="home__main">
        <div className="home__content">
          <CodeEditor initialCode={currentCode} key={currentCode} />
        </div>
      </main>
    </div>
  );
}

export default Home;

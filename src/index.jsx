import React from "react";
import ReactDOM from "react-dom/client";

// Components
import App from "./App.tsx";

// Styles
import "./index.css";

const renderApp = () => {
  try {
    const container = document.getElementById("root");

    if (!container) {
      throw new Error("Root element not found");
    }

    const root = ReactDOM.createRoot(container);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>,
    );
  } catch (error) {
    console.error("Failed to render app:", error);
  }
};

renderApp();

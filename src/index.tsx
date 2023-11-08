//index.tsx
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";


ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals(console.log);
function reportWebVitals(log: { (...data: any[]): void; (message?: any, ...optionalParams: any[]): void; }) {
  throw new Error("Function not implemented.");
}


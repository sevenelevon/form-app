import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { NextStepProvider } from "./context/NextStep";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <NextStepProvider>
    <App />
  </NextStepProvider>
);

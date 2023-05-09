import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ServicesContextProvider } from "./context/context";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ServicesContextProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ServicesContextProvider>
);

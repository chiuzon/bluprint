import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";
import reportWebVitals from "./reportWebVitals";

import "normalize.css/normalize.css";
import "./index.css";

import "@playcanvas/pcui/dist/variables.scss";
import "@playcanvas/pcui/dist/fonts.scss";
import "@playcanvas/pcui/dist/pcui-theme-grey.scss";
import "@playcanvas/pcui/dist/theme-colors-grey.scss";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

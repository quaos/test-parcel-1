import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

import "./styles/index.css";

console.log("index.tsx line 7");

if (module.hot) {
  module.hot.accept();
}

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(<App />, document.getElementById("app")!);
  console.log("index.tsx line 15");
});

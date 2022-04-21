import App from "./App";

import "./index.css";

console.log("index.ts line 5");

if (module.hot) {
  module.hot.accept();
}

document.addEventListener("DOMContentLoaded", () => {
  const elements = {
    appRoot: document.getElementById("app"),
  };

  elements.appRoot!.appendChild(App({}));

  console.log("index.ts line 22");
});

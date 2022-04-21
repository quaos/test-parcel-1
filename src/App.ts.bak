import Header from "./components/Header";
import assets from "./context/Assets";
import { getData } from "./services/data";

import "./index.css";

console.log("App.ts line 7");

export interface AppProps {}

export default function App({}: AppProps) {
  const elements = {
    app: document.createElement("section"),
    loader: document.createElement("h2"),
    image: document.createElement("img"),
    message: document.createElement("p"),
  };

  elements.app.classList.add("main");

  elements.loader.appendChild(document.createTextNode("Loading..."));
  elements.app.appendChild(elements.loader);

  (async function () {
    console.log("App.ts line 25 (async)");

    await new Promise((resolve) =>
      setTimeout(() => {
        console.log("App.ts line 29 (async)");
        elements.image.src = assets.parcelIcon;
        elements.image.alt = "Logo image";

        console.log("App.ts line 33 (async)");

        resolve(true);
      }, 1000)
    );
    console.log("App.ts line 38 (async)");

    const { message } = await getData();
    elements.message.appendChild(document.createTextNode(message));
    console.log("App.ts line 42 (async)");

    elements.app.removeChild(elements.loader);
    elements.app.appendChild(Header({}));
    elements.app.appendChild(elements.image);
    elements.app.appendChild(elements.message);

    console.log("App.ts line 49 (async)");
  })();

  console.log("App.ts line 52");

  return elements.app;
}

import React, { useContext, useEffect, useMemo, useState } from "react";
import { unstable_batchedUpdates } from "react-dom";

import Header from "./components/Header";
import HomePage from "./components/pages/HomePage";
import TodosPage from "./components/pages/TodosPage";
import AssetsContext, { AssetsContextProvider } from "./context/Assets";
import useDelay from "./hooks/useDelay";

import "./styles/tabs.css";

console.log("App.tsx line 12");

export interface AppProps {}

export default function App(props: AppProps) {
  const layoutProps = { ...props };
  Object.assign(layoutProps, {
    className: "main",
  });

  return (
    <AssetsContextProvider>
      <AppMainLayout {...layoutProps} />
    </AssetsContextProvider>
  );
}

export interface AppMainLayoutProps extends AppProps {
  className?: string;
}

function AppMainLayout({ className = "" }: AppMainLayoutProps) {
  const { parcelIcon } = useContext(AssetsContext);

  console.log("App.tsx line 47");

  const [loading, setLoading] = useState(false);

  const [loadingDelay, cancelLoading] = useDelay(3000);

  useEffect(() => {
    setLoading(true);

    console.log("App.tsx line 60");

    (async function () {
      console.log("App.tsx line 64 (async)");

      await loadingDelay;
      // console.log("App.tsx line 45 (async)");

      unstable_batchedUpdates(() => {
        console.log("App.tsx line 71 (async)");
        setLoading(false);
      });
    })();

    // cleanup
    return () => {
      console.log("App.tsx unmounted");
      cancelLoading();
    };
  }, []);

  // console.log("App.tsx line 67");

  return (
    <section className={className}>
      <Header />
      {loading ? (
        <p className="loading">Loading...</p>
      ) : (
        <TabsLayout
          labels={["Home", "Todos"]}
          renderers={[
            // Home
            () => <HomePage />,
            // Todos
            () => <TodosPage />,
          ]}
          defaultTabIndex={0}
        />
      )}
    </section>
  );
}

interface TabsLayoutProps extends AppMainLayoutProps {
  labels: string[];
  renderers: (() => React.ReactNode)[];
  defaultTabIndex?: number;
}

function TabsLayout({ labels, renderers, defaultTabIndex = -1 }: TabsLayoutProps) {
  const [activeIdx, setActiveIdx] = useState(defaultTabIndex);

  const tabBody = useMemo(() => (activeIdx >= 0 ? renderers[activeIdx]() : null), [activeIdx]);

  return (
    <div className="tabs">
      <ul className="tabs-head">
        {labels.map((label, tabIdx) => (
          <li
            key={label}
            className={`${tabIdx === activeIdx ? "active" : ""}`}
            onClick={() => setActiveIdx(tabIdx)}
          >
            {label}
          </li>
        ))}
        <li className="remaining-space"> </li>
      </ul>
      <div className="tabs-body">{tabBody}</div>
    </div>
  );
}

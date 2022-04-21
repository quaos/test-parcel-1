import React, { useContext, useEffect, useRef, useState } from "react";
import { unstable_batchedUpdates } from "react-dom";

import Header from "./components/Header";
import AssetsContext, { AssetsContextProvider } from "./context/Assets";
import { getData } from "./services/data";

import "./index.css";

console.log("App.tsx line 10");

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

  console.log("App.tsx line 27");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | undefined>();

  const delayRef = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    setLoading(true);

    (async function () {
      console.log("App.tsx line 36 (async)");

      await new Promise(
        (resolve) =>
          (delayRef.current = setTimeout(() => {
            console.log("App.tsx line 41 (async)");
            delayRef.current = undefined;
            resolve(true);
          }, 3000))
      );
      // console.log("App.tsx line 45 (async)");

      const { message } = await getData();
      // console.log("App.tsx line 48 (async)");

      unstable_batchedUpdates(() => {
        console.log("App.tsx line 52 (async)");
        setLoading(false);
        setMessage(message);
      });
    })();

    // cleanup
    return () => {
      (async function () {
        console.log("App.tsx line 61 (async)");
        delayRef.current && clearTimeout(delayRef.current);
        delayRef.current = undefined;
      })();
    };
  }, []);

  // console.log("App.tsx line 67");

  return (
    <section className={className}>
      <Header />
      {loading ? (
        <p className="loading">Loading...</p>
      ) : (
        <>
          <img src={parcelIcon as any} alt="Logo Image" />
          <p>{message}</p>
        </>
      )}
    </section>
  );
}

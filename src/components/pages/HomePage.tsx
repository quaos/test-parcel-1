import React, { useContext, useState, useMemo, useRef, useEffect } from "react";
import AssetsContext from "~src/context/Assets";
import { TodosContextProvider } from "~src/context/Todos";
import MessagesService from "~src/services/messages";
import TodosList from "../TodosList";

export interface HomePageProps {}

export default function HomePage({}: HomePageProps) {
  const { parcelIcon } = useContext(AssetsContext);

  const [message, setMessage] = useState<string | undefined>();

  const messagesSvc = useMemo(() => new MessagesService(), []);

  const msgSubsIdRef = useRef<number>();

  useEffect(() => {
    msgSubsIdRef.current = messagesSvc.subscribe((evt) => setMessage(evt.message));

    // cleanup
    return () => {
      console.log("HomePage.tsx unmounted");
      msgSubsIdRef.current && messagesSvc.unsubscribe(msgSubsIdRef.current);
      msgSubsIdRef.current = undefined;
    };
  }, []);

  // console.log("App.tsx line 67");

  return (
    <div className={`page`}>
      <img src={parcelIcon as any} alt="Logo Image" />
      <p>{message}</p>
    </div>
  );
}

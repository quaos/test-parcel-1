import React, { useEffect } from "react";
import { TodosContextProvider } from "~src/context/Todos";
import TodosList from "../TodosList";

export interface TodosPageProps {}

export default function TodosPage({}: TodosPageProps) {
  useEffect(() => {
    // cleanup
    return () => {
      console.log("TodosPage.tsx unmounted");
    };
  }, []);

  // console.log("App.tsx line 67");

  return (
    <div className={`page`}>
      <TodosContextProvider>
        <TodosList />
      </TodosContextProvider>
    </div>
  );
}

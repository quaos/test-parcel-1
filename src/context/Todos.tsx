import React, { createContext, Dispatch, useEffect, useReducer } from "react";

import useDelay from "~src/hooks/useDelay";
import TodosReducer, { Action, createLoadAction, initialState, State } from "~src/reducers/todos";
import { getData } from "~src/services/data";

export interface TodosContextProps {
  state: State;
  dispatch: Dispatch<Action>;
}

const TodosContext = createContext<TodosContextProps | undefined>(undefined);
TodosContext.displayName = "TodosContext";
export default TodosContext;

export interface TodosContextProviderProps {}

export function TodosContextProvider({
  children,
}: React.PropsWithChildren<TodosContextProviderProps>) {
  const [state, dispatch] = useReducer(TodosReducer, initialState);

  const [loadingDelay, cancelLoading] = useDelay(1000);

  useEffect(() => {
    (async function () {
      await loadingDelay;

      // Ref.: ~src/types/todo.d.ts
      const _todoItems = await getData();
      dispatch(createLoadAction(_todoItems));
    })();

    // cleanup
    return () => {
      console.log("TodosContextProvider unmounted");
      cancelLoading();
    };
  }, []);

  return <TodosContext.Provider value={{ state, dispatch }}>{children}</TodosContext.Provider>;
}

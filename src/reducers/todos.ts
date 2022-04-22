import TodoItem from "~src/types/todo";

export interface State {
  loading: boolean;
  todoItems: TodoItem[];
  // todoItemsMap: Record<number, TodoItem>;
}

export const initialState: State = { loading: true, todoItems: [] };

export interface LoadAction {
  type: "LOAD";
  payload: TodoItem[];
}

export const createLoadAction = (items: TodoItem[]) =>
  ({
    type: "LOAD",
    payload: items,
  } as LoadAction);

export interface UpdateAction {
  type: "UPDATE";
  payload: TodoItem;
}

export const createUpdateAction = (item: TodoItem) =>
  ({
    type: "UPDATE",
    payload: item,
  } as UpdateAction);

export type Action = LoadAction | UpdateAction;

export default function TodosReducer(state: State, action: Action) {
  console.log("TodosReducer:", action);
  switch (action.type) {
    case "LOAD": {
      const _items = action.payload;
      // const _itemsMap = _items.reduce((m, item) => ({
      //     ...m,
      //     [item.id]: item,
      // }), {});
      return {
        ...state,
        loading: false,
        todoItems: _items,
        // todoItemsMap: _itemsMap,
      };
    }
    case "UPDATE": {
      const _item = { ...action.payload };
      const _items = state.todoItems.map((item) => {
        if (item.id === _item.id) {
          return _item;
        }

        return item;
      });
      return {
        ...state,
        loading: false,
        todoItems: _items,
        // todoItemsMap: _itemsMap,
      };
    }
    default:
      return state;
  }
}

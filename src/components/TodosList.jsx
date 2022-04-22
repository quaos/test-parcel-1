import React from "react";

import TodosContext from "~src/context/Todos";
import { useContextSafely } from "~src/hooks/useContextSafely";
import { createUpdateAction } from "~src/reducers/todos";

import "./TodosList.css";

// Emulates legacy JSX component

export default function TodosList(props) {
    const { state: todosState, dispatch: dispatchTodos } = useContextSafely(TodosContext);
    const { loading, todoItems: items } = todosState;

    const { className = "" } = props;

    function handleToggleDone(item, evt) {
        console.log("handleTooggleDone:", evt);
        const _item = {
            ...item,
            isDone: evt.target.checked,
        }
        if (_item.isDone) {
            _item.doneAt = new Date();
        } else {
            _item.doneAt = undefined;
        }
        dispatchTodos(createUpdateAction(_item));
    }

    return (
        <div className={`todo-list-wrapper ${className}`}>
            <h2>TODOs</h2>
            <ul className="todo-list">
              {loading ? (
                <li>Loading...</li>
              ) : items.map((item) => (
                <li key={item.id}>
                  <input type="checkbox" name="done" value={item.id} checked={item.isDone} onChange={(evt) => handleToggleDone(item, evt)} />
                  <span>{item.title}</span>
                  {item.isDone && <span className="date">({item.doneAt.toLocaleDateString()})</span>}
                </li>
              ))}
            </ul>
          </div>
    )
}

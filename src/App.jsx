import { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import "./styles.css";

const getLocalStorageItems = () => {
  const todoList = JSON.parse(localStorage.getItem("todo"));
  if (todoList !== null && todoList.length > 0) {
    return [...todoList];
  } else {
    return [];
  }
};

function App() {
  const [todoText, setTodoText] = useState("");
  const [currentId, setCurremtId] = useState("");
  const [todos, setTodos] = useState(getLocalStorageItems());
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const inputRef = useRef();

  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(todos));
    setTotalPages(Math.round(todos.length / 2));
  }, [todos, totalPages]);

  // handle input text changes
  const onInputChange = (e) => {
    e.preventDefault();
    setTodoText(e.target.value);
  };

  // handle submit event
  const onInputSubmit = (e) => {
    if (e.keyCode === 13 && currentId && currentId.length === 36) {
      const updatedTodos = todos.map((t) =>
        t.id === currentId
          ? { id: t.id, todo: todoText }
          : { id: t.id, todo: t.todo }
      );
      setTodos(updatedTodos);
      setCurremtId("");
      setTodoText("");
      return;
    }
    if (e.keyCode === 13 && todoText !== "") {
      setTodos([...todos, { id: uuidv4(), todo: todoText }]);
      setTodoText("");
    }
  };

  // handle edit
  const onEditTodo = (id) => {
    const edited = todos.find((et) => et.id === id);
    inputRef.current.focus();
    setTodoText(edited.todo);
    setCurremtId(id);
  };

  // handle delete
  const onDelete = (id) => {
    if (id !== undefined) {
      const remaining = todos.filter((to) => to.id !== id);
      setTodos([...remaining]);
      setTotalPages(Math.floor(todos.length / 2));
      if (totalPages <= page) {
        setPage(totalPages - 1);
      }
    }
  };

  //handle delete all
  const onDeleteAll = (e) => {
    e.preventDefault();
    setTodoText("");
    setTodos([]);
  };

  // handle current page
  const selectPageHandler = (selectedPage) => {
    if (
      selectedPage > 0 &&
      selectedPage <= totalPages &&
      selectedPage !== page
    ) {
      setPage(selectedPage);
    }
  };

  return (
    <div className="App">
      <h2>Hello</h2>

      <h2>Start adding todos to make some magic happen!</h2>
      <div className="Inputs">
        <input
          className="ToDo_Input"
          type={"text"}
          placeholder={"Add your todo"}
          autoComplete={"off"}
          value={todoText}
          onChange={onInputChange}
          onKeyDown={onInputSubmit}
          ref={inputRef}
          autoFocus={true}
        />
      </div>
      <div className="todos">
        {todos.slice(page * 2 - 2, page * 2).map(({ id, todo }) => {
          return (
            <div className="todoItems" key={id}>
              <div className="todo">
                <span className="todoValue">{todo}</span>
              </div>
              <div className="options">
                <span
                  className="edit"
                  onClick={() => onEditTodo(id)}
                  role="img"
                  aria-label="pen"
                >
                  🖋️
                </span>
                <span
                  className="delete"
                  onClick={() => onDelete(id)}
                  role="img"
                  aria-label="bin"
                >
                  🗑️
                </span>
              </div>
            </div>
          );
        })}
      </div>
      <button className="clearAll" type="reset" onClick={onDeleteAll}>
        Clear All
      </button>
      <div>
        {todos.length > 2 && (
          <div className="pagination">
            <span
              className={page > 1 ? "" : "button_disabled"}
              role="img"
              aria-label="left"
              onClick={() => selectPageHandler(page - 1)}
            >
              ⬅️
            </span>
            {[...Array(Math.round(todos.length / 2))].map((_, i) => {
              return (
                <span
                  key={i}
                  onClick={() => selectPageHandler(i + 1)}
                  className={page === i + 1 ? "page_selected" : ""}
                >
                  {i + 1}
                </span>
              );
            })}
            <span
              className={page < totalPages ? "" : "button_disabled"}
              role="img"
              aria-label="right"
              onClick={() => selectPageHandler(page + 1)}
            >
              ➡️
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

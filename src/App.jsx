import { useState, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import "./styles.css";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'
import { MdDelete, MdEdit } from 'react-icons/md'

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
    setTotalPages(Math.round(todos.length / 10));
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
          ? { id: t.id, todo: todoText, createdAt: new Date().toLocaleString() }
          : { id: t.id, todo: t.todo, ...t }
      );
      setTodos(updatedTodos);
      setCurremtId("");
      setTodoText("");
      return;
    }
    if (e.keyCode === 13 && todoText !== "") {
      const timestampNow = new Date().toLocaleString();
      setTodos([...todos, { id: uuidv4(), todo: todoText, createdAt: timestampNow }]);
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
      setTotalPages(Math.floor(todos.length / 10));
      if (totalPages <= page) {
        setPage(totalPages - 1);
      }
    }
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
      <div className="header">
        <div className="title">TO-DO</div>
        <div className="sub_title">Remember Everything</div>
      </div>
      <div className="add_todo">
        <input className="add_todo_text_input" type={"text"}
          placeholder={"Add your todo"}
          autoComplete={"off"}
          value={todoText}
          onChange={onInputChange}
          onKeyDown={onInputSubmit}
          ref={inputRef}
          autoFocus={true} />
      </div>
      <div>
        {todos.length > 10 && (
          <div className="pagination">
            <span
              className={page > 1 ? "" : "button_disabled"}
              role="img"
              aria-label="left"
              onClick={() => selectPageHandler(page - 1)}
            >
              <AiOutlineArrowLeft className="todo_pagination_icon" />
            </span>
            {[...Array(Math.round(todos.length / 10))].map((_, i) => {
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
              <AiOutlineArrowRight className="todo_pagination_icon" />
            </span>
          </div>
        )}
      </div>
      <div className="todos">
        {todos.slice(page * 10 - 10, page * 10).map(({ id, todo, createdAt }) => {
          return (
            <div className="todoItems" key={id}>
              <div className="todo">
                <div className="todoValue">{todo}</div>
                <br></br>
                <span>{createdAt}</span>
              </div>
              <div className="options">
                <span
                  className="edit"
                  onClick={() => onEditTodo(id)}
                  role="img"
                  aria-label="pen"
                >
                  <MdEdit />
                </span>
                <span
                  className="delete"
                  onClick={() => onDelete(id)}
                  role="img"
                  aria-label="bin"
                >
                  <MdDelete />
                </span>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}

export default App;

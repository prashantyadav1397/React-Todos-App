import { useState, useRef, createContext, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const ToDoListContext = createContext();

const getLocalStorageItems = () => {
    const todoList = JSON.parse(localStorage.getItem("todos"));
    if (todoList !== null && todoList.length > 0) {
        return [...todoList];
    } else {
        return [];
    }
};

const ToDoListContextProvider = ({ children }) => {

    const [todoText, setTodoText] = useState("");
    const [currentId, setCurremtId] = useState("");
    const [isEmptyInput, setIsEmptyInput] = useState(false);
    const [isDescending, setIsDescending] = useState(true);
    const [todos, setTodos] = useState(getLocalStorageItems());
    const [filteredTodos, setFilteredTodos] = useState([]);
    const inputRef = useRef();
    // states for snackbar tracking
    const [snackbarState, setSnackbarState] = useState({
        open: false,
        severity: "",
        message: ""
    });
    // state for filtering and input
    const [isInput, setIsInput] = useState(true);

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
        setFilteredTodos([...todos]);

        return () => {
            setFilteredTodos([]);
        };
    }, [todos, isInput]);

    // handle submit event
    const onInputSubmit = (e) => {

        if ((todoText.length === 0 || todoText === "") && isInput) {
            setIsEmptyInput(true);
        }

        if (e.keyCode === 13 && currentId && currentId.length === 36) {
            const updatedTodos = todos.map((t) =>
                t.id === currentId
                    ? { id: t.id, todo: todoText, createdAt: new Date() }
                    : { id: t.id, todo: t.todo, ...t }
            );
            setIsDescending(true);
            onSortTodos(updatedTodos);
            setCurremtId("");
            setTodoText("");
            setSnackbarState({
                open: true,
                severity: "info",
                message: 'Todo edited successfully!'
            })
            return;
        }

        if (((e.keyCode === 13 && todoText !== "") || (e.type === "click" && todoText !== "")) && isInput) {
            const timestampNow = new Date();
            setTodos([{ id: uuidv4(), todo: todoText, createdAt: timestampNow }, ...todos]);
            setTodoText("");
            setSnackbarState({
                open: true,
                severity: "success",
                message: 'Todo added successfully!'
            });
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
            console.log({ remaining });
            setTodos([...remaining]);
            setSnackbarState({
                open: true,
                severity: "error",
                message: 'Todo deleted successfully!'
            });
        }
    };

    //handles delete all
    const onDeleteAll = () => {

        if (todos.length === 0) {
            setSnackbarState({
                open: true,
                severity: "warning",
                message: 'No todo\'s available. Add more to perform this action!'
            });
        } else {
            setTodos([]);
            setSnackbarState({
                open: true,
                severity: "error",
                message: 'All todo\'s deleted successfully!'
            });
        }
    }

    // handles sorting of todos items
    const onSortTodos = (todos) => {

        if (todos.length === 0) {
            setSnackbarState({
                open: true,
                severity: "warning",
                message: 'No todo\'s available. Add more to perform this action!'
            });
        } else {
            todos.sort((a, b) => {
                return (isDescending
                    ? new Date(b.createdAt) - new Date(a.createdAt)
                    : new Date(a.createdAt) - new Date(b.createdAt))
            });

            setTodos([...todos]);
            setSnackbarState({
                open: true,
                severity: "info",
                message: isDescending
                    ? 'Sorted in descending order!'
                    : 'Sorted in ascending order!'
            });
        }
    }

    const valueToShare = {
        todoText,
        setTodoText,
        currentId,
        setCurremtId,
        todos,
        setTodos,
        inputRef,
        onInputSubmit,
        onEditTodo,
        onDelete,
        onDeleteAll,
        isEmptyInput,
        setIsEmptyInput,
        isDescending,
        setIsDescending,
        onSortTodos,
        snackbarState,
        setSnackbarState,
        isInput,
        setIsInput,
        filteredTodos,
        setFilteredTodos
    }

    return (
        <ToDoListContext.Provider value={valueToShare}>
            {children}
        </ToDoListContext.Provider>
    )
}

export { ToDoListContextProvider };
export default ToDoListContext;

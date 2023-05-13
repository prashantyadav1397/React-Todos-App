import { useContext } from 'react'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment';
import '../styles.css'
import { IoMdAdd } from 'react-icons/io'
import { MdClear } from 'react-icons/md'
import ToDoListContext from '../Context/TodoListContext'
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';

const TextInput = () => {

  const {
    todoText,
    setTodoText,
    onInputSubmit,
    inputRef,
    todos,
    isEmptyInput,
    setIsEmptyInput,
    isInput,
    setIsInput,
    setFilteredTodos
  } = useContext(ToDoListContext);

  // handle input text changes
  const onInputChange = (e) => {
    e.preventDefault();
    setIsEmptyInput(false);
    setTodoText(e.target.value);

    if (!isInput) {
      const results = todos.filter((t) => {
        return t.todo.includes(e.target.value)
      });
      setFilteredTodos([...results]);
    }
  };

  // handle toggle changes
  const onInputOrFilterChange = (e) => {
    setIsInput(e.target.checked ? false : true);
    setTodoText("");
  }

  return (
    <div className="add_todo">
      <TextField
        label={isInput ? "Add your todo" : "Search in your todo's"}
        variant="outlined"
        color='primary'
        className='add_todo_text_input'
        value={todoText}
        inputRef={inputRef}
        autoComplete={"off"}
        onChange={onInputChange}
        onKeyDown={onInputSubmit}
        error={isEmptyInput}
        helperText={isEmptyInput ? 'Value required' : null}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <span
                className='add_todo_text_input_icon'
                onClick={onInputSubmit}>
                {isInput ? <IoMdAdd /> : null}
              </span>
              <span
                className='add_todo_text_input_icon'
                onClick={() => {
                  setIsEmptyInput(false)
                  setTodoText('')
                }} >
                <MdClear />
              </span>
            </InputAdornment>
          ),
        }}
      />
      <br />
      <div>
        <Typography variant='caption' color='primary'>Add a todo</Typography>
        <Switch color='primary' onChange={onInputOrFilterChange} />
        <Typography variant='caption' color='primary'>Filter todo's</Typography>
      </div>
    </div>
  )
}

export default TextInput;

import { useEffect, useContext } from 'react'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment';
import '../styles.css'
import { IoMdAdd } from 'react-icons/io'
import { MdClear } from 'react-icons/md'
import ToDoListContext from '../Context/TodoListContext'

const TextInput = () => {

  const {
    todoText,
    setTodoText,
    onInputSubmit,
    inputRef,
    todos,
    isEmptyInput,
    setIsEmptyInput
  } = useContext(ToDoListContext)

  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(todos));
  }, [todos])

  // handle input text changes
  const onInputChange = (e) => {
    e.preventDefault();
    setIsEmptyInput(false)
    setTodoText(e.target.value);
  };

  return (
    <div className="add_todo">
      <TextField
        label="Add your todo"
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
                <IoMdAdd />
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
    </div>
  )
}

export default TextInput

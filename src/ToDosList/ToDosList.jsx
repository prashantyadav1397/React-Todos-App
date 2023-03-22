import { useContext } from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { MdEdit, MdDelete } from 'react-icons/md'
import Typography from '@mui/material/Typography';
import ToDoListContext from '../Context/TodoListContext'

const ToDosList = () => {

    const { todos, onDelete, onEditTodo } = useContext(ToDoListContext)

    return (
        <div className='todos_list '>
            <List sx={{ width: '100%', wordBreak: 'break-all', wordWrap: 'break-word' }}>
                {todos.map(({ id, todo, createdAt }) => {
                    return (
                        <div key={(id)} className='todo_list_item'>
                            <ListItem >
                                <ListItemText
                                    primary={
                                        <Typography variant='body1' gutterBottom>
                                            {`${todo}`}
                                        </Typography>
                                    }
                                    secondary={
                                        <Typography variant="caption" gutterBottom>
                                            {`${new Date(createdAt).toLocaleString()}`}
                                        </Typography>
                                    } />
                            </ListItem>
                            <div className='todo_list_item_span'>
                                <span className="todo_list_item_span_icon" onClick={() => onEditTodo(id)}>
                                    <MdEdit />
                                </span>
                                <span className="todo_list_item_span_icon" onClick={() => onDelete(id)}>
                                    <MdDelete />
                                </span>
                            </div >
                        </div>
                    )
                })}
            </List>
        </div>
    )
}

export default ToDosList

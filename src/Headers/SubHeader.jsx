import { useContext } from 'react'
import Typography from '@mui/material/Typography'
import { FaSort } from 'react-icons/fa'
import { VscClearAll } from 'react-icons/vsc'
import ToDoListContext from '../Context/TodoListContext'

const SubHeader = () => {

    const { onDeleteAll, onSortTodos, todos, isDescending, setIsDescending } = useContext(ToDoListContext);

    return (
        <div className="subHeaders">
            <Typography variant='body1' color='primary'>Todo's List</Typography>
            <span>
                <span
                    className="sub_header_icon"
                    onClick={() => {
                        setIsDescending(!isDescending)
                        onSortTodos(todos)
                    }}>
                    <FaSort />
                </span>
                <span className="sub_header_icon" onClick={onDeleteAll}>
                    <VscClearAll />
                </span>
            </span >
        </div >
    )
}

export default SubHeader;

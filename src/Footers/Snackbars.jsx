import React, { useContext } from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import ToDoListContext from '../Context/TodoListContext'

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={8} ref={ref} variant="filled" {...props} />;
});

const Snackbars = () => {

  const {
    snackbarState,
    setSnackbarState
  } = useContext(ToDoListContext);

  const { open, severity, message } = snackbarState;

  const handleClose = () => {
    setSnackbarState({ ...snackbarState, open: false });
  };

  return (
    <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
      <Alert severity={severity} sx={{ width: '100%', color: '#fff' }}>
        {message}
      </Alert>
    </Snackbar>
  )
}

export default Snackbars;

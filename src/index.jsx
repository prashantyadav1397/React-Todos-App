import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ToDoListContextProvider } from './Context/TodoListContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ToDoListContextProvider>
      <App />
    </ToDoListContextProvider>
  </React.StrictMode>
);

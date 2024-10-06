import React, { useState, useEffect } from 'react'; // Import necessary React hooks
import { TodoProvider } from './Context'; // Import context provider for managing todos
import './App.css'; // Import styles
import { TodoForm, TodoItem } from './Components'; // Import Todo components

// Main App component
function App() {
  const [todos, setTodos] = useState([]); // State to hold todos

  // Function to add a new todo
  const addTodo = (todo) => {
    setTodos((prev) => [...prev, { id: Date.now(), ...todo }]); // Add new todo with unique ID
  };

  // Function to update an existing todo
  const updateTodo = (id, todo) => {
    setTodos((prev) => prev.map((prevtodo) => (prevtodo.id === id ? todo : prevtodo))); // Update specific todo
  };

  // Function to delete a todo
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((prevtodo) => prevtodo.id !== id)); // Remove todo by ID
  };

  // Function to toggle completion status of a todo
  const toggleComplete = (id) => {
    setTodos((prev) => prev.map((prevtodo) => (prevtodo.id === id ? { ...prevtodo, completed: !prevtodo.completed } : prevtodo))); // Toggle completed status
  };

  // Load todos from local storage when the component mounts
  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos")); // Get todos from local storage
    if (todos) {
      setTodos(todos); // Set state with todos from storage
    }
  }, []);

  // Save todos to local storage whenever the todos state changes
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos)); // Update local storage with current todos
  }, [todos]);

  return (
    <TodoProvider value={{ todos, addTodo, deleteTodo, updateTodo, toggleComplete }}>
      <div className='bg-[#172842] min-h-screen py-8'>
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">Manage your Todo</h1>
          <div className="mb-4">
            {/* Todo form component */}
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/* Loop through todos and create a TodoItem for each */}
            {todos.map((todo) => (
              <div key={todo.id} className='w-full'> {/* Fixed key prop */}
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
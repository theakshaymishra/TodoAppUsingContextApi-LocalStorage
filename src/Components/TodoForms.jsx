import { useState } from "react";
import { useTodo } from "../Context";

// TodoForm component
function TodoForm() {
    const [todo, setTodo] = useState(""); // State for new todo input
    const { addTodo } = useTodo(); // Use context to get addTodo function
  
    // Function to handle form submission
    const add = (e) => {
      e.preventDefault(); // Prevent default form submission
  
      if (!todo) return; // Exit if input is empty
  
      addTodo({ todo, completed: false }); // Add new todo to context
      setTodo(""); // Clear input field
    };
  
    return (
      <form onSubmit={add} className="flex">
        <input
          type="text"
          placeholder="Write Todo..."
          className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
          value={todo}
          onChange={(e) => setTodo(e.target.value)} // Update todo state on input change
        />
        <button type="submit" className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0">
          Add
        </button>
      </form>
    );
  }
  
  export default TodoForm;
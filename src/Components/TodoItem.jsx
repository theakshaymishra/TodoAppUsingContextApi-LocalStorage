import { useState } from "react";
import { useTodo } from "../Context";

// TodoItem component
function TodoItem({ todo }) {
  const [isTodoEditable, setIsTodoEditable] = useState(false); // State to manage edit mode
  const [todoMsg, setTodoMsg] = useState(todo.todo); // State for todo message
  const { updateTodo, deleteTodo, toggleComplete } = useTodo(); // Use context for todo actions

  // Function to edit a todo
  const editTodo = () => {
    updateTodo(todo.id, { ...todo, todo: todoMsg }); // Update todo with new message
    setIsTodoEditable(false); // Exit edit mode
  };

  // Function to toggle completed status
  const toggleCompleted = () => {
    toggleComplete(todo.id); // Toggle completion state
  };

  return (
    <div
      className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300 text-black ${
        todo.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
      }`}
    >
      <input
        type="checkbox"
        className="cursor-pointer"
        checked={todo.completed} // Check if todo is completed
        onChange={toggleCompleted} // Handle checkbox change
      />
      <input
        type="text"
        className={`border outline-none w-full bg-transparent rounded-lg ${
          isTodoEditable ? "border-black/10 px-2" : "border-transparent"
        } ${todo.completed ? "line-through" : ""}`}
        value={todoMsg}
        onChange={(e) => setTodoMsg(e.target.value)} // Update message on change
        readOnly={!isTodoEditable} // Make input read-only unless editable
      />
      {/* Edit/Save Button */}
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
        onClick={() => {
          if (todo.completed) return; // Prevent editing if completed
          if (isTodoEditable) {
            editTodo(); // Save changes if in edit mode
          } else setIsTodoEditable((prev) => !prev); // Toggle edit mode
        }}
        disabled={todo.completed} // Disable button if todo is completed
      >
        {isTodoEditable ? "📁" : "✏️"} {/* Change icon based on edit mode */}
      </button>
      {/* Delete Todo Button */}
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
        onClick={() => deleteTodo(todo.id)} // Delete todo by ID
      >
        ❌
      </button>
    </div>
  );
}

export default TodoItem;
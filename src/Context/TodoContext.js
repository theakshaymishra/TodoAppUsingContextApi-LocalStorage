import { useContext } from "react";
import { createContext } from "react";

export const TodoContext = createContext({
    todos : [ {
        id : 1 ,
        todo : "Todo Message",
        completed : false
    }],
    addTodo : (todo) => {},
    updateTodo : (todo , id) => {},
    deleteTodo : (id) => {},
    toggleComplete : (id) => {}

});

export const useTodo = () => useContext(TodoContext);

export const TodoProvider = TodoContext.Provider;
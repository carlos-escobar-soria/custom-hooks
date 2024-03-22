import { useReducer } from 'react';
import { useEffect } from 'react';
import { todoReducer } from './todoReducer';

const initialState = [
    {
        id: new Date().getTime(),
        description: "recolectar la piedra del alma",
        done:false,
    },
    {
        id: new Date().getTime()*3,
        description: "recolectar la piedra del poder",
        done:false,
    }
]

const init = ()=>{
    return JSON.parse(localStorage.getItem('todos') || []);
}

export const useTodo = () => {

    const [ todos, dispatch ] = useReducer(todoReducer, initialState, init);

    useEffect(()=>{
        localStorage.setItem('todos', JSON.stringify(todos) || []);
    }, [todos]);

    const handleNewTodo = ( todo ) => {
        console.log({ todo });
        const action = {
            type: '[TODO] Add Todo',
            payload: todo
        };
        dispatch( action );
    }

    const handleDeleteTodo = (id) => {
        const action = {
            type: '[TODO] Remove Todo',
            payload: id
        };
        dispatch( action );
    }

    const onToggleTodo = (id) => {
        const action = {
            type: '[TODO] Toggle Todo',
            payload: id
        };
        dispatch( action );
    }

    const pendingTodosCount = () => {
        return todos.filter((todo)=>{
            return !todo.done;
        }).length;
    }
    const todosCount = () =>{
        return todos.length;
    }
    
    return {
        todos,
        todosCount,
        pendingTodosCount,
        handleNewTodo,
        handleDeleteTodo,
        onToggleTodo,
    }
}
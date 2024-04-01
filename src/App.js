import React, { useRef, useState } from 'react';
import { Button } from "@mui/material";

  function TodoApp({todosState}) {
    const onAddBtnClick = () => {
      todosState.addTodo("안녕");
    }
  
    const onRemoveBtnClick = () => {
      todosState.removeTodo(1);
    }
  
    const onModifyBtnClick = () => {
      todosState.modifyTodo(3, "수정");
    }
  
    return (
      <>
        <Button variant='contained' onClick={onAddBtnClick}>추가</Button>
        <Button variant='contained' onClick={onRemoveBtnClick}>삭제</Button>
        <Button variant='contained' onClick={onModifyBtnClick}>수정</Button>
        <hr />
        <ul>
          {todosState.todos.map((todo, index) => (
            <li key={index}>
              {todo.id} {todo.regDate} {todo.content}
            </li>
          ))}
        </ul>
      </>
    )
  }

  function useTodoState() {
    const [todos, setTodos] = useState([]);
    const lastTodoIdRef = useRef(0);

    const addTodo = (newContent) => {
      const id = ++lastTodoIdRef.current;

      const newTodo = {
        id,
        regDate: "2020-12-12 12:12:12",
        content: newContent,
      }
      const newTodos = [...todos, newTodo];
      setTodos(newTodos);
    }

    const removeTodo = (index) => {
      const newTodos = todos.filter((_, _index) => _index != index);
      setTodos(newTodos);
    }

    const modifyTodo = (index, newContent) => {
      const newTodos = todos.map((todo, _index) => _index != index ? todo : {...todo, content: newContent});
      setTodos(newTodos);
    }

    return {
      todos,
      addTodo,
      removeTodo,
      modifyTodo
    }
  }


export default function App() {
  const todosState = useTodoState();

  return (
    <>
      <TodoApp todosState={todosState} />
    </>
  );
}
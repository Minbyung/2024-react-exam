import React, { useState } from 'react';

export default function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (newTodo) => {
    const newTodos = [...todos, todos.length + 1];
    setTodos(newTodos);
  }

  const removeTodo = (index) => {
    const newTodos = todos.filter((_, _index) => _index != index);
    setTodos(newTodos);
  }

  const mdoifyTodo = (index, newTodo) => {
    const newTodos = todos.map((todo, _index) => _index != index ? todo : newTodo);
    setTodos(newTodos);
  }

  const onAddBtnClick = () => {
    addTodo(todos.length + 1);
  }

  const onRemoveBtnClick = () => {
    removeTodo(1);
  }

  const onEditBtnClick = () => {
    mdoifyTodo(1, "안녕");
  }

  return (
    <>
      <div>{JSON.stringify(todos)}</div>
      <button className='btn btn-info' onClick={onAddBtnClick}>추가</button>
      <button className='btn btn-info' onClick={onRemoveBtnClick}>삭제</button>
      <button className='btn btn-info' onClick={onEditBtnClick}>수정</button>
    </>
  );
}
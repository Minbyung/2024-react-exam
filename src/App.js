import React, { useRef, useState } from 'react';
import { Button, Input } from "@mui/material";

  function TodoListItem({todosState, todo, index}) {
    const [editMode, setEditMode] = useState(false);
    const [editedContent, setEditedContent] = useState(todo.content);
    const editedContentInputRef = useRef(null);
    
    const removeTodo = () => {
      todosState.removeTodo(index);
    }
    
    const showEdit = () => {
      setEditMode(true);
    }

    const commitEdit = () => {
      if ( editedContent.trim().length == 0 ) {
        alert('할 일을 입력해주세요.');
        editedContentInputRef.current.focus();
        return;
      }

      todosState.modifyTodo(index, editedContent.trim());
      setEditMode(false);
    }

    const cancelEdit = () => {
      setEditMode(false);
      setEditedContent(todo.content);
    }
    return (
      <li>
        {todo.id}
        &nbsp;
        {todo.regDate} 
        &nbsp;
        {editMode || (
          <>
            {todo.content}
            &nbsp;
            <Button variant='outlined' onClick={showEdit}>수정</Button> 
          </>
        )}
        {editMode && <>
          <Input type="text" placeholder='할 일을 입력해주세요.' value={editedContent} 
          onChange={(e) => setEditedContent(e.target.value)}/>
          <Button variant='outlined' onClick={commitEdit}>수정완료</Button>
          &nbsp;
          <Button variant='outlined' onClick={cancelEdit}>수정취소</Button>
        </>}
        &nbsp;
        <Button variant='outlined' onClick={removeTodo}>삭제</Button>
      </li>
    );
  }

  function TodoList({todosState}) {
    return (
      <ul>
        {todosState.todos.map((todo, index) => (
          <TodoListItem todosState={todosState} key={todo.id} todo={todo} index={index} />
        ))}
      </ul>
    );
  }

  function NewTodoForm({todosState}) {
    const onSubmit = (e) => {
      e.preventDefault();

      const form = e.target;

      form.content.value = form.content.value.trim();

      if ( form.content.value.length == 0 ) {
        alert('할 일을 입력해주세요');
        form.content.focus();
        return;
      }
      
      todosState.addTodo(form.content.value);
      form.content.value = '';
      form.content.focus();
      
    }

    return (
      <form onSubmit={onSubmit}>
        <Input type="text" variant='plain' name="content" autoComplete='off' placeholder='할 일을 입력해주세요'/>
        &nbsp;
        <Button type="submit" variant='outlined' >추가</Button>
        &nbsp;
        <Button type="reset" variant='outlined' >삭제</Button>
      </form>
    );
  }

  function TodoApp({todosState}) {
    return (
      <>
      <NewTodoForm todosState={todosState}/>
      <hr />
      <TodoList todosState={todosState}/>
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
        regDate: dateToStr(new Date()),
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

function dateToStr(d) {
  const pad = (n) => {
    return n < 10 ? "0" + n : n;
  }

  return (
    d.getFullYear() +
    "-" +
    pad(d.getMonth() + 1) +
    "-" +
    pad(d.getDate()) +
    " " +
    pad(d.getHours()) +
    ":" +
    pad(d.getMinutes()) +
    ":" +
    pad(d.getSeconds())
  );
}
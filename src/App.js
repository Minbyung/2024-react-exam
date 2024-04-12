import React, { useRef, useState, useEffect, useMemo } from 'react';
import { 
  AppBar, 
  Button, 
  Chip, 
  TextField, 
  Toolbar, 
  SwipeableDrawer, 
  List, 
  ListItem, 
  ListItemButton, 
  Divider,
  Modal
} from '@mui/material';
import classNames from 'classnames';


function useTodosState() {
  const [todos, setTodos] = useState([]);
  const lastTodoIdRef = useRef(0);  

  const addTodo = (newContent) => {
    const id = ++lastTodoIdRef.current;

    const newTodo = {
      id,
      regDate: dateToStr(new Date()),
      content: newContent,
    }

    const newTodos = [newTodo, ...todos];
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

  const removeTodoById = (id) => {
    const index = todos.findIndex((todo) => todo.id == id);

    if ( index != -1 ) {
      removeTodo(index);
    }
  }

  return {
    todos,
    addTodo,
    removeTodo,
    modifyTodo,
    removeTodoById
  }
}

function TodoListItem({todo, index, openDrawer}) {
  return (
    <>
      <li key={todo.id} className='mt-10'>
        <div className='flex gap-3'>
          <Chip label={todo.id} variant="outlined" />
          <Chip label={todo.regDate} color="primary" variant="outlined" />
        </div>
        <div className='mt-4 shadow rounded-[10px] flex'>
          <Button className='flex-shrink-0 !rounded-[10px_0_0_10px]'>
            <span
            className={
              classNames(
                "text-2xl",
                {
                  "text-[color:var(--mui-color-primary-main)]":
                  index % 2 == 0
                },
                { "text-[#dfdfdf]" : index % 2 != 0 }
              )}
            >
              <i className="fa-solid fa-check"></i>
            </span>
          </Button>
          <div className="flex-shrink-0 w-[2px] bg-[#dfdfdf] my-5"></div>
          <div className='flex-grow whitespace-pre-wrap leading-relaxed hover:text-[color:var(--mui-color-primary-main)] flex items-center my-5 mx-3'>
            {todo.content}
          </div>
          <Button
            onClick={() => openDrawer(todo.id)}
            className='flex-shrink-0 !rounded-[0_10px_10px_0]'
          >
            <span className='text-[#dfdfdf] text-2xl'>
              <i class="fa-solid fa-ellipsis-vertical"></i>
            </span>
          </Button>
        </div>
      </li>
    </>
  );
}

function useTodoOptionDrawerState() {
  const [todoId, setTodoId] = useState(null);
  const opened = useMemo(() => todoId !== null, [todoId]);
  const close = () => setTodoId(null);
  const open = (id) => setTodoId(id);

  return {
    todoId,
    opened,
    close,
    open
  };
}

function useEditTodoModalState() {
  const [opened, setOpened] = useState(false);

  const open = () => {
    setOpened(true);
  }

  const close = () => {
    setOpened(false);
  }

  return {
    opened,
    open,
    close
  };
}

function TodoOptionDrawer({todosState, state}) {
  const editTodoModalState = useEditTodoModalState();

  const removeTodo = () => {
    todosState.removeTodoById(state.todoId);
    state.close();
  }

  return(
    <>
      <SwipeableDrawer
        anchor={"bottom"}
        open={state.opened}
        onClose={state.close}
      >
        <List className='!py-0'>
          <ListItem className='!p-5'>
            <span className="text-[color:var(--mui-color-primary-main)] font-bold">{state.todoId}번</span>
          </ListItem>
          <Divider variant="middle" />
          <ListItemButton className='!p-5' onClick={editTodoModalState.open}>
            <i class="fa-regular fa-pen-to-square"></i>
            <span className='ml-1'>수정</span>
            </ListItemButton>
          <ListItemButton className='!p-5' onClick={removeTodo}>
            <i class="fa-regular fa-trash-can"></i>
            <span className='ml-1'>삭제</span>
          </ListItemButton>
        </List>
      </SwipeableDrawer>

      <Modal
        open={editTodoModalState.opened}
        onClose={editTodoModalState.close}
        className='flex justify-center items-center'
      >
        <div className='bg-white rounded-[10px] p-10'>안녕</div>
      </Modal>
    </>
  );
}

function TodoList({todosState}) {
  const todoOptionDrawerState = useTodoOptionDrawerState();

  return (
    <>
      <TodoOptionDrawer todosState={todosState} state={todoOptionDrawerState} />

      <div className='mt-4 px-4'>
        <ul>
          {todosState.todos.map((todo, index) => (
            <TodoListItem 
              key={todo.id}
              todo={todo}
              index={index}
              openDrawer={todoOptionDrawerState.open}
            />
          ))}
        </ul>
      </div>
    </>
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
    <>
      <form onSubmit={onSubmit} className='flex flex-col mt-4 px-4 gap-2'>
        <TextField
          minRows={3}
          maxRows={10}
          multiline
          name="content"
          autoComplete='off'
          label='할 일을 입력해주세요'
          variant='outlined'
        />
        <Button type="submit" variant='contained'>추가</Button>
      </form>
    </>
  );
}

export default function App() {
  const todosState = useTodosState();

  useEffect(() => {
    todosState.addTodo('운동');
    todosState.addTodo('코딩');
    todosState.addTodo('공부');
  }, []);

  return (
    <>
      <AppBar position='fixed'>
        <Toolbar>
          <div className="flex-1"></div>
          <div>TODO</div>
          <div className="flex-1"></div>
        </Toolbar>
      </AppBar>
      <Toolbar/>
      
      <img src="https://imgur.com/hv1oncI" alt="" />

      <NewTodoForm todosState={todosState} />

      <TodoList todosState={todosState} />
    </>
  );
}

// 유틸리티

// 날짜 객체 입력받아서 문장(yyyy-mm-dd hh:mm:ss)으로 반환한다.
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
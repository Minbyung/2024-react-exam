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
  Modal,
  Snackbar,
  Alert as MuiAlert
} from '@mui/material';
import classNames from 'classnames';
import {
  RecoilRoot,
  atom,
  atomFamily,
  useRecoilState,
  useSetRecoilState,
  useRecoilValue
} from "recoil";
import { recoilPersist } from 'recoil-persist';

const { persistAtom: persistAtomTodos } = recoilPersist({
  key: "persistAtomTodos"
});

const { persistAtom: persistAtomLastTodoId } = recoilPersist({
  key: "persistAtomLastTodoId"
});

const Alert = React.forwardRef((props, ref) => {
  return (
    <MuiAlert {...props} ref={ref} variant='filled'/>
  );
});

const todosAtom = atom({
  key: "app/todosAtom",
  default: [
    {
      id: 3,
      regDate: "2020-12-12 12:12:12",
      content: "코딩"
    },
    {
      id: 2,
      regDate: "2020-12-12 12:12:12",
      content: "공부"
    },
    {
      id: 1,
      regDate: "2020-12-12 12:12:12",
      content: "운동"
    }
  ],
  effects_UNSTABLE: [persistAtomTodos]
});

const lastTodoIdAtom = atom({
  key: "app/lastTodoIdAtom",
  default: 3,
  effects_UNSTABLE: [persistAtomLastTodoId]
});

function useTodosState() {
  const [todos, setTodos] = useRecoilState(todosAtom);
  const [lastTodoId, setLastTodoId] = useRecoilState(lastTodoIdAtom);
  const lastTodoIdRef = useRef(lastTodoId);

  const addTodo = (newContent) => {
    const id = ++lastTodoIdRef.current;
    setLastTodoId(id);

    const newTodo = {
      id,
      regDate: dateToStr(new Date()),
      content: newContent,
    }

    setTodos((todos) => [newTodo, ...todos]);

    return id;
  }

  const modifyTodo = (index, newContent) => {
    const newTodos = todos.map((todo, _index) => _index != index ? todo : {...todo, content: newContent});
    setTodos(newTodos);
  }

  const modifyTodoById = (id, newContent) => {
    const index = findTodoIndexById(id);

    if ( index == -1 ) {
      return;
    }

    modifyTodo(index, newContent);
  }

  const removeTodo = (index) => {
    const newTodos = todos.filter((_, _index) => _index != index);
    setTodos(newTodos);
  }

  const removeTodoById = (id) => {
    const index = todos.findIndex((todo) => todo.id == id);

    if ( index != -1 ) {
      removeTodo(index);
    }
  }

  const findTodoIndexById = (id) => {
    return todos.findIndex((todo) => todo.id == id);
  }

  const findTodoById = (id) => {
    const index = findTodoIndexById(id);

    if ( index == -1 ) {
      return null;
    }

    return todos[index];
  }

  return {
    todos,
    addTodo,
    removeTodo,
    modifyTodo,
    removeTodoById,
    findTodoById,
    modifyTodoById
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

function EditTodoModal({state, todo, closeDrawer}) {
  const todosState = useTodosState();
  const noticeSnackbarState = useNoticeSnackbarState();

  const close = () => {
    state.close(); // 모달
    closeDrawer(); // 드로어
  }

  const onSubmit = (e) => {
    e.preventDefault();

    const form = e.target;

    form.content.value = form.content.value.trim();

    if ( form.content.value.length == 0 ) {
      alert('할 일을 입력해주세요');
      form.content.focus();
      return;
    }

    todosState.modifyTodoById(todo.id, form.content.value);
    close();
    noticeSnackbarState.open(`${todo.id}번 할 일이 수정되었습니다.`, "info");
  }

  return (
    <>
      <Modal
        open={state.opened}
        onClose={state.close}
        className='flex justify-center items-center'
      >
        <div className='bg-white rounded-[10px] p-7 w-full max-w-lg'>
          <form onSubmit={onSubmit} className='flex flex-col gap-2'>
            <TextField
              minRows={3}
              maxRows={10}
              multiline
              name="content"
              autoComplete='off'
              label='할 일을 입력해주세요'
              variant='outlined'
              defaultValue={todo?.content}
            />
            <Button type="submit" variant='contained'>수정</Button>
          </form>
        </div>
      </Modal>
    </>
  );
}

function TodoOptionDrawer({state}) {
  const todosState = useTodosState();
  const noticeSnackbarState = useNoticeSnackbarState();

  const editTodoModalState = useEditTodoModalState();
  const todo = todosState.findTodoById(state.todoId);

  const removeTodo = () => {
    if ( window.confirm(`${state.todoId}번 할 일을 삭제하시겠습니까?`) == false ) {
      return;
    }

    todosState.removeTodoById(state.todoId);
    state.close();
    noticeSnackbarState.open(`${state.todoId}번 할 일이 삭제되었습니다.`, "info");
  }

  return(
    <>
      <EditTodoModal state={editTodoModalState} todo={todo} closeDrawer={state.close} />
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
    </>
  );
}

function TodoList() {
  const todosState = useTodosState();
  const todoOptionDrawerState = useTodoOptionDrawerState();

  return (
    <>
      <TodoOptionDrawer state={todoOptionDrawerState} />

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

function NewTodoForm() {
  const todosState = useTodosState();
  const noticeSnackbarState = useNoticeSnackbarState();

  const onSubmit = (e) => {
    e.preventDefault();

    const form = e.target;

    form.content.value = form.content.value.trim();

    if ( form.content.value.length == 0 ) {
      alert('할 일을 입력해주세요');
      form.content.focus();
      return;
    }

    const newTodoId = todosState.addTodo(form.content.value);
    form.content.value = '';
    form.content.focus();
    noticeSnackbarState.open(`${newTodoId}번 할 일이 추가되었습니다.`);
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

function NoticeSnackbar() {
  const state = useNoticeSnackbarState();

  return(
    <>
      <Snackbar
        open={state.opened}
        autoHideDuration={state.autoHideDuration}
        onClose={state.close}
      >
        <Alert severity={state.severity}>{state.msg}</Alert>
      </Snackbar>
    </>
  );
}

const noticeSnackbarAtom = atom({
  key: "app/noticeSnackbarAtom",
  default: {
    opened: false,
    autoHideDuration: 0,
    severity: "",
    msg: ""
  }
});

function useNoticeSnackbarState() {
  const [noticeSnackbar, setNoticeSnackbar] = useRecoilState(noticeSnackbarAtom);

  const opened = noticeSnackbar.opened;
  const autoHideDuration = noticeSnackbar.autoHideDuration;
  const severity = noticeSnackbar.severity;
  const msg = noticeSnackbar.msg;

  const open = (msg, severity = "success", autoHideDuration = 6000) => {
    setNoticeSnackbar({
      opened: true,
      autoHideDuration,
      severity,
      msg
    });
  }

  const close = () => {
    setNoticeSnackbar({...noticeSnackbar, opened: false});
  }

  return {
    opened,
    open,
    close,
    autoHideDuration,
    severity,
    msg
  }

}

export default function App() {
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
      <NoticeSnackbar />
      <NewTodoForm />
      <TodoList />
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
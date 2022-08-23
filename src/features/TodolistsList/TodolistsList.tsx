import React, { ReactElement, useCallback, useEffect } from 'react';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { TaskStatuses } from 'api/todolists-api';
import { AppRootStateType } from 'app/store';
import { AddItemForm } from 'components/AddItemForm/AddItemForm';
import {
  addTaskTC,
  removeTaskTC,
  TasksStateType,
  updateTaskTC,
} from 'features/TodolistsList/tasks-reducer';
import { Todolist } from 'features/TodolistsList/Todolist/Todolist';
import {
  addTodolistTC,
  changeTodolistFilterAC,
  changeTodolistTitleTC,
  fetchTodolistsTC,
  FilterValuesType,
  removeTodolistTC,
  TodolistDomainType,
} from 'features/TodolistsList/todolists-reducer';

export const TodolistsList = (): ReactElement => {
  const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(
    state => state.todolists,
  );
  const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks);
  const isLoggedIn = useSelector<AppRootStateType, boolean>(
    state => state.auth.isLoggedIn,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoggedIn) {
      return;
    }
    dispatch(fetchTodolistsTC());
  }, [dispatch]);

  const removeTask = useCallback(
    function (id: string, todolistId: string) {
      dispatch(removeTaskTC(id, todolistId));
    },
    [dispatch],
  );

  const addTask = useCallback(
    function (title: string, todolistId: string) {
      dispatch(addTaskTC(title, todolistId));
    },
    [dispatch],
  );

  const changeStatus = useCallback(
    function (id: string, status: TaskStatuses, todolistId: string) {
      dispatch(updateTaskTC(id, { status }, todolistId));
    },
    [dispatch],
  );

  const changeTaskTitle = useCallback(
    function (id: string, newTitle: string, todolistId: string) {
      dispatch(updateTaskTC(id, { title: newTitle }, todolistId));
    },
    [dispatch],
  );

  const changeFilter = useCallback(
    function (value: FilterValuesType, todolistId: string) {
      dispatch(changeTodolistFilterAC(todolistId, value));
    },
    [dispatch],
  );

  const removeTodolist = useCallback(
    function (id: string) {
      dispatch(removeTodolistTC(id));
    },
    [dispatch],
  );

  const changeTodolistTitle = useCallback(
    function (id: string, title: string) {
      dispatch(changeTodolistTitleTC(id, title));
    },
    [dispatch],
  );

  const addTodolist = useCallback(
    (title: string) => {
      dispatch(addTodolistTC(title));
    },
    [dispatch],
  );

  if (!isLoggedIn) {
    return <Navigate to={'/login'} />;
  }

  return (
    <>
      <Grid container style={{ padding: '20px' }}>
        <AddItemForm addItem={addTodolist} />
      </Grid>
      <Grid container spacing={3}>
        {todolists.map(tl => {
          let allTodolistTasks = tasks[tl.id];

          return (
            <Grid item key={tl.id}>
              <Paper style={{ padding: '10px' }}>
                <Todolist
                  todolist={tl}
                  tasks={allTodolistTasks}
                  removeTask={removeTask}
                  changeFilter={changeFilter}
                  addTask={addTask}
                  changeTaskStatus={changeStatus}
                  removeTodolist={removeTodolist}
                  changeTaskTitle={changeTaskTitle}
                  changeTodolistTitle={changeTodolistTitle}
                />
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};

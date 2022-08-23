import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';

import { appReducer } from 'app/app-reducer';
import { authReducer } from 'features/Login/auth-reducer';
import { tasksReducer } from 'features/TodolistsList/tasks-reducer';
import { todolistsReducer } from 'features/TodolistsList/todolists-reducer';

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
  app: appReducer,
  auth: authReducer,
});
export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export type AppRootStateType = ReturnType<typeof rootReducer>;

import {combineReducers, legacy_createStore as createStore, applyMiddleware} from "redux";
import {toDoListsReducer} from "./toDoListsReducer";
import {taskReducer} from "./tasksReducer";
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    toDoLists: toDoListsReducer,
    tasks: taskReducer,
})
export type AppStoreType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer, applyMiddleware(thunk))

export type StateType = typeof store.getState
export type DispatchType = typeof store.dispatch
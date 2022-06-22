import {combineReducers, legacy_createStore as createStore} from "redux";
import {toDoListsReducer} from "./toDoListsReducer";
import {taskReducer} from "./tasksReducer";


const rootReducer = combineReducers({
    toDoLists: toDoListsReducer,
    tasks: taskReducer,
})
export type AppStoreType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer)

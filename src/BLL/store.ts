import {combineReducers, legacy_createStore as createStore} from "redux";
import {toDoListsReducer} from "./toDoListsReducer";


const rootReducer = combineReducers({
    toDoLists: toDoListsReducer,
})
export type AppStoreType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer)

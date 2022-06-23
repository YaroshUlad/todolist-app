import {ToDoListType} from "../DAL/todolistAPI";

enum ACTIONS_TYPES {
    setToDoLists = 'SET_ALL_TO_DO_LISTS_FROM_SERVER',
    createNewToDoList = 'CREATE_NEW_TO_DO_LIST',
    deleteToDoList = 'DELETE_TO_DO_LIST',
    updateToDoListTitle = 'UPDATE_TO_DO_LIST_TITLE',
}

export type ActionsTypesTDL = setTDListsAT | createNewTDListAT | deleteTDListAT | updateToDoListTitleAT

export const setTDListsAC = (toDoLists: ToDoListsReducerStateType) => {
    return {
        type: ACTIONS_TYPES.setToDoLists,
        payload: toDoLists
    } as const
}
type setTDListsAT = ReturnType<typeof setTDListsAC>

export const createNewTDListAC = (newTDList: ToDoListType) => {
    return {
        type: ACTIONS_TYPES.createNewToDoList,
        payload: newTDList
    } as const
}
type createNewTDListAT = ReturnType<typeof createNewTDListAC>

export const deleteTDListAC = (tdlId: string) => {
    return {
        type: ACTIONS_TYPES.deleteToDoList,
        payload: tdlId
    } as const
}
type deleteTDListAT = ReturnType<typeof deleteTDListAC>

export const updateToDoListTitleAC = (id: string, title: string) => {
    return {
        type: ACTIONS_TYPES.updateToDoListTitle,
        payload: {
            id,
            title,
        }
    } as const
}
type updateToDoListTitleAT = ReturnType<typeof updateToDoListTitleAC>


type ToDoListsReducerStateType = ToDoListType[]
const initialState = [] as ToDoListsReducerStateType


export const toDoListsReducer = (state: ToDoListsReducerStateType = initialState, action: ActionsTypesTDL): ToDoListsReducerStateType => {
    switch (action.type) {
        case ACTIONS_TYPES.setToDoLists:
            return [...state, ...action.payload]
        case ACTIONS_TYPES.createNewToDoList:
            return [...state, action.payload]
        case ACTIONS_TYPES.deleteToDoList:
            return state.filter(el => el.id !== action.payload)
        case ACTIONS_TYPES.updateToDoListTitle:
            return state.map(el=> el.id === action.payload.id ? {...el, title: action.payload.title} : el)
        default:
            return state
    }
}
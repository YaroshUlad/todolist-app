import {getTasksResponseType, TaskType} from "../DAL/tasksAPI";


export enum ACTIONS_TYPES {
    setTasks = 'SET_TASKS_TO_STATE',
    deleteTask = 'DELETE_TASK_FROM_STATE',
    updateTask = 'UPDATE_TASK',
    createNewTask = 'CREATE_NEW_TASK',
    setToDoLists = 'SET_TO_DO_LISTS_FOR_TASKS_REDUCER_STATE',
    addToDoList = 'ADD_KEY_AFTER_ADDING_TO_DO_LIST',
    deleteToDoList = 'DELETE_KEY_AFTER_TO_DO_LIST_REMOVING',
}


type ActionTypes = setTasksAT | deleteTaskAT |
    updateTaskAT | createNewTaskAT | setToDoListsAT | deleteToDoListAT |
    addToDoListAT

export const addToDoListAC = (tdlId: string) => {
    return {
        type: ACTIONS_TYPES.addToDoList,
        tdlId
    } as const
}
type addToDoListAT = ReturnType<typeof addToDoListAC>

export const setToDoListsAC = (toDoLists: string[]) => {
    return {
        type: ACTIONS_TYPES.setToDoLists,
        payload: toDoLists,
    } as const
}
type setToDoListsAT = ReturnType<typeof setToDoListsAC>

export const deleteToDoListAC = (tdlId: string) => {
    return {
        type: ACTIONS_TYPES.deleteToDoList,
        tdlId
    } as const
}
type deleteToDoListAT = ReturnType<typeof deleteToDoListAC>

export const setTasksAC = (tdlId: string, data: getTasksResponseType) => {
    return {
        type: ACTIONS_TYPES.setTasks,
        payload: {
            tdlId: data
        },
    } as const
}
type setTasksAT = ReturnType<typeof setTasksAC>

export const deleteTaskAC = (tdlId: string, taskId: string) => {
    return {
        type: ACTIONS_TYPES.deleteTask,
        tdlId,
        taskId,
    } as const
}
type deleteTaskAT = ReturnType<typeof deleteTaskAC>

export const updateTaskAC = (tdlId: string, taskId: string, task: TaskType) => {
    return {
        type: ACTIONS_TYPES.updateTask,
        tdlId,
        taskId,
        task,
    } as const
}
type updateTaskAT = ReturnType<typeof updateTaskAC>

export const createNewTaskAC = (tdlId: string, task: TaskType) => {
    return {
        type: ACTIONS_TYPES.createNewTask,
        tdlId,
        payload: {
            ...task
        }
    } as const
}
type createNewTaskAT = ReturnType<typeof createNewTaskAC>


type TaskReducerStateType = {
    [tdlId: string]: getTasksResponseType
}

const initialState = {} as TaskReducerStateType


export const taskReducer = (state: TaskReducerStateType = initialState, action: ActionTypes): TaskReducerStateType => {
    switch (action.type) {
        case ACTIONS_TYPES.setToDoLists:
            let emptyState = {} as TaskReducerStateType
            action.payload.map(el => {
                emptyState[el] = {} as getTasksResponseType
                return el
            })
            return emptyState
        case ACTIONS_TYPES.setTasks:
            return {...state, ...action.payload}
        case ACTIONS_TYPES.deleteTask:
            const filteredTasksCopy = state[action.tdlId].items.filter(el => el.id !== action.taskId)
            const tasks = {
                ...state[action.tdlId],
                items: filteredTasksCopy,
                totalCount: state[action.tdlId].totalCount - 1
            }
            const stateCopy = {...state}
            stateCopy[action.tdlId] = tasks
            return stateCopy
        case ACTIONS_TYPES.updateTask:
            return {
                ...state,
                [action.tdlId]: {
                    ...state[action.tdlId],
                    items: state[action.tdlId].items.map(el => el.id === action.taskId
                        ? {...action.task}
                        : el)
                }
            }
        case ACTIONS_TYPES.createNewTask:
            return {
                ...state, [action.tdlId]: {
                    ...state[action.tdlId],
                    items: state[action.tdlId].items.concat(action.payload),
                    totalCount: state[action.tdlId].totalCount + 1
                }
            }
        case ACTIONS_TYPES.deleteToDoList:
            const {[action.tdlId]: a, ...restState} = {...state}
            return restState
        case ACTIONS_TYPES.addToDoList:
            return {
                ...state, [action.tdlId]: {
                    items: [],
                    totalCount: 0,
                    error: null
                }
            }
        default:
            return state
    }
}

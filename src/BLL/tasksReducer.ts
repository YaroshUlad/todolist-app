import {getTasksResponseType, TaskType} from "../DAL/tasksAPI";


export enum ACTIONS_TYPES {
    setTasks = 'SET_TASKS_TO_STATE',
    deleteTask = 'DELETE_TASK_FROM_STATE',
    updateTask = 'UPDATE_TASK',
    createNewTask = 'CREATE_NEW_TASK',
}

type ActionTypes = setTasksAT | deleteTaskAT | updateTaskAT

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

export const createNewTaskAC = () => {
    return {
        type: ACTIONS_TYPES.createNewTask,

    } as const
}


type TaskReducerStateType = {
    [tdlId: string]: getTasksResponseType
}

const initialState = {} as TaskReducerStateType


export const taskReducer = (state: TaskReducerStateType = initialState, action: ActionTypes): TaskReducerStateType => {
    switch (action.type) {
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
                    items: state[action.tdlId].items.map(el => el.id === action.taskId ? {...action.task} : el)
                }
            }

        default:
            return state
    }
}

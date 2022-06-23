import {todolistAPI} from "../DAL/todolistAPI";
import {
    ActionsTypesTDL,
    createNewTDListAC,
    deleteTDListAC,
    setTDListsAC,
    updateToDoListTitleAC
} from "./toDoListsReducer";
import {
    ActionTypes,
    addToDoListAC,
    createNewTaskAC,
    deleteTaskAC,
    setTasksAC,
    setToDoListsAC,
    updateTaskAC
} from "./tasksReducer";
import {TaskForRequestType, tasksAPI} from "../DAL/tasksAPI";
import {ThunkAction} from "redux-thunk/es/types";
import {StateType} from "./store";
import {ThunkDispatch} from "redux-thunk";


type FullActionsTypes = ActionTypes | ActionsTypesTDL

type ThunkType = ThunkAction<void, StateType, any, FullActionsTypes>
type ThunkDispatchType = ThunkDispatch<StateType, any, FullActionsTypes>

export const getAllToDoListsTC = (): ThunkType => {
    return (dispatch: ThunkDispatchType) => {
        todolistAPI.getToDoLists()
            .then(res => {
                    const minLength = 0
                    if (res.length !== minLength) {
                        dispatch(setTDListsAC(res))
                        const arrOfTDLIds = res.map(el => {
                            dispatch(getTasksForToDoListTC(el.id))            // call tasks by every iteration
                            return el.id
                        })
                        dispatch(setToDoListsAC(arrOfTDLIds))
                    }
                }
            )
            .catch(res => {
                alert(res)
            })
    }
}

export const createNewToDoListTC = (title: string): ThunkType => {
    return (dispatch: ThunkDispatchType) => {
        todolistAPI.createNewToDoList(title)
            .then(res => {
                if (res.resultCode === 0) {
                    dispatch(createNewTDListAC(res.data.item))
                    dispatch(addToDoListAC(res.data.item.id))
                }
            })
            .catch(res => {
                alert(res)
            })
    }
}

export const getTasksForToDoListTC = (tdlId: string): ThunkType => {
    return (dispatch: ThunkDispatchType) => {
        tasksAPI.getTasks(tdlId)
            .then(res => {
                dispatch(setTasksAC(tdlId, res))
            })
            .catch(res => {
                alert(res)
            })
    }
}

export const deleteToDoListTC = (tdlId: string): ThunkType => {
    return (dispatch: ThunkDispatchType) => {
        todolistAPI.deleteToDoList(tdlId)
            .then((res) => {
                dispatch(deleteTDListAC(tdlId))
            })
            .catch(res => {
                alert(res)
            })
    }
}

export const updateToDoListTitleTC = (tdlId: string, title: string): ThunkType => {
    return (dispatch: ThunkDispatchType) => {
        todolistAPI.updateToDoListTitle(tdlId, title)
            .then((res) => {
                dispatch(updateToDoListTitleAC(tdlId, title))
            })
            .catch(res => {
                alert(res)
            })
    }
}

export const createNewTaskTC = (tdlId: string, title: string): ThunkType => {
    return (dispatch: ThunkDispatchType) => {
        tasksAPI.createNewTask(tdlId, title)
            .then(res => {
                dispatch(createNewTaskAC(tdlId, res.data.item))
            })
            .catch(res => {
                alert(res)
            })
    }
}

export const deleteTaskTC = (tdlId: string, taskId: string): ThunkType => {
    return (dispatch: ThunkDispatchType) => {
        tasksAPI.deleteTask(tdlId, taskId)
            .then(res => {
                dispatch(deleteTaskAC(tdlId, taskId))
            })
            .catch(res => {
                alert(res)
            })
    }
}

export const updateTaskTC = (tdlId: string, taskId: string, task: TaskForRequestType): ThunkType => {
    return (dispatch: ThunkDispatchType) => {
        tasksAPI.updateTask(tdlId, taskId, task)
            .then(res => {
                dispatch(updateTaskAC(tdlId, taskId, res.data.item))
            })
            .catch(res => {
                alert(res)
            })
    }
}
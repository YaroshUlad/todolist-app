//import {DispatchType} from "./store";
import {todolistAPI} from "../DAL/todolistAPI";
import {ActionsTypesTDL, createNewTDListAC, setTDListsAC} from "./toDoListsReducer";
import {ActionTypes, addToDoListAC, setTasksAC, setToDoListsAC} from "./tasksReducer";
import {tasksAPI} from "../DAL/tasksAPI";
import { ThunkDispatch } from "redux-thunk/es/types";
import {StateType} from "./store";
//import { ThunkDispatch } from "redux-thunk";


type FullActionsTypes = ActionTypes|ActionsTypesTDL


export const getAllToDoListsTC = () => (dispatch: ThunkDispatch<StateType,any, FullActionsTypes>) => {
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

export const createNewToDoListTC = (title: string) => (dispatch: ThunkDispatch<StateType,any, FullActionsTypes>) => {
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

export const getTasksForToDoListTC = (tdlId: string) => (dispatch: ThunkDispatch<StateType,any, FullActionsTypes>) => {
    tasksAPI.getTasks(tdlId)
        .then( res => {
            dispatch(setTasksAC(tdlId, res))
        })
        .catch(res=> {alert(res)})
}
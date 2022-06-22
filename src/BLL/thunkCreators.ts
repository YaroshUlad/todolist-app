import {DispatchType} from "./store";
import {todolistAPI} from "../DAL/todolistAPI";
import {createNewTDListAC, setTDListsAC} from "./toDoListsReducer";
import {addToDoListAC, setTasksAC, setToDoListsAC} from "./tasksReducer";
import {tasksAPI} from "../DAL/tasksAPI";



export const getAllToDoListsTC = () => (dispatch: DispatchType) => {
    todolistAPI.getToDoLists()
        .then(res => {
                const minLength = 0
                if (res.length !== minLength) {
                    dispatch(setTDListsAC(res))
                    const arrOfTDLIds = res.map(el => {
                        //dispatch(getTasksForToDoListTC(el.id))            // call tasks by every iteration
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

export const createNewToDoListTC = (title: string) => (dispatch: DispatchType) => {
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

export const getTasksForToDoListTC = (tdlId: string) => (dispatch: DispatchType) => {
    tasksAPI.getTasks(tdlId)
        .then( res => {
            dispatch(setTasksAC(tdlId, res))
        })
        .catch(res=> {alert(res)})
}
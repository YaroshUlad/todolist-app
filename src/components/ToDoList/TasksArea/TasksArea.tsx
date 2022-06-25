import React, {FC, memo} from 'react';
import styles from './TasksArea.module.css'
import {useDispatch, useSelector} from "react-redux";
import {ThunkDispatch} from "redux-thunk";
import {AppStoreType} from "../../../BLL/store";
import {TaskType} from "../../../DAL/tasksAPI";
import Task from "./Task/Task";

type TaskAreaPropsType = {
    tdlId: string
}

export const TasksArea: FC<TaskAreaPropsType> = memo((props) => {
    const {tdlId} = props

    const dispatch = useDispatch<ThunkDispatch<AppStoreType, any, any>>()
    const tasks = useSelector<AppStoreType, TaskType[]>(state => state.tasks[tdlId].items)
    const updateTaskTitle = (taskId: string,title: string) => {

    }
    const changeIsDoneStatus = (taskId: string, isDone: boolean) => {

    }
    const deleteTask = (taskId: string) => {

    }

    return (
        <div>
            {tasks.map(el=>{
                return <Task taskId={el.id}
                             isDone={el.completed}
                             title={el.title}
                             updateTaskTitle={updateTaskTitle}
                             deleteTask={deleteTask}
                             changeIsDone={changeIsDoneStatus}/>
            })}

        </div>
    );
})
import React, {FC, memo} from 'react';
import styles from './Task.module.css'
import {CheckBox} from "../../../common/CheckBox/CheckBox";
import EditableSpan from "../../../common/EditableSpan/EditableSpan";
import {AddButton} from "../../../common/AddButton/AddButton";

type TaskPropsType = {
    taskId: string
    isDone: boolean
    title: string
    updateTaskTitle: (taskId: string,title: string) => void
    deleteTask: (taskId: string) => void
    changeIsDone: (taskId: string, isDone: boolean) => void
}


const Task: FC<TaskPropsType> = memo((props) => {
    return (
        <div>
            <CheckBox isDone={props.isDone} changeIsDoneStatus={(isDone)=>props.changeIsDone(props.taskId,isDone)}/>
            <EditableSpan title={props.title} updateTitleOfItem={(title)=>props.updateTaskTitle(props.taskId,title)}/>
            <AddButton callback={()=>props.deleteTask(props.taskId)} buttonTitle={'x'}/>
        </div>
    );
})

export default Task;
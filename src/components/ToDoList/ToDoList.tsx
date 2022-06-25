import React, {FC, memo, useCallback} from 'react';
import styles from './ToDoList.module.css'
import {useDispatch, useSelector} from "react-redux";
import {AppStoreType} from "../../BLL/store";
import {deleteToDoListTC, updateToDoListTitleTC} from "../../BLL/thunkCreators";
import {ThunkDispatch} from "redux-thunk";
import TitleArea from "./TitleArea/TitleArea";

type ToDoListPropsType = {
    tdlId: string
    //title: string
}

export const ToDoList: FC<ToDoListPropsType> = memo((props) => {
    const {tdlId} = props

    const dispatch = useDispatch<ThunkDispatch<AppStoreType, any, any>>()
    const toDoListTitle = useSelector<AppStoreType, string>(state => state.toDoLists.filter(el=> el.id === tdlId)[0].title)

    const updateToDoListTitle = useCallback((title: string) => {
        dispatch(updateToDoListTitleTC(tdlId, title))
    }, [dispatch])
    const deleteToDoList = useCallback(() => {
        dispatch(deleteToDoListTC(tdlId))
    }, [dispatch])
    return (
        <div>
            <TitleArea title={toDoListTitle} updateTitle={updateToDoListTitle} deleteToDoList={deleteToDoList}/>

        </div>
    );
})
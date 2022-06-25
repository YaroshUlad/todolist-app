import React, {FC, memo} from 'react';
import styles from './TitleArea.module.css'
import EditableSpan from "../../common/EditableSpan/EditableSpan";
import {AddButton} from "../../common/AddButton/AddButton";

type TitleAreaPropsType = {
    title: string
    updateTitle: (title: string) => void
    deleteToDoList: () => void
}

const TitleArea: FC<TitleAreaPropsType> = memo((props) => {
    const{title,updateTitle, deleteToDoList} = props
    return (
        <div>
            <EditableSpan title={title} updateTitleOfItem={updateTitle}/>
            <AddButton callback={deleteToDoList} buttonTitle={'x'}/>
        </div>
    );
})
export default TitleArea;
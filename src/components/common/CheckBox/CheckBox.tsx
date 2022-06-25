import React, {ChangeEvent, FC, memo} from 'react';
import styles from './CheckBox.module.css'

type CheckBoxPropsType = {
    isDone: boolean
    changeIsDoneStatus: (isDone: boolean) => void
}

export const CheckBox: FC<CheckBoxPropsType> = memo((props) => {
    const{isDone, changeIsDoneStatus} = props

     const onCheckBoxChange = (e: ChangeEvent<HTMLInputElement>) => {
        changeIsDoneStatus(e.currentTarget.checked)
     }

    return (
        <input onChange={onCheckBoxChange} checked={isDone} type="checkbox"/>
    );
});

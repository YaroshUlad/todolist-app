import React, {KeyboardEvent, FocusEvent, ChangeEvent, FC, useState} from 'react';
import styles from './EditableSpan.module.css'

type EditableSpanPropsType = {
    title: string,
    updateTitleOfItem: (title: string) => void
}

const EditableSpan: FC<EditableSpanPropsType> = React.memo((props) => {
    const {title, updateTitleOfItem} = props
    const [isEditMode, setEditMod] = useState<boolean>(false)

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        updateTitleOfItem(e.currentTarget.value)
    }
    const onInputBlur = (e: FocusEvent<HTMLInputElement, Element>) => {
        updateTitleOfItem(e.currentTarget.value)
        setEditMod(false)
    }
    const onInputKeyEnterPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            updateTitleOfItem(e.currentTarget.value)
            setEditMod(false)
        }
    }
    const onDoubleClickFunc = () => {
        setEditMod(true)
    }

    return (
        <>
            {
                isEditMode ?
                    <input onBlur={onInputBlur}
                           onKeyPress={onInputKeyEnterPress}
                           autoFocus
                           onChange={onInputChange}
                           value={title}
                           type="text"/>
                    : <div onDoubleClick={onDoubleClickFunc}>
                        {title}
                    </div>
            }


        </>
    );
})

export default EditableSpan;
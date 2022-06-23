import React, {ChangeEvent, KeyboardEvent, FC, useState} from 'react';

type AddItemFormPropsType = {
    cb: (itemTitle: string) => void
}

const AddItemForm: FC<AddItemFormPropsType> = React.memo(({cb}) => {
    const [value, setValue] = useState<string>('')
    const [error, setError] = useState<string>('')

    const handleOnInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (error) {
            setError('')
        }
        setValue(e.currentTarget.value)
    }
    const addItem = () => {
        if (value.trim()) {
            cb(value.trim())
            setValue('')
        } else {
            setError('Field is required')
        }
    }
    const handleOnInputKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addItem()
        }
    }

    return (
        <div>
            <input placeholder={'enter text there'}
                   onKeyPress={handleOnInputKeyPress}
                   onChange={handleOnInputChange}
                   value={value}
                   type="text"/>
            <button disabled={!!error}
                    onClick={addItem}>
                +
            </button>
            {error && <span>{error}</span>}
        </div>
    );
})

export default AddItemForm;
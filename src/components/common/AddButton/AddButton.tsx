import React, {ButtonHTMLAttributes, DetailedHTMLProps} from 'react';
import styles from './AddButton.module.css'

type DefaultButtonPropsType = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
type AddButtonPropsType = {
    buttonTitle?: string
    callback: () => void
}
type FullButtonPropsType = DefaultButtonPropsType & AddButtonPropsType

export const AddButton: React.FC<FullButtonPropsType> = React.memo(({callback, className, ...restProps}) => {
        const style = className ? `${styles.addButton} ${className}` : styles.addButton
        return (
            <>
                <button className={style} onClick={callback} {...restProps}>
                    {restProps.buttonTitle ? restProps.buttonTitle : 'add'}
                </button>
            </>
        )
    }
)


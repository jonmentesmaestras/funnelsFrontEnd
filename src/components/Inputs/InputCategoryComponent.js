import {IconButton} from "@mui/material";
import React, {useState} from "react";

export default function InputCategoryComponent
({
     className,
     placeholder,
     leftIcon,
     onClickLeftIcon,
     rightIcon,
     onClickRightIcon,
     type = 'text',
     value,
     onChange,
     validateMethod = () => {
     },
     error
 }
) {

    const [isValid, setIsValid] = useState(true);
    const [showPassword, setShowPassword] = useState(false);

    const handleClickLeftIcon = () => {
        if (onClickLeftIcon) onClickLeftIcon()
    }

    const handleClickRightIcon = () => {
        if (onClickRightIcon) {
            onClickRightIcon()
        }
    }
    const onChangeInput = (event) => {
        const inputValue = event.target.value;
        if (onChange) {
            onChange(inputValue)
        }
    }

    return (
        <div className={"dialog-save-wrapper-style-input"}>
            {leftIcon && (
                <IconButton
                    className='input-left-icon'
                    aria-label="delete" clear
                    size="small"
                    onClick={handleClickLeftIcon}>
                    {leftIcon}
                </IconButton>
            )}
            <input className={"dialog-save-input"}
                   placeholder={placeholder}
                   onChange={onChangeInput}

            />
            {rightIcon && (
                <IconButton
                    className='input-right-icon'
                    aria-label="delete" clear
                    size="small"
                    onClick={handleClickRightIcon}>
                    {rightIcon}
                </IconButton>
            )}
            {!isValid?.isValid && (
                <span className='login-input-error'>{isValid?.msg}</span>
            )}
        </div>
    );
}
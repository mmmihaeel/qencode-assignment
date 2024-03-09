import React, { FC, forwardRef } from "react";
import openEye from '../../../assets/icons/open_eye.svg';
import closeEye from '../../../assets/icons/close_eye.svg'
import './index.scss';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    type: "text" | "password";
    placeholder: string;
    error: string | undefined;
    togglePasswordVisibility?: () => void;
    passwordShown?: boolean;
    label?: string | undefined;
}

const Input: FC<InputProps> = forwardRef(({
    type,
    placeholder,
    error,
    togglePasswordVisibility,
    passwordShown,
    label,
    ...rest
}, ref: React.ForwardedRef<HTMLInputElement>) => {
    return (
        <div className="field">
            {label && <label className={'field_label'}>{label}</label>}
            <div className="field_input">
                <input
                    ref={ref}
                    {...rest}
                    type={type}
                    placeholder={placeholder}
                    style={error ? { border: "1px solid #BE2323" } : undefined}
                />
                {togglePasswordVisibility && (
                    <div onClick={togglePasswordVisibility} className={"field_pass_icon"}>
                        <img src={passwordShown ? openEye : closeEye} alt="show password" />
                    </div>
                )}
            </div>
            {error ? <span className="field_error">{error}</span> : <></>}
        </div>
    );
});

export default Input;
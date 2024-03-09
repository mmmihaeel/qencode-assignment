import React from "react";
import { FC } from "react";
import './index.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    text: string;
    submit: boolean;
}

const Button: FC<ButtonProps> = ({ text, submit, ...rest }) => {
    return (
        <React.Fragment>
            <button
                className={submit ? 'submit' : 'cancel'}
                {...rest}
            >
                {text}
            </button>
        </React.Fragment>
    );
};

export default Button;

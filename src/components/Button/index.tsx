import React from "react";
import clsx from "clsx";
import './Button.scss';

interface ButtonProps{
    className?:string,
    onClick:React.MouseEventHandler<HTMLDivElement>
}

const Button:React.FC<ButtonProps> = function (props){
    return <span className={clsx('c-button', props.className)} onClick={props.onClick}>
        {props.children}
    </span>
}

export default Button;

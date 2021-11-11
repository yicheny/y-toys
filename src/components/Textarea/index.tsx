import React from 'react';
import clsx from 'clsx';
import './index.scss';

interface TextareaProps{
    className?:string,
    onChange?:React.ChangeEventHandler<HTMLTextAreaElement>,
    style?:React.CSSProperties
}

export default function Textarea(props:TextareaProps){
    return <textarea style={props.style}
                     onChange={props.onChange}
                     className={`${clsx('c-textarea',props.className)}`}/>
}

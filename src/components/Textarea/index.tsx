import React from 'react';
import clsx from 'clsx';
import './index.scss';
import {CommonComponentProps} from "../../types";

interface TextareaProps extends CommonComponentProps{
    onChange?:React.ChangeEventHandler<HTMLTextAreaElement>,
    value?:string
}

export default function Textarea(props:TextareaProps){
    return <textarea style={props.style}
                     onChange={props.onChange}
                     value={props.value}
                     className={`${clsx('c-textarea',props.className)}`}/>
}

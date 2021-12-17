import clsx from "clsx";
import './index.scss'
import {useCallback, useState} from "react";

interface InputProps{
    className?:string,
    // defaultValue?:string
    onChange:(v:string) => void,
    placeholder?:string
}

export default function Input(props:InputProps){
    const {onChange,placeholder} = props;
    const [value,setValue] = useState<string>('')

    const handleBlur = useCallback(()=>{
        onChange(value)
    },[onChange,value])

    return <input className={clsx('c-input',props.className)}
                  placeholder={placeholder || '请输入内容...'}
                  onChange={(e)=>setValue(e.target.value)}
                  onBlur={handleBlur}/>
}

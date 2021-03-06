import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {curryClsPrefix} from "../../utils";
import _ from 'lodash'
import clsx from "clsx";
import './index.scss';
import {useKey, useOutsideClick} from "../../hooks";
import {Voidable} from "../../types";

const addPrefix = curryClsPrefix('c-select')

type tValue = number | string;

type tOption = {
    text:number | string,
    value:tValue,
}

interface SelectProps {
    className?: string,
    defaultValue?: string,
    placeholder?: string,
    options: tOption[],
    onChange: (value: tValue, option: tOption) => void
}

//输入 v
//显示 s => o[s]

export default function Select(props:SelectProps) {
    const {options,onChange,placeholder} = props;
    const [select,setSelect] = useState<Voidable<tValue>>(props.defaultValue)
    const [active,setActive] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const [renderOptions,setRenderOptions] = useState<Array<tOption>>(options)
    const [key,keyUpdate] = useKey();

    const handleInputChange = useCallback((value:string)=>{
        // setInputValue(value)
        const ros = options.filter(x=>{
            if(value === '') return true;
            return x.text.toString().includes(value)
        });
        setRenderOptions(ros);
    },[options])

    useEffect(()=>{
        handleInputChange('')
    },[handleInputChange])

    const openBox = useCallback(()=>{
        setActive(true);
    },[])

    const handleSelect = useCallback((option)=>{
        setSelect(option.value);
        onChange(option.value,option)
        setActive(false)
        keyUpdate()
    },[onChange,keyUpdate])

    const closeBox = useCallback(()=>{
        setActive(false)
    },[])

    const {setOutsideRef: containerRef} = useOutsideClick(closeBox)

    const renderValue = useMemo(()=>{
        if(active) return '';
        const item = renderOptions.find(option=>option.value===select);
        return _.isNil(item) ? item : _.toString(item.text);
    },[active,renderOptions,select]);

    useEffect(()=>{
        keyUpdate()
        const timeId = setTimeout(()=>{
            if(active) inputRef.current?.focus()
            clearTimeout(timeId)
        },0)
    },[active,keyUpdate])

    return <div className={clsx(addPrefix(),props.className,{active})}
                ref={containerRef}
                onFocus={openBox}>
        <input className={addPrefix('input')}
               type='text'
               ref={inputRef}
               key={key}
               defaultValue={renderValue}
               placeholder={placeholder || '请选择内容...'}
               onChange={e=>handleInputChange(e.target.value)}/>
        <div className={addPrefix('box')}>
            {
                renderOptions.length === 0
                    ? <div className={addPrefix("box-empty")}>暂无相关数据</div>
                    : renderOptions.map((option)=>{
                        return <div key={option.value}
                                    onClick={()=>handleSelect(option)}
                                    className={clsx(addPrefix('box-item'),{select:option.value===select})}>{option.text}</div>
                    })
            }
        </div>
    </div>
}

/*
* TODO
*   1. focus游标闪烁两次
*   2. icon图标
* */

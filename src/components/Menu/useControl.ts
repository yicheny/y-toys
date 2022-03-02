import {useCallback, useState} from "react";

const sleep = 100;
export function useControl(defaultValue:boolean){
    const [rs,setRs] = useState<boolean>(defaultValue);//rootShrink
    const [ds,setDs] = useState<boolean>(false);//dynamicShrink

    const toShrink = useCallback(()=>{
        setRs(true)
        setDs(true)
    },[]);
    const toExpand = useCallback(()=>{
        setRs(false)
        setDs(false)
    },[]);

    const toggle = useCallback(()=>{
        if(rs){
            setRs(false)
            setDs(false)
        }else{
            setRs(true)
            setDs(true)
        }
    },[rs])

    const onEnter = useCallback(()=>{
        // console.log(rs,'enter');
        if(rs){
            const timeId = setTimeout(()=>{
                setDs(false)
                clearTimeout(timeId)
            },sleep)
        }
    },[rs])

    const onOut = useCallback(()=>{
        // console.log(rs,'out');
        if(rs){
            const timeId = setTimeout(()=>{
                setDs(true)
                clearTimeout(timeId)
            },sleep)
        }
    },[rs])

    // console.log('rs',rs,'ds',ds)
    return {shrink: rs && ds,rootShrink:rs,toShrink,toExpand,onEnter,onOut,toggle}
}
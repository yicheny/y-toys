import React, {useCallback, useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import './index.scss'
import clsx from "clsx";
import {Icon} from "../index";
import _ from 'lodash'

type MenuOption = {
    text:string,
    to:string,
}

interface MenuProps{
    options:MenuOption[],
    className?:string,
    style?:React.CSSProperties
}

export default function Menu(props:MenuProps):JSX.Element{
    const {pathname} = useLocation();
    const navigate = useNavigate();
    const [shrink,setShrink] = useState<boolean>(true);
    const [autoShrink,setAutoShrink] = useState<boolean>(true);

    const autoShrinkHandle = useCallback((x)=>{
        if(x<=248){
            // console.log(x)
            setAutoShrink(false)
        }else{
            setAutoShrink(true)
        }
    },[])

    useMonitor(autoShrinkHandle)

    return <div className={clsx('c-menu',props.className,{shrink:(shrink && autoShrink)})} style={props.style}>
        <div className="c-menu-content">
            {
                props.options.map((option,key) => {
                    return <div className={clsx('c-menu-item',{current:pathname===option.to})}
                                onClick={()=>navigate(option.to)}
                                key={key}>
                        {option.text}
                    </div>
                })
            }
        </div>
        <div className="c-menu-footer">
            <Icon name={'fixed'}
                  size={24}
                  className={clsx({shrink})}
                  style={{cursor:"pointer"}}
                  onClick={()=>setShrink(!shrink)}/>
        </div>
    </div>
}

function useMonitor(handle:(x:number,y:number)=>void){
    useEffect(()=>{
        const listener = function (event:MouseEvent){
            handle(event.clientX,event.clientX)
        }
        const throttleListener = _.throttle(listener,60)
        document.addEventListener('mousemove',throttleListener);

        return ()=>{
            document.removeEventListener('mousemove',throttleListener)
        }
    },[handle])
}

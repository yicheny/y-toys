import React, {useCallback, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import './index.scss'
import clsx from "clsx";
import {Icon} from "../index";

type MenuOption = {
    text: string,
    to: string,
}

interface MenuProps {
    options: MenuOption[],
    className?: string,
    style?: React.CSSProperties,
    defaultShrink?: boolean,
    shrinkText?:string,
    expandText?:string
}

Menu.defaultProps = {
    shrinkText:"收缩",
    expandText:"展开"
}

export default function Menu(props: MenuProps): JSX.Element {
    const {defaultShrink=false} = props;
    const {pathname} = useLocation();
    const navigate = useNavigate();
    const {shrink,toggle,onEnter,onOut,rootShrink} = useControl(defaultShrink);

    return < >
        <div className={clsx('c-menu', props.className, {shrink})} style={props.style} onMouseLeave={onOut}>
            <div className="c-menu-header">
                {/*<Button onClick={toShrink}>{props.shrinkText}</Button>*/}
                <Icon name={'fixed'}
                      size={24}
                      className={clsx({shrink:rootShrink})}
                      style={{cursor: "pointer"}}
                      onClick={toggle}/>
            </div>
            <div className="c-menu-content">
                {
                    props.options.map((option, key) => {
                        return <div className={clsx('c-menu-item', {current: pathname === option.to})}
                                    onClick={() => navigate(option.to)}
                                    key={key}>
                            {option.text}
                        </div>
                    })
                }
            </div>
        </div>
        <div className={clsx('c-menu-tip',{expand:!shrink})}>
            <div className="c-menu-tip-btn" onMouseEnter={onEnter}>
                {props.expandText}
            </div>
        </div>
    </>
}

const sleep = 100;
function useControl(defaultValue:boolean){
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

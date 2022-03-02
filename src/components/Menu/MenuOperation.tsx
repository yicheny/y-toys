import clsx from "clsx";
import {Icon} from "../index";
import React from "react";

interface Props{
    shrink:boolean,
    onMouseEnter:React.MouseEventHandler<HTMLElement>
}
export function MenuOperation(props:Props){
    const {shrink,onMouseEnter} = props;
    return <div className={clsx('c-menu-box',{expand:!shrink})}>
        <div className="c-menu-box-btns">
            <Icon name={'arrow-right'} onMouseEnter={onMouseEnter}/>
            <Icon name={'adjust'}/>
        </div>
    </div>
}
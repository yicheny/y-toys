import React from 'react';
import './index.scss';
import clsx from "clsx";

interface IconProps{
    name:string,
    onClick?:React.MouseEventHandler<HTMLElement>
}

const Icon:React.FC<IconProps> = function (props){
    return <i className={clsx('iconfont',`icon-${props.name}`)}
              onClick={props.onClick}/>
}

export default Icon;

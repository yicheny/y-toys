import React from 'react';
import './index.scss';
import clsx from "clsx";
import {CommonComponentProps} from "../../types";

interface IconProps extends CommonComponentProps{
    name:string,
    size?:number,
    color?:string,
    onClick?:React.MouseEventHandler<HTMLElement>
}

const Icon:React.FC<IconProps> = function (props){
    return <i className={clsx('iconfont',`icon-${props.name}`,props.className)}
              style={{fontSize:props.size,color:props.color,...props.style}}
              onClick={props.onClick}/>
}
Icon.defaultProps = {
    size:16,
    color:'rgba(0,0,0,0.72)'
}

export default Icon;

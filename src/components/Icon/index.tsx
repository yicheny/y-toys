import React from 'react';
import clsx from "clsx";
import {CommonComponentProps} from "../../types";

const classMap:Record<string, string> = {
    'arrow-top':'xiangshangjiantou',
    'arrow-right':'xiangyoujiantou',
    'arrow-bottom':'xiangxiajiantou',
    'arrow-left':'xiangzuojiantou',
    'fixed':"fix",
    'close':"guanbi",
    'setting':'shezhi'
}

interface IconProps extends CommonComponentProps{
    name:string,
    size?:number,
    color?:string,
    onClick?:React.MouseEventHandler<HTMLElement>
    onMouseEnter?:React.MouseEventHandler<HTMLElement>,
    pRef?:React.Ref<any>
}

const Icon:React.FC<IconProps> = function (props){
    const {name} = props;
    return <i className={clsx('iconfont',`icon-${classMap[name] || name}`,props.className)}
              ref={props.pRef}
              style={{fontSize:props.size,color:props.color,...props.style}}
              onClick={props.onClick}
              onMouseEnter={props.onMouseEnter}/>
}
Icon.defaultProps = {
    size:16,
    color:'rgba(0,0,0,0.72)'
}

export default Icon;

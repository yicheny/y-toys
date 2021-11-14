import React from "react";
import {useLocation, useNavigate} from "react-router-dom";
import './index.scss'
import clsx from "clsx";

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
    const navigate = useNavigate()

    return <div className={clsx('c-menu',props.className)} style={props.style}>
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
}

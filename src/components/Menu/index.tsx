import React from "react";
import {Link} from "react-router-dom";
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
    return <div className={clsx('c-menu',props.className)} style={props.style}>
        {
            props.options.map((option,key) => {
                return <div className='c-menu-item' key={key}>
                    <Link to={option.to}>{option.text}</Link>
                </div>
            })
        }
    </div>
}

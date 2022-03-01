import React, {useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
import './index.scss'
import clsx from "clsx";
import {Button} from "../index";

type MenuOption = {
    text: string,
    to: string,
}

interface MenuProps {
    options: MenuOption[],
    className?: string,
    style?: React.CSSProperties,
    defaultShrink: boolean,
    shrinkText:string,
    expandText:string
}

Menu.defaultProps = {
    defaultShrink: false
}

export default function Menu(props: MenuProps): JSX.Element {
    const {pathname} = useLocation();
    const navigate = useNavigate();
    const [shrink, setShrink] = useState<boolean>(props.defaultShrink);

    return <div className={clsx('c-menu', props.className, {shrink})} style={props.style}>
        <Button onClick={() => setShrink(!shrink)}>{shrink ? props.expandText : props.shrinkText}</Button>
        <div className="c-menu-content">
            {
                props.options.map((option, key) => {
                    return <div className={clsx('c-menu-item', {current: pathname === option.to})}
                                onClick={() => navigate(option.to)}
                                key={key}>
                        {shrink ? option.text.slice(0, 3).toLocaleUpperCase() : option.text}
                    </div>
                })
            }
        </div>
        {/*<div className="c-menu-footer">
            <Icon name={'fixed'}
                  size={24}
                  className={clsx({shrink})}
                  style={{cursor: "pointer"}}
                  onClick={() => setShrink(!shrink)}/>
        </div>*/}
    </div>
}
import React from "react";
import {useLocation, useNavigate} from "react-router-dom";
import './index.scss'
import clsx from "clsx";
import {useToggle} from "../../hooks";
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
    const { show:shrink, open:toShrink, close:toExpand } = useToggle(props.defaultShrink);

    return <>
        <div className={clsx('c-menu', props.className, {shrink})} style={props.style}>
            <div className="c-menu-header">
                <Button onClick={toShrink}>{props.shrinkText}</Button>
                {/*<Icon name={'fixed'}
                      size={24}
                      className={clsx({shrink})}
                      style={{cursor: "pointer"}}
                      onClick={toggleShrink}/>*/}
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
        <div className={clsx('c-menu-shrink',{expand:!shrink})}>
            <div className="c-menu-shrink-btn"
                 onClick={toExpand}
            >
                {props.expandText}
            </div>
        </div>
    </>
}
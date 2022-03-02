import {useLocation, useNavigate} from "react-router-dom";
import './index.scss'
import clsx from "clsx";
import {Icon} from "../index";
import {MenuOperation} from "./MenuOperation";
import {useControl} from "./useControl";

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
        <MenuOperation shrink={shrink} onMouseEnter={onEnter}/>
    </>
}



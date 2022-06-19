import {useLocation, useNavigate} from "react-router-dom";
import './index.scss'
import clsx from "clsx";
import {Icon} from "../index";
import {MenuOperation} from "./MenuOperation";
import {useControl} from "./useControl";
import {Fragment} from "react";
import {RenderElement} from "../../types";
import {useForceUpdate} from "../../hooks";
import _ from 'lodash'


type MenuOption = {
    text: string,
    to?: string,
    expanded?:boolean,
    children?:MenuOption[]
}

interface MenuProps {
    options: MenuOption[],
    className?: string,
    style?: React.CSSProperties,
    defaultShrink?: boolean,
    shrinkText?:string,
    expandText?:string,
    indent?:number
}

Menu.defaultProps = {
    shrinkText:"收缩",
    expandText:"展开"
}

export default function Menu(props: MenuProps): JSX.Element {
    const {defaultShrink=false} = props;
    const {shrink,toggle,onEnter,onOut,rootShrink} = useControl(defaultShrink);

    return <>
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
                <SubMenu options={props.options} level={1} indent={props.indent}/>
            </div>
        </div>
        <MenuOperation shrink={shrink} onMouseEnter={onEnter}/>
    </>
}

interface SubMenuProps{
    options:MenuOption[]
    level:number
    indent?:number
}
function SubMenu(props:SubMenuProps){
    const {level,indent=24} = props;

    return <>
        {
            props.options.map((option, key) => {
                const style = {paddingLeft:indent*level}
                return <Fragment key={key}>
                    {
                        option.children
                            ? <ParentMenuItem option={option} style={style} level={level}/>
                            : <LeafMenuItem option={option} style={style}/>
                    }
                </Fragment>
            })
        }
    </>
}

interface ParentMenuItemProps{
    style:React.CSSProperties,
    option:MenuOption
    level:number
}
function ParentMenuItem(props:ParentMenuItemProps){
    const {option} = props;
    const {pathname} = useLocation();
    const {forceUpdate} = useForceUpdate()
    const {expanded} = option
    return <>
        <MenuItem className={clsx('parent',{expanded,current:expanded && hasCurrent(option,pathname)})}
                  style={props.style}
                  onClick={()=>{
                      option.expanded = !expanded;
                      forceUpdate()
                  }}>
            <span className="c-menu-item-text">{option.text}</span>
            <Icon name={'arrow-right'} className="c-menu-item-btn"/>
        </MenuItem>
        {expanded || <SubMenu options={option.children || []} level={props.level+1}/>}
    </>
}

function hasCurrent(option:MenuOption,pathname:string):boolean{
    if(!option.children) return option.to === pathname
    return _.some(option.children,(o)=>hasCurrent(o,pathname))
}

interface LeafMenuItemProps{
    style:React.CSSProperties,
    option:MenuOption
}
function LeafMenuItem(props:LeafMenuItemProps){
    const {option} = props
    const {pathname} = useLocation();
    const navigate = useNavigate();

    const {to} = option;
    return <MenuItem className={clsx({current: pathname === to})}
                style={props.style}
                onClick={() => to && navigate(to)}>
        <span className="c-menu-item-text">{option.text}</span>
    </MenuItem>
}

interface MenuItemProps{
    style:React.CSSProperties,
    className:string,
    children:RenderElement,
    onClick:()=>void
}
function MenuItem(props:MenuItemProps){
    return <div className={clsx('c-menu-item', props.className)}
                style={props.style}
                onClick={props.onClick}>
        {props.children}
    </div>
}

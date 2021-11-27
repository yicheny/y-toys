import React from "react";
import styles from "./BookMenu.module.scss";
import {Chapter, KPoint} from "./Book";
import {PointRecord} from "./useCurrentPoint";
import clsx from "clsx";

interface BookMenuProps{
    data: Chapter[],
    currentRecord:PointRecord,
    onClick:(chapter:number,KPoint:number)=>void
}
const BookMenu:React.FC<BookMenuProps> = function (props){
    return <div className={styles.menu}>
        <div className={styles.main}>
            {
                props.data.map((x,i)=>{
                    return <div className={styles.item} key={i}>
                        <div>{x.title}</div>
                        <SubMenu data={x.KPoints} group={i} currentRecord={props.currentRecord} onClick={props.onClick}/>
                    </div>
                })
            }
        </div>
    </div>
}

export default BookMenu

interface SubMenuProps{
    data:KPoint[],
    group:number,
    currentRecord:PointRecord,
    onClick:(chapter:number,KPoint:number)=>void
}
const SubMenu:React.FC<SubMenuProps> = function (props){
    const record = props.currentRecord
    return <div className={styles.subMenu}>
        {
            props.data.map((x,i)=>{
                const active = record.chapter === props.group && record.KPoint === i;
                return <div key={i}
                            onClick={()=>props.onClick(props.group,i)}
                            className={clsx(styles.subItem,{[styles.active]:active})} >
                    知识点{i+1} {x.question}
                </div>
            })
        }
    </div>
}

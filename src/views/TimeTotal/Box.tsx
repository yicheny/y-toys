import React from "react";
import styles from "./index.module.scss";

interface BoxProps {
    className?:string,
    style?:React.CSSProperties,
    children:JSX.Element | JSX.Element[]
}

export default function Box(props:BoxProps){
    return <div className={styles.box}>
        {props.children}
    </div>
}

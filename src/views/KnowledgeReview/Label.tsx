import React from "react";
import styles from "./Lable.module.scss";

interface LabelProps{
    textWidth?:number,
    valueWidth?:number,
    text:string,
    value:string | number
}

const Label:React.FC<LabelProps> = function (props){
    return <div className={styles.label}>
        <span className={styles.text} style={{width:props.textWidth}}>{props.text}</span>
        ：
        <span className={styles.value} style={{width:props.valueWidth}}>{props.value}</span>
    </div>
}

Label.defaultProps = {
    textWidth:72,
    valueWidth:40
}

export default Label;

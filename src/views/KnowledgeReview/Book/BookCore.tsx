import React from "react";
import styles from "./BookCore.module.scss";
import {KPoint} from "./Book";

interface BookCoreProps{
    KPoint:KPoint
}
const BookCore:React.FC<BookCoreProps> = function (props){
    return <div className={styles.bookCore}>
        <div className={styles.status}>

        </div>
        <div className={styles.content}>
            {props.KPoint.question}
        </div>
    </div>
}
export default BookCore;

import React, {useMemo} from "react";
import styles from "./BookCore.module.scss";
import {KPoint, masterEnum} from "./Book";
import {RadioGroup} from "../../../components";

interface BookCoreProps{
    KPoint:KPoint
}
const BookCore:React.FC<BookCoreProps> = function (props){
    const {KPoint} = props;
    return <div className={styles.bookCore}>
        <div className={styles.status}>
            <RadioGroup options={useGetRadioGroupOptions()}
                        value={KPoint.master}/>
        </div>
        <div className={styles.content}>
            {KPoint.question}
        </div>
    </div>
}
export default BookCore;

function useGetRadioGroupOptions(){
    return useMemo(()=>{
        return [
            {text:"未掌握",value:masterEnum.empty},
            {text:"有印象",value:masterEnum.half},
            {text:"完全掌握",value:masterEnum.full},
        ]
    },[])
}

import React, {useRef} from "react";
import styles from './Book.module.scss'
import {useOutsideClick} from "../../../hooks";
import {Button, message} from "../../../components";
import BookMenu from "./BookMenu";
import BookCore from "./BookCore";
import {useCurrentPoint} from "./useCurrentPoint";

export type BookOption = {
    title: string,
    chapters: Chapter[]
}

export type Chapter = {
    title: string,
    KPoints: KPoint[]
}

export enum masterEnum {
    empty,
    half,
    full
}

export type KPoint = {
    question: string,
    answer: string,
    //掌握程度
    master: masterEnum
}

interface BookProps {
    option: BookOption,
    close: () => void
}

const Book: React.FC<BookProps> = function (props) {
    const bookRef = useRef<HTMLDivElement>(null);

    const {record, setRecord, currentPoint, next, prev} = useCurrentPoint(props.option.chapters);

    useOutsideClick(bookRef, props.close)

    return <div className={styles.bookContainer}>
        <div className={styles.book} ref={bookRef}>
            <div className={styles.header}>
                <Button onClick={prev}>上一条</Button>
                <Button onClick={next}>下一条</Button>
                <Button onClick={()=>message.show("暂未实现！")}>章节列表</Button>
            </div>
            <div className={styles.content}>
                <BookMenu data={props.option.chapters}
                          currentRecord={record}
                          onClick={(chapter:number,KPoint:number)=>setRecord({chapter,KPoint})}/>
                <BookCore KPoint={currentPoint}/>
            </div>
            <div className={styles.footer}> </div>
        </div>
    </div>
}

export default Book;

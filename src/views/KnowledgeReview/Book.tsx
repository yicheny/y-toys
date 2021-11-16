import React, {useCallback, useMemo, useRef, useState} from "react";
import styles from './Book.module.scss'
import {useOutsideClick} from "../../hooks";
import _ from 'lodash'
import {Button, Icon, message} from "../../components";

export type BookOption = {
    title: string,
    chapters: Chapter[]
}

type Chapter = {
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

    const {currentPoint, next, prev} = useCurrentPoint(props.option.chapters);

    useOutsideClick(bookRef, props.close)

    return <div className={styles.bookContainer}>
        <div className={styles.book} ref={bookRef}>
            <div className={styles.header}>
                <Button onClick={prev}>上一条</Button>
                <Button onClick={next}>下一条</Button>
                <Button onClick={()=>message.show("暂未实现！")}>章节列表</Button>
            </div>
            <div className={styles.content}>
                <BookMenu chapters={props.option.chapters}/>
                <div className={styles.contentMain}>
                    {currentPoint.question}
                </div>
            </div>
            <div className={styles.footer}> </div>
        </div>
    </div>
}

export default Book;

interface BookMenuProps{
    chapters: Chapter[]
}
const BookMenu:React.FC<BookMenuProps> = function (props){
    return <div className={styles.menu}>
        <div className={styles.menuMain}>
            {
                props.chapters.map((x,i)=>{
                    return <div className={styles.menuItem} key={i}>
                        {x.title}
                    </div>
                })
            }
        </div>
        {/*<div className={styles.menuBtn}>
            <Icon name='fixed' size={24}/>
        </div>*/}
    </div>
}

type PointRecord = {
    chapter: number,
    KPoint: number
}

function useCurrentPoint(chapters: Chapter[]) {
    const [record, setRecord] = useState<PointRecord>({chapter: 0, KPoint: 0})

    const next = useCallback(() => {
        setRecord((r) => {
            if(isEnd()) return r;
            const newRecord = _.clone(r)
            let chapter = chapters[newRecord.chapter];
            if (newRecord.KPoint >= chapter.KPoints.length - 1) {
                newRecord.chapter += 1;
                newRecord.KPoint = 0;

                // TODO chapter,KPoint可能为0
            } else {
                newRecord.KPoint += 1;
            }
            return newRecord;

            function isEnd(){
                const isLastChapter = r.chapter===chapters.length-1;
                const isLastPoint = r.KPoint === chapters[chapters.length-1].KPoints.length-1;
                return isLastChapter && isLastPoint
            }
        })
    }, [chapters])

    const prev = useCallback(()=>{
        setRecord((r) => {
            if(r.chapter===0 && r.KPoint === 0) return r;
            const newRecord = _.clone(r)
            if (newRecord.KPoint <= 0) {
                newRecord.chapter -= 1;
                newRecord.KPoint = chapters[newRecord.chapter].KPoints.length-1;

                // TODO chapter,KPoint可能为0
            } else {
                newRecord.KPoint -= 1;
            }
            return newRecord;
        })
    },[chapters])

    const currentPoint = useMemo(() => {
        const chapter = chapters[record.chapter];
        return chapter.KPoints[record.KPoint];
    }, [record, chapters])

    return {
        currentPoint,
        next,
        prev
    }
}

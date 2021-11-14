import React, {useEffect, useRef} from "react";
import styles from './Book.module.scss'
import _ from 'lodash'

export type BookOption = {
    title:string,
    chapters:Chapter[]
}

type Chapter = {
    title:string,
    KPoints:KPoint[]
}

export enum masterEnum {
    empty,
    half,
    full
}

export type KPoint = {
    question:string,
    answer:string,
    //掌握程度
    master:masterEnum
}

interface BookProps{
    close:React.MouseEventHandler<HTMLDivElement>
}

const Book:React.FC<BookProps> = function (props){
    const bookRef = useRef<HTMLDivElement>(null);

    useOutsideClick(bookRef,props.close)

    return <div className={styles.bookContainer}>
        <div className={styles.book} ref={bookRef}>
            <div className={styles.header}> </div>
            <div className={styles.content}> </div>
            <div className={styles.footer}> </div>
        </div>
    </div>
}

export default Book;

function useOutsideClick(ref:React.RefObject<HTMLElement>,handle:React.MouseEventHandler<HTMLElement>){
    useEffect(()=>{
        const listener = function (event:Event){
            if(!ref.current || ref.current.contains(event.target as Node)) return ;
            if(_.isFunction(handle)) handle(event);
        }
        document.addEventListener('click',listener);

        return ()=>{
            document.removeEventListener('click',listener)
        }
    },[ref,handle])
}

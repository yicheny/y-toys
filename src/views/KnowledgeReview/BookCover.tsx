import React, {useMemo} from 'react';
import styles from './BookCover.module.scss'
import Label from "./Label";

type Option = {
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

type KPoint = {
    question:string,
    answer:string,
    //掌握程度
    master:masterEnum
}

interface BookCoverProps{
    option:Option,
    onClick:React.MouseEventHandler<HTMLDivElement>
}

const BookCover:React.FC<BookCoverProps> = function (props){
    const {option} = props;

    const total = useTotal(option);

    return <div className={styles.bookCover} onClick={props.onClick}>
        <div className={styles.main}>
            <div className={styles.title}>《{option.title}》</div>
            <div className={styles.LabelGroup}>
                <Label text='未掌握' value={total.emptyCount}/>
                <Label text='有印象' value={total.halfCount}/>
                <Label text='完全掌握' value={total.fullCount}/>
            </div>
        </div>
    </div>
}

export default BookCover;

function useTotal(option:Option){
    return useMemo(()=>{
        const KPoints = flatKPoints();
        return {
            emptyCount:getCount(masterEnum.empty),
            halfCount:getCount(masterEnum.half),
            fullCount:getCount(masterEnum.full),
        }

        function getCount(key:masterEnum){
            return KPoints.filter(x=>x.master === key).length;
        }

        function flatKPoints(){
            return option.chapters.reduce((acc:Array<KPoint>,c)=>{
                return acc.concat(c.KPoints)
            },[])
        }
    },[option])
}

// function curryComponent(component: React.FC<any>){
//     const Component = component;
//     return function (curryProps: JSX.IntrinsicAttributes){
//         return function (props: JSX.IntrinsicAttributes){
//             return <Component {...curryProps} {...props}/>
//         }
//     }
// }

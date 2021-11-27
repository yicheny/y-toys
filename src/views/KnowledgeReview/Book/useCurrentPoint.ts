import {useCallback, useMemo, useState} from "react";
import _ from "lodash";
import {Chapter} from "./Book";

export type PointRecord = {
    chapter: number,
    KPoint: number
}

export function useCurrentPoint(chapters: Chapter[]) {
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
        record,
        setRecord,
        currentPoint,
        next,
        prev
    }
}

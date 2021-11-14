import React from 'react';
import _ from 'lodash';
import {Button,message} from "../../components";
import styles from './index.module.scss';
import BookCover from "./BookCover";

const mockData = _.times(50, x => {
    return {
        title:`书籍${x+1}`,
        chapters:_.times(_.random(1,30),(c)=>{
            return {
                title:`章节${c+1}`,
                KPoints:_.times(_.random(1,40),(k)=>{
                    return {
                        question:`知识点${k+1}`,
                        answer:`答案${k+1}`,
                        master:_.random(2)
                    }
                })
            }
        })
    }
})

function KnowledgeReview() {
    return (<div className={styles.view}>
        <div className={styles.operate}>
            <Button onClick={() => message.show('此功能正在开发中！')}>导入新书</Button>
            <Button onClick={() => message.show('此功能正在开发中！')}>更新资料</Button>
        </div>
        <div className={styles.books}>
            {
                _.map(mockData,(k,i)=>{
                    return <BookCover key={i} option={k} onClick={()=>message.show("点击打开详情页开发中！")}/>
                })
            }
        </div>
    </div>);
}

export default KnowledgeReview;

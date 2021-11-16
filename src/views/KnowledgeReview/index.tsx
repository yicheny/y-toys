import React, {useState} from 'react';
import _ from 'lodash';
import {Button,message} from "../../components";
import styles from './index.module.scss';
import BookCover from "./BookCover";
import Book, {BookOption} from "./Book";
import {Nullable} from "../../types";

const mockData = _.times(50, x => {
    return {
        title:`书籍${x+1}`,
        chapters:_.times(_.random(1,25),(c)=>{
            return {
                title:`章节${c+1}`,
                KPoints:_.times(_.random(1,5),(k)=>{
                    return {
                        question:`章节${c+1},知识点${k+1}`,
                        answer:`答案${k+1}`,
                        master:_.random(2)
                    }
                })
            }
        })
    }
})

function KnowledgeReview() {
    const [bookOption,setBookOption] = useState<Nullable<BookOption>>(mockData[0])
    return (<div className={styles.view}>
        <div className={styles.operate}>
            <Button onClick={() => message.show('此功能正在开发中！')}>导入新书</Button>
            {/*<Button onClick={() => message.show('此功能正在开发中！')}>更新资料</Button>*/}
        </div>
        <div className={styles.books}>
            {
                _.map(mockData,(k,i)=>{
                    return <BookCover key={i} option={k} onClick={()=>setBookOption(k)}/>
                })
            }
        </div>
        {
            bookOption && <Book option={bookOption} close={()=>setBookOption(null)}/>
        }
    </div>);
}

export default KnowledgeReview;

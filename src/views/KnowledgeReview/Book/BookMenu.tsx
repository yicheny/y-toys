import React from "react";
import styles from "./BookMenu.module.scss";
import {Chapter} from "./Book";

interface BookMenuProps{
    chapters: Chapter[]
}
const BookMenu:React.FC<BookMenuProps> = function (props){
    return <div className={styles.menu}>
        <div className={styles.main}>
            {
                props.chapters.map((x,i)=>{
                    return <div className={styles.item} key={i}>
                        {x.title}
                    </div>
                })
            }
        </div>
        {/*<div className={styles.btnGroup}>
            <Icon name='fixed' size={24}/>
        </div>*/}
    </div>
}

export default BookMenu

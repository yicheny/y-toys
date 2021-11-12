import React, {useCallback, useState} from 'react'
import _ from 'lodash'
import {TextArea,Button,message} from "../../components";
import Total from "./Total";
import Box from "./Box";
import styles from './index.module.scss'

class Store{
    private readonly _key: string;
    private readonly _storage = sessionStorage;

    constructor(key:string) {
        this._key = key;
    }

    public save(data:string){
        this._storage.setItem(this._key,data)
    }

    public read(){
        return this._storage.getItem(this._key) || ''
    }
}

const store = new Store('time-total')

export default function TimeTotal():JSX.Element{
    const [totalData,setTotalData] = useState<Total>(new Total(''));

    const handleChange = useCallback((e)=>{
        setTotalData(new Total(e.target.value))
    },[])

    const save = useCallback(()=>{
        store.save(totalData.getSource())
        message.show('存储成功！')
    },[totalData])

    const read = useCallback(()=>{
        setTotalData(new Total(store.read()))
        message.show('读取成功！')
    },[])

    return <Box>
        <TextArea style={{width:480,height:320}} onChange={handleChange} value={totalData.getSource()}/>
        <div className={styles.buttonGroup}>
            <Button onClick={save}>存储</Button>
            <Button onClick={read}>读取</Button>
        </div>
        <div>
            {_.map(totalData?.totalInfo(),(x,i)=>{
                return <div key={i}>
                    {x}
                </div>
            })}
        </div>
    </Box>
}

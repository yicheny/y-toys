import React, {useCallback, useState} from 'react'
import _ from 'lodash'
import {TextArea} from "../../components";
import Total from "./Total";
import Box from "./Box";

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
        alert('存储成功！')
    },[totalData])

    const read = useCallback(()=>{
        setTotalData(new Total(store.read()))
    },[])

    return <Box>
        <TextArea style={{width:480,height:320}} onChange={handleChange} value={totalData.getSource()}/>
        <button onClick={save}>存储</button>
        <button onClick={read}>读取</button>
        <div>
            {_.map(totalData?.totalInfo(),(x,i)=>{
                return <div key={i}>
                    {x}
                </div>
            })}
        </div>
    </Box>
}

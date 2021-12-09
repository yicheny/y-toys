import React from 'react';
import _ from 'lodash'

// type TKey = string;

// abstract class DB {
//     //查询到符合条件的第一个对象
//     public abstract querySync(key: TKey): any;
//
//     //查询到符合条件的所有对象
//     public abstract queryAllSync(key: TKey): any[];
//
//     public abstract update(key: TKey, data: any): void;
//
//     public abstract delete(key: TKey): void;
//
//     public abstract clear(): void;
// }

type Nullable<T> = T | null;

interface IIndexDB {
    dbName: string,
    version: number,
    storeNames:string[],
}

//https://developer.mozilla.org/zh-CN/docs/Web/API/IndexedDB_API

class IndexDB {
    private readonly DBRequest: IDBOpenDBRequest;
    private readonly dbName: string;
    private readonly version: number;
    private readonly storeNames: string[];
    private dbTransaction: Nullable<IDBTransaction>;
    private readonly dbRequest: Promise<IDBDatabase>;

    constructor(setting: IIndexDB) {
        const {dbName, version, storeNames } = setting;
        this.DBRequest = window.indexedDB.open(dbName, version);
        this.dbName = dbName
        this.version = version
        this.storeNames =  storeNames
        this.dbTransaction = null;
        this.dbRequest = this.initMessage();
    }

    private initMessage(){
        return new Promise((resolve:(db:IDBDatabase)=>void,reject)=>{
            this.DBRequest.onerror = (event)=>{
                reject(event)
                console.error(`数据库${this.dbName}(版本${this.version}) 连接失败！`,event)
            }
            this.DBRequest.onsuccess = ()=>{
                resolve(this.DBRequest.result)
                console.log(`数据库${this.dbName}(版本${this.version}) 连接成功！`)
            }
            this.DBRequest.onupgradeneeded = ((e)=>{
                const db = _.get(e,'target.result')
                this.storeNames.forEach((storeName)=>{
                    const store = db.createObjectStore(storeName,{
                        keyPath:"_id",
                        autoIncrement:true
                    })

                    //name参数随意，keyPath必须和createObjectStore设置的keyPath保持一致
                    store.createIndex('_id','_id',{unique:true})
                })
                console.log(`数据库${this.dbName}(版本${this.version}) 更新成功！`)
            })
        })
    }

    private async getTransaction():Promise<IDBTransaction>{
        if(!this.dbTransaction) {
            const db = await this.dbRequest
            this.dbTransaction = db.transaction(this.storeNames,'readwrite')
        }
        return this.dbTransaction
    }

    public async getStore(storeName:string){
        return (await this.getTransaction()).objectStore(storeName)
    }
}



export default function IndexDBDemo() {
    return (<div>
        IndexDBDemo
    </div>)
};

function main(){
    const db = new IndexDB({
        dbName:"ylf_db",
        version:2,
        storeNames:[
            'store1',
            'store2'
        ]
    });

    db.getStore('store2').then(store=>{
        store.add({value:1,children:{value:1}})
        store.add({value:2})
        store.add({value:3})
    })
}


import _ from "lodash";

export type record = {
    [key:string]:any
}

export type key = number | string;

export interface IndexTableProps{
    db:Promise<IDBDatabase>
    name:string,
    //支持跨表查询，默认只能查询当前表数据
    storeNames?:string[]
}

interface ITable{
     add(record:record):void;
     delete(key:key):void;
     put(record:record):void;
     get(key:key):Promise<record>,
     getAll():Promise<record[]>,
     count():Promise<number>;
     clear():void;
}

export default class IndexTable implements ITable{
    private readonly name:string
    private readonly storeNames:Array<string>
    private readonly db:Promise<IDBDatabase>

    constructor(props:IndexTableProps) {
        const {db,storeNames,name} = props;
        this.name = name;
        this.storeNames = storeNames || [this.name]
        this.db = db;
    }

    private async getTransaction():Promise<IDBTransaction>{
        const db = await this.db;
        return db.transaction(this.storeNames,'readwrite');
    }

    private async getStore(){
        const transition = await this.getTransaction();
        return transition.objectStore(this.name)
    }

    private async packListener(callback: { (): Promise<IDBRequest<any>>; }):Promise<any>{
        return new Promise(async (resolve,reject) => {
            const event = await callback();
            event.onsuccess = (e) => {
                resolve(_.get(e,'target.result'))
            }
            event.onerror = (e)=>{
                reject(e)
            }
        });
    }

    async add(record:record){
        return (await this.getStore()).add(record)
    }

    async delete(key:key){
        return (await this.getStore()).delete(key)
    }

    async count(): Promise<number> {
        return this.packListener(async ()=>(await this.getStore()).count())
    }

    async clear(){
        return (await this.getStore()).clear();
    }

    //更新或插入
    async put(value:record){
        return (await this.getStore()).put(value)
    }

    async get(key: key):Promise<record> {
        return this.packListener(async ()=>(await this.getStore()).get(key))
    }

    async getAll():Promise<record[]> {
        return this.packListener(async ()=>(await this.getStore()).getAll())
    }
}

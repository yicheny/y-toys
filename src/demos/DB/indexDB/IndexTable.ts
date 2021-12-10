import _ from "lodash";

type record = {
    [key:string]:any
}

type key = number | string;

interface IndexTableProps{
    db:Promise<IDBDatabase>
    name:string,
    //支持跨表查询，默认只能查询当前表数据
    storeNames?:string[]
}

export default class IndexTable{
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

    async add(record:record){
        return (await this.getStore()).add(record)
    }

    async delete(key:key){
        return (await this.getStore()).delete(key)
    }

    async count(){
        return new Promise(async (resolve,reject) => {
            const count = (await this.getStore()).count()
            count.onsuccess = (e) =>{
                resolve(_.get(e,'target.result'))
            }
            count.onerror = (e)=>{
                reject(e)
            }
        });
    }

    async clear(){
        return (await this.getStore()).clear();
    }

    //更新或插入
    async put(value:record){
        return (await this.getStore()).put(value)
    }
}

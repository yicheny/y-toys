import _ from "lodash";

type record = {
    [key:string]:any
};
// type filed = string;
type filedValue = any;
type Nullable<T> = T | null;

interface IDB{
    get(key:string):record[],
    set(key:string,value:record[]):void,
    remove(key:string):void,
    clear():void
}

interface ILocalTableOptions{
    name:string,
    primaryKey:string
}

class LocalDB implements IDB{
    private static INSTANCE: LocalDB;
    private readonly storage: Storage;

    static create(){
        if(!LocalDB.INSTANCE) LocalDB.INSTANCE = new LocalDB();
        return LocalDB.INSTANCE;
    }

    private constructor() {
        this.storage = localStorage;
    }

    get(key: string): record[] {
        const result = this.storage.getItem(key);
        return _.isString(result) ? JSON.parse(result) : [];
    }

    set(key: string, value: record[]): void {
        this.storage.setItem(key,JSON.stringify(value))
    }

    clear(): void {
        this.storage.clear()
    }

    remove(key: string): void {
        this.storage.removeItem(key)
    }

    createStore(options:ILocalTableOptions){
        return new LocalTable(this,options)
    }

    createStores(keys:string[]){

    }
}

//暂时不需要支持回调类型的函数
// type FCondition = (record:record)=>boolean;

interface ITable{
    addOne(record:record):void,
    addMany(record:record[]):void,
    deleteOne(value:filedValue): void,
    deleteMany(values:filedValue[]): void,
    updateOne(record:record):void,
    updateMany(records:record[]):void,
    selectOne(value:filedValue):Nullable<record>,
    selectMany(values:filedValue[]):Nullable<Array<record>>
    set(data:record | record[]):void,
    clear():void,
}

//三种选择：Relation、Table、Store
class LocalTable implements ITable{
    private readonly name: string;
    private readonly db: LocalDB;
    private readonly primaryKey:string;
    //当前使用的索引
    private readonly currentIndexKey:string;

    constructor(db:LocalDB,options:ILocalTableOptions) {
        this.db = db;
        this.name = options.name;
        this.currentIndexKey = this.primaryKey = options.primaryKey;
    }

    private get records(){
        return this.db.get(this.name);
    }

    private setRecords(records:record[]){
        this.db.set(this.name,records)
    }

    selectOne(value:filedValue): Nullable<record> {
        const result = this.records.find((record:record)=>{
            return record[this.currentIndexKey] === value;
        })
        return result || null;
    }

    selectMany(values:filedValue[]): Nullable<record[]> {
        return this.records.filter((record:record)=>{
            return values.includes(record[this.currentIndexKey])
        })
    }

    //如果没有对应主键，则插入；如果存在对应主键，则更新
    set(data:record | record[]){
        throw new Error('等待实现!')
    }

    private checkUniqKey(record:record):void{
        const currentIndex = record[this.currentIndexKey];
        this.records.forEach((record)=>{
            if(record[this.currentIndexKey] === currentIndex) throw new Error(`当前插入项，主键${currentIndex}已存在，插入失败！`)
        })
    }

    addOne(record: record): void {
        this.checkUniqKey(record);
        const list = this.records;
        list.push(record);
        this.setRecords(list)
    }

    private getKeySetWithCheck(records:record[],keyword:string){
        const keys = records.map(record => record[this.primaryKey]);
        const keySet = new Set(keys);
        if(keys.length !== keySet.size) throw new Error(`当前传入数组内部记录主键不唯一，${keyword}失败！`)
        return keySet
    }

    addMany(records: record[]): void {
        const keySet = this.getKeySetWithCheck(records, '插入');
        records.forEach(record => {
            if(keySet.has(record[this.currentIndexKey])) throw new Error(`当前传入数组，与原本的记录主键冲突，插入失败！`)
        })
        const list = this.records.concat(records);
        this.setRecords(list)
    }

    deleteOne(value: filedValue) {
        const result = this.records.filter(record => record[this.currentIndexKey] !== value);
        this.setRecords(result);
    }

    deleteMany(values: filedValue[]) {
        const result = this.records.filter(record =>  !values.includes(record[this.currentIndexKey]));
        this.setRecords(result);
    }

    clear(){
        this.db.remove(this.name)
    }

    updateMany(records: record[]): void {
        this.getKeySetWithCheck(records, '更新');

        const recordMap = this.records.reduce((acc,record)=>{
            acc.set(record[this.currentIndexKey],record)
            return acc;
        }, new Map())

        records.forEach(record=>{
            const currentIndex = record[this.currentIndexKey];
            const item = recordMap.get(currentIndex);
            if(item) recordMap.set(currentIndex,_.assign(item,record));
        })

        this.setRecords([...recordMap.values()])
    }

    updateOne(record: record): void {
        const currentIndex = record[this.currentIndexKey];
        const result = this.records.map((item)=>{
            return item[this.currentIndexKey] === currentIndex ? _.assign(item,record) :  item;
        })
        this.setRecords(result)
    }
}

export default function createDB(){
    return LocalDB.create();
}

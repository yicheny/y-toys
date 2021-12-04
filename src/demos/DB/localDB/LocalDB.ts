import _ from "lodash";

type record = {
    [key:string]:any
};
type filed = any;
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
    deleteOne(value:filed): void,
    deleteMany(values:filed[]): void,
    updateOne(record:record):void,
    updateMany(records:record[]):void,
    selectOne(value:filed):Nullable<record>,
    selectMany(values:filed[]):Nullable<Array<record>>
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

    selectOne(value:filed): Nullable<record> {
        const result = this.records.find((record:record)=>{
            return record[this.currentIndexKey] = value;
        })
        return result || null;
    }

    selectMany(values:filed[]): Nullable<record[]> {
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

    private checkUniqKeys(records:record[]){
        const keys = records.map(record => record[this.primaryKey]);
        const keysSet = new Set(keys);
        if(keys.length !== keysSet.size) throw new Error("当前传入数组内部记录主键不唯一，插入失败！")
        records.forEach(record => {
            if(keysSet.has(record[this.currentIndexKey])) throw new Error("当前传入数组，与原本的记录主键冲突，插入失败！")
        })
    }

    addMany(records: record[]): void {
        this.checkUniqKeys(records);
        const list = this.records.concat(records);
        this.setRecords(list)
    }

    deleteOne(value: filed) {
        const result = this.records.filter(record => record[this.currentIndexKey] !== value);
        this.setRecords(result);
    }

    deleteMany(values: filed[]) {
        const result = this.records.filter(record =>  !values.includes(record[this.currentIndexKey]));
        this.setRecords(result);
    }

    clear(){
        this.db.remove(this.name)
    }

    updateMany(records: record[]): void {

    }

    updateOne(record: record): void {

    }
}

export default function createDB(){
    return LocalDB.create();
}

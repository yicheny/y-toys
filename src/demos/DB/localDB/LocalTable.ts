import {Nullable} from "../../../types";
import _ from "lodash";
import {filedValue, LocalDB, record} from "./LocalDB";

//暂时不需要支持回调类型的函数
// type FCondition = (record:record)=>boolean;

//TODO 考虑是否添加一个API用于约定数据结构
export interface ILocalTableOptions{
    name:string,
    primaryKey:string
}

export interface ITable{
    addOne(record:record):void,
    addMany(record:record[]):void,
    deleteOne(value:filedValue): void,
    deleteMany(values:filedValue[]): void,
    updateOne(record:record):void,
    updateMany(records:record[]):void,
    selectOne(value:filedValue):Nullable<record>,
    selectMany(values:filedValue[]):Array<record>,
    selectAll():Array<record>,
    set(data:record | record[]):void,
    clear():void,
}

//三种名称选择：Relation、Table、Store
export class LocalTable implements ITable{
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

    selectMany(values:filedValue[]): record[] {
        return this.records.filter((record:record)=>{
            return values.includes(record[this.currentIndexKey])
        })
    }

    selectAll(): record[] {
        return this.records;
    }

    //如果没有对应主键，则插入；如果存在对应主键，则更新
    set(data:record | record[]){

    }

    private checkUniqKey(record:record):void{
        const currentIndex = record[this.currentIndexKey];
        this.records.forEach((record)=>{
            if(record[this.currentIndexKey] === currentIndex) throw new Error(`当前插入项，当前索引键${this.currentIndexKey}值为${currentIndex}已存在，插入失败！`)
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
        this.records.forEach(record => {
            if(keySet.has(record[this.currentIndexKey])) throw new Error(`当前传入数组，与原本的表记录索引冲突，插入失败！`)
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

import _ from "lodash";
import {ILocalTableOptions, LocalTable} from "./LocalTable";
import {Storage} from '../../base'

export type record = {
    [key:string]:any
};
// type filed = string;
export type filedValue = any;

interface IDB{
    get(key:string):record[],
    set(key:string,value:record[]):void,
    remove(key:string):void,
    clear():void
}

interface LocalDBProps{
    storage?:Storage
}

export class LocalDB implements IDB{
    private static INSTANCE: LocalDB;
    private readonly storage: Storage;

    static create(props:LocalDBProps){
        if(!LocalDB.INSTANCE) LocalDB.INSTANCE = new LocalDB(props);
        return LocalDB.INSTANCE;
    }

    private constructor(props:LocalDBProps) {
        this.storage = (props.storage instanceof Storage) ? props.storage : localStorage;
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

    createTable(options:ILocalTableOptions){
        return new LocalTable(this,options)
    }

    createTables(keys:string[]){
        throw new Error("待实现！")
    }
}


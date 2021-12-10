import React, {useMemo, useState} from 'react';
import PIndexDB, {PIndexDBProps} from "./PIndexDB";
import IndexTable, {key, record} from "./IndexTable";
import {createLog, createToString} from "../../../components/utils";
import styles from './index.module.scss';
import {Button} from "../../../components";
import _ from 'lodash'

// main();

const log = createLog({commonInfo:"command执行----",logCallback:()=>{}});
const toString = createToString();

const MSG_NO_TABLE = "尚未获取表，请先获取对应表再进行操作！";

class Command{
    private db?: PIndexDB;
    private table?:IndexTable;

    // private executeTableCommand(){
    //
    // }

    linkDB(props:PIndexDBProps){
        if(this.db) return log.log("数据库已连接，不需要再次连接！");
        this.db = PIndexDB.create(props)
        log.log("数据库成功连接！")
    }

    linkTable(name:string){
        if(!this.db) return log.log("尚未连接数据库，请先连接数据库！");
        this.table = this.db.getTable(name)
        log.log(`已成功获取表${name}！`)
    }

    async add(record:record){
        if(!this.table) return log.log(MSG_NO_TABLE);
        await this.table.add(record)
        log.log("add方法已执行！")
    }

    async put(record:record){
        if(!this.table) return log.log(MSG_NO_TABLE);
        await this.table.add(record)
        log.log("put方法已执行！")
    }

    async delete(key:key){
        if(!this.table) return log.log(MSG_NO_TABLE);
        await this.table.delete(key)
        log.log("delete方法已执行！")
    }

    async count(){
        if(!this.table) return log.log(MSG_NO_TABLE);
        await this.table.count()
        log.log("count方法已执行！")
    }

    async clear(){
        if(!this.table) return log.log(MSG_NO_TABLE);
        await this.table.clear()
        log.log("clear方法已执行！")
    }

    async get(key:key){
        if(!this.table) return log.log(MSG_NO_TABLE);
        const result = await this.table.get(key)
        log.log("get方法已执行！")
        log.log(`getAll执行结果为：${JSON.stringify(result)}`)
    }

    async getAll(){
        if(!this.table) return log.log(MSG_NO_TABLE);
        const result = await this.table.getAll();
        log.log("getAll方法已执行！")
        log.log(`getAll执行结果为：\n${toString.array(result)}`)
    }
}

interface ProxyProps{
    visitor:Command,
    setState:(arg:any)=>any
}

enum actionEnum{
    linkDB="linkDB",
    linkTable="linkTable",
    add="add",
    put="put",
    delete="delete",
    get="get",
    getAll="getAll",
    count="count",
    clear="count"
}

class Proxy{
    private readonly visitor: Command;
    private readonly setState: (arg: any) => any;

    constructor(props:ProxyProps) {
        this.visitor = props.visitor;
        this.setState = props.setState;
    }

    async executor(actionKey:actionEnum,...params:any[]){
        const action = this.visitor[actionKey]
        if(_.isFunction(action)) {
            // @ts-ignore
            await this.visitor[actionKey](...params);
            this.setState(_.clone(log.getInfo()))
        }
    }
}

export default function IndexDBDemo() {
    const [texts,setTexts] = useState<Array<any>>([])

    const proxyCommand = useMemo(()=>{
        return new Proxy({
            visitor:new Command(),
            setState:setTexts
        })
    },[])

    return (<div className={styles.view}>
        <div className={styles.operation}>
            <Button onClick={(e)=>proxyCommand.executor(actionEnum.linkDB,{
                dbName:'test-db',
                version:4,
                tableOptions:[
                    {name:'test-table',primaryKey:'id'}
                ]
            })}>
                连接数据库
            </Button>
            <Button onClick={(e)=>proxyCommand.executor(actionEnum.linkTable,'test-table')}>
                获取表
            </Button>
            <Button onClick={(e)=>proxyCommand.executor(actionEnum.getAll)}>
                展示全部数据
            </Button>
        </div>
        <div className={styles.show}>
            {
                texts.map((x,i)=>{
                    return <div key={i} className={styles.line}>{x}</div>
                })
            }
        </div>
    </div>)
};

async function main(){
    const db = PIndexDB.create({
        dbName:'test-db',
        version:4,
        tableOptions:[
            {name:'test-table',primaryKey:'id'}
        ]
    })
    const table = db.getTable('test-table')

    // console.log(await table.getAll())
    //
    // console.log(await table.get(3))

    // table.add({id:1,value:1})
    // table.add({id:2,value:2})
    // table.add({id:3,value:3})

    // const count = await table.count()
    // console.log(count);

    // table.put({id:3,value:300})
    // table.put({id:4,value:4})

    // table.delete('1');
    // table.delete(2)

    // table.clear()
}

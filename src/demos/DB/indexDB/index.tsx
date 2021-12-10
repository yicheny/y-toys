import React, {useMemo} from 'react';
import PIndexDB, {PIndexDBProps} from "./PIndexDB";
import IndexTable, {key, record} from "./IndexTable";
import {createLog} from "../../../components/utils";

// main();

const log = createLog();

const MSG_NO_TABLE = "尚未获取表，请先获取对应表再进行操作！";

class Command{
    private db?: PIndexDB;
    private table?:IndexTable

    linkDB(props:PIndexDBProps){
        if(this.db) return log.log("数据库已连接，不需要再次连接！");
        this.db = PIndexDB.create(props)
        log.log("数据库成功连接！")
    }

    getTable(name:string){
        if(!this.db) return log.log("尚未连接数据库，请先连接数据库！");
        this.table = this.db.getTable(name)
        log.log(`已成功获取表${name}！`)
    }

    async add(record:record){
        if(!this.table) return log.log(MSG_NO_TABLE);
        await this.table.add(record)
        log.log("add已执行！")
    }

    async put(record:record){
        if(!this.table) return log.log(MSG_NO_TABLE);
        await this.table.add(record)
        log.log("put已执行！")
    }

    async delete(key:key){
        if(!this.table) return log.log(MSG_NO_TABLE);
        await this.table.delete(key)
        log.log("delete已执行！")
    }

    async count(){
        if(!this.table) return log.log(MSG_NO_TABLE);
        await this.table.count()
        log.log("count已执行！")
    }

    async clear(){
        if(!this.table) return log.log(MSG_NO_TABLE);
        await this.table.clear()
        log.log("clear已执行！")
    }
}

export default function IndexDBDemo() {
    const command = useMemo(()=>new Command(),[])

    return (<div>
        IndexDBDemo
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

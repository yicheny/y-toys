import React, {useMemo, useState} from 'react';
import PIndexDB, {PIndexDBProps} from "./PIndexDB";
import IndexTable, {key, record} from "./IndexTable";
import {createLog, createToString} from "../../../utils";
import styles from './index.module.scss';
import {Button, Input, Select} from "../../../components";
import _ from 'lodash'
import {RenderElement} from "../../../types";

// main();

const log = createLog({
    commonInfo: "command执行----", logCallback: () => {
    }
});
const toString = createToString();

const MSG_NO_TABLE = "尚未获取表，请先获取对应表再进行操作！";

class Command {
    private db?: PIndexDB;
    private table?: IndexTable;

    // private executeTableCommand(){
    //
    // }

    linkDB(props: PIndexDBProps) {
        if (this.db) return log.log("数据库已连接，不需要再次连接！");
        this.db = PIndexDB.create(props)
        log.log("数据库成功连接！")
    }

    linkTable(name: string) {
        if (!this.db) return log.log("尚未连接数据库，请先连接数据库！");
        this.table = this.db.getTable(name)
        log.log(`已成功获取表${name}！`)
    }

    getDB() {
        return this.db;
    }

    async getAllTableNames() {
        if (!this.db) return log.log("尚未连接数据库，请先连接数据库！");
        const names = await this.db.getAllTableNames();
        log.log(`已成功获取所有表名${toString.array(names)}`)
        return names;
    }

    async add(record: record) {
        if (!this.table) return log.log(MSG_NO_TABLE);
        await this.table.add(record)
        log.log("add方法已执行！")
    }

    async put(record: record) {
        if (!this.table) return log.log(MSG_NO_TABLE);
        await this.table.add(record)
        log.log("put方法已执行！")
    }

    async delete(key: key) {
        if (!this.table) return log.log(MSG_NO_TABLE);
        await this.table.delete(key)
        log.log("delete方法已执行！")
    }

    async count() {
        if (!this.table) return log.log(MSG_NO_TABLE);
        const count = await this.table.count()
        log.log("count方法已执行！")
        log.log(`当前表有${count}条数据!`)
    }

    async clear() {
        if (!this.table) return log.log(MSG_NO_TABLE);
        await this.table.clear()
        log.log("clear方法已执行！")
    }

    async get(key: key) {
        if (!this.table) return log.log(MSG_NO_TABLE);
        const result = await this.table.get(key)
        log.log("get方法已执行！")
        log.log(`getAll执行结果为：${JSON.stringify(result)}`)
    }

    async getAll() {
        if (!this.table) return log.log(MSG_NO_TABLE);
        const result = await this.table.getAll();
        log.log("getAll方法已执行！")
        log.log(`getAll执行结果为：\n${toString.array(result)}`)
    }
}

interface ProxyProps {
    visitor: Command,
    setState: (arg: any) => any
}

enum actionEnum {
    linkDB = "linkDB",
    linkTable = "linkTable",
    getAllTableNames = 'getAllTableNames',
    add = "add",
    put = "put",
    delete = "delete",
    get = "get",
    getAll = "getAll",
    count = "count",
    clear = "clear",
    getDB = "getDB"
}

class Proxy {
    private readonly visitor: Command;
    private readonly setState: (arg: any) => any;

    constructor(props: ProxyProps) {
        this.visitor = props.visitor;
        this.setState = props.setState;
    }

    //TODO 代理执行方法如何兼容所有返回值？
    async executor(actionKey: actionEnum, ...params: any[]) {
        const action = this.visitor[actionKey]
        if (_.isFunction(action)) {
            // @ts-ignore
            const result = await this.visitor[actionKey](...params);
            this.setState(_.clone(log.getInfo()))
            return result;
        }
    }
}

export default function IndexDBDemo() {
    const [texts, setTexts] = useState<Array<any>>([])
    const [nameOptions, setNameOptions] = useState([])
    const [deleteKey,setDeleteKey] = useState<string>('');

    const proxyCommand = useMemo(() => {
        return new Proxy({
            visitor: new Command(),
            setState: setTexts
        })
    }, [])

    return (<div className={styles.view}>
        <div className={styles.operation}>
            <Row>
                <Button onClick={() => proxyCommand.executor(actionEnum.linkDB, {
                    dbName: 'test-db',
                    version: 6,
                    tableOptions: [
                        {name: 'test-table', primaryKey: 'id'},
                        {name: 'test-table2', primaryKey: 'id'},
                        {name: 'test-table3', primaryKey: 'id'},
                    ]
                })}>
                    连接数据库
                </Button>
                <Select options={nameOptions}
                        placeholder='请选择指定表'
                        onChange={(v) => {
                            proxyCommand.executor(actionEnum.linkTable, v)
                        }}/>
                <Button onClick={async () => {
                    const names = await proxyCommand.executor(actionEnum.getAllTableNames)
                    if (Array.isArray(names)) {
                        // @ts-ignore
                        setNameOptions(names.map((name) => {
                            return {text: name, value: name}
                        }))
                    }
                }}>
                    获取所有表名
                </Button>
            </Row>
            <Row>
                <Button onClick={()=>proxyCommand.executor(actionEnum.count)}>展示行数</Button>
                <Button onClick={() => proxyCommand.executor(actionEnum.getAll)}>
                    展示全部数据
                </Button>
            </Row>
            <Row>
                <Button onClick={() => proxyCommand.executor(actionEnum.put, {id: Date.now(), text: Date.now()})}>
                    新增数据
                </Button>
                <Input onChange={setDeleteKey} placeholder={'请输入键值以便删除'}/>
                <Button onClick={()=> proxyCommand.executor(actionEnum.delete,Number(deleteKey))}>
                    删除数据
                </Button>
                <Button onClick={()=>proxyCommand.executor(actionEnum.clear)}>清空数据</Button>
            </Row>
        </div>
        <div className={styles.show}>
            {
                texts.map((x, i) => {
                    return <div key={i} className={styles.line}>{x}</div>
                })
            }
        </div>
    </div>)
};

function Row(props: { children: RenderElement }){
    return <div style={{margin:12}}>
        {props.children}
    </div>
}

/*async function main() {
    const db = PIndexDB.create({
        dbName: 'test-db',
        version: 6,
        tableOptions: [
            {name: 'test-table', primaryKey: 'id'},
            {name: 'test-table2', primaryKey: 'id'},
            {name: 'test-table3', primaryKey: 'id'},
        ]
    })
    const table = db.getTable('test-table2')
    await table.put({value: 1, id: 1})

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
}*/

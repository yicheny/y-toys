import _ from "lodash";
import IndexTable from "./IndexTable";

interface tableOption{
    name:string,
    //目前主键交由开发者指定，而非自动生成
    //需要注意的是，主键要求唯一，主键已存在时，相同主键的记录不会被插入
    primaryKey:string,
}

export interface PIndexDBProps{
    dbName: string,
    version: number,
    tableOptions:tableOption[]
}

export default class PIndexDB{
    private readonly DBRequest: IDBOpenDBRequest;
    private readonly dbName: string;
    private readonly version: number;
    private readonly tableOptions:tableOption[];
    private readonly db: Promise<IDBDatabase>;
    private static INSTANCE:PIndexDB;

    static create(props:PIndexDBProps){
        if(!PIndexDB.INSTANCE) PIndexDB.INSTANCE = new PIndexDB(props)
        return PIndexDB.INSTANCE;
    }

    private constructor(props:PIndexDBProps) {
        const {dbName, version,tableOptions } = props;

        this.DBRequest = window.indexedDB.open(dbName, version);
        this.dbName = dbName
        this.version = version
        this.tableOptions = tableOptions;
        this.db = this.init();
    }

    private init(){
        return new Promise((resolve:(db:IDBDatabase)=>void,reject)=>{
            this.DBRequest.onerror = (event)=>{
                reject(event)
                console.error(`数据库${this.dbName}(版本${this.version}) 连接失败！`,event)
            }

            this.DBRequest.onsuccess = ()=>{
                resolve(this.DBRequest.result)
                console.log(`数据库${this.dbName}(版本${this.version}) 连接成功！`)
            }

            //查了一下资料，发现indexedDB数据里对象存储区的创建和删除只能在onupgradeneeded进行
            //这里是我们唯一可以修改数据库结构的地方
            //相关资料：https://developer.mozilla.org/zh-CN/docs/Web/API/IndexedDB_API/Using_IndexedDB
            this.DBRequest.onupgradeneeded = ((e)=>{
                const db = _.get(e,'target.result')
                this.createTables(db)
                console.log(`数据库${this.dbName}(版本${this.version}) 更新成功！`)
            })
        })
    }

    //关于数据库更新，涉及到一个问题
    //例如我们希望将版本从2升级到3
    //其中版本2存在表student，版本3希望在保留版本2所有表的同时添加一个新的表teacher
    //那么在版本3对于版本2的表是不能重复性创建的【实际上创建上个版本已有的表会报错】
    //因此，一般情况下，更新时需要拿到版本2的表进行过滤
    private filterExistTable(db:IDBDatabase){
        return this.tableOptions.filter(option=>!db.objectStoreNames.contains(option.name))
    }

    private createTables(db:IDBDatabase){
        this.filterExistTable(db).forEach(option=>{
            const store = db.createObjectStore(option.name,{
                keyPath:option.primaryKey,
                autoIncrement:false,
            })

            store.createIndex(option.primaryKey,option.primaryKey,{unique:true})
            console.log(`表${option.name}创建完成，设置主键为${option.primaryKey}！`)
        })
    }

    // createTable(option:IndexTableOption){}

    getTable(name:string){
        return new IndexTable({db:this.db,name})
    }
}

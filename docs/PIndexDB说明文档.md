[TOC]

# 使用示例
## 1. 连接数据库
`PIndexDB`实例只能通过`PIndexDB.create()`方法创建，这里使用了单例方法模式，设计上限定全局只能有唯一的`IndexDB`数据库。

写法示例：
```ts
import PIndexDB from "./PIndexDB";

const db = PIndexDB.create({
    dbName:"test-db",
    version:1,
    tableOptions:[
        {name:"test-table",primaryKey:"id"}
    ]
});
```

`create()`在初始化`PIndexDB`时会尝试打开数据库，如果没有指定的数据库则会进行创建，涉及三种事件：
1. 成功：触发则表明连接成功
2. 失败：触发则表明连接失败
3. 更新：一般来说，如果数据库名称或者版本号变化会触发这个事件，这里是我们**唯一**可以调整数据库结构的地方，如果我们需要删除或者增加表时，会使用到这个事件，通常我们的选择是升级版本。

关于`create()`的接口定义：
```ts
interface tableOption{
    name:string,
    primaryKey:string,
}

interface PIndexDBProps{
    dbName: string,
    version: number,
    tableOptions:tableOption[]
}
```
`dbName`指定数据库名，`version`指定数据库版本

关于`tableOptions`，它用于创建表，可以看到它是一个`tableOption`组成的数组，每一个`tableOption`创建一个表。

我们看一下`tableOption`，它用于创建表，它由以下属性构成：
1. `name`：表名称
2. `primaryKey`：主键，我们强制要求每个表必须有主键，且主键必须唯一

## 2. 获取指定表
我们操作数据是以表为单位进行的，数据存放在表里，表存放在数据库里，如图：

![](https://pic.imgdb.cn/item/61b1cf612ab3f51d91d808f7.jpg)

观察这个图可以知道，如果我们想要进行表级别的操作，比如说删除表、增加表，那么应该使用`PIndexDB`实例进行操作。

我们将数据放在对应的表里面，如果想要操作表里面的数据，比如插入一条数据，删除一条数据，或者更新一条数据，我们操作的对象都是表，而非数据库。

从这个图里我们也知道，一个数据库里是有很多张表存在的，`PIndexDB`不应该负责数据级别的处理。

所以，在我们的设计中，如果我们想要对表进行操作，应该通过`PIndexDB.getTable()`方法获取一个`IndexTable`实例，然后对其进行操作，比如：
```ts
const table = db.getTable('test-table')
```

## 3. 进行数据操作
获取表之后就可以进行数据操作了，目前提供以下5个方法进行操作：
1. `async add(record)` 添加数据
2. `async delete(key)` 删除数据
3. `async put(record)` 更新或添加数据
4. `async count()` 获取当前记录数量
5. `async clear()` 清空数据

写法示例：
```ts
await table.add({id:1,value:1})

await table.put({id:1,value:100});//更新
await table.put({id:2,value:2});//增加

await table.delete(1);

await table.count();//1

await table.clear()
```

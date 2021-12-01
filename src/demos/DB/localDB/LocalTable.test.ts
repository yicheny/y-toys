import {LocalDB} from "./LocalDB";
import {mockStorage} from "../../base";
import {assert} from "chai";

describe('localTable',()=>{
    const localDB = LocalDB.create({storage:mockStorage});
    const localTable = localDB.createTable({name:"user",primaryKey:"id"})

    it("selectOne",()=>{
        assert.isNull(localTable.selectOne(''));
    })

    it("selectMany",()=>{
        assert.isEmpty(localTable.selectMany([]))
    })

    it("selectAll",()=>{
        assert.isEmpty(localTable.selectAll())
    })

    describe("addOne",()=>{
        it('合理',()=>{
            localTable.addOne({id:1,key:1});
            assert.deepEqual(localTable.selectOne(1),{id:1,key:1})
        })

        it("addOne时已存在索引，报错",()=>{
            assert.throws(()=>localTable.addOne({id:1,key:1}),`当前插入项，当前索引键id值为1已存在，插入失败！`)
        })
    })

    describe("addMany",()=>{
        it('addMany传入数组内部索引重复，报错',()=>{
            assert.throws(()=>localTable.addMany([{id:10,key:10},{id:10,key:10}]),`当前传入数组内部记录主键不唯一，插入失败！`)
        })

        it('已存在索引,插入失败！',()=>{
            assert.throws(()=>localTable.addMany([{id:1,key:1}]),`当前传入数组，与原本的表记录索引冲突，插入失败！`)
        })
        it('合理',()=>{
            localTable.addMany([{id:2,key:2},{id:3,key:3}]);
            assert.deepEqual([{id:1,key:1},{id:2,key:2},{id:3,key:3}],localTable.selectMany([1,2,3]))
        })
    })

    it("updateOne",()=>{
        localTable.updateOne({id:1,key:10});
        assert.deepEqual({id:1,key:10},localTable.selectOne(1));
    })

    it("updateMany",()=>{
        localTable.updateMany([{id:2,key:20},{id:3,key:30}]);
        assert.deepEqual([{id:2,key:20},{id:3,key:30}],localTable.selectMany([2,3]));
    })

    it("set",()=>{
        //TODO 待添加测试
    })

    it("deleteOne",()=>{
        localTable.deleteOne(1);
        assert.deepEqual([{id:2,key:20},{id:3,key:30}],localTable.selectAll())
    })

    it("deleteMany",()=>{
        localTable.deleteMany([2,3]);
        assert.isEmpty(localTable.selectAll());
    })

    it("clear",()=>{
        localTable.addOne({id:1,key:1})
        localTable.clear()
        assert.isEmpty(localTable.selectAll())
    })
})

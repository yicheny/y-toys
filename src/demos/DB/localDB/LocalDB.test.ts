import {assert} from 'chai';
import {LocalDB} from "./LocalDB";
import {mockStorage} from '../../base';

describe('localDB',()=>{
    const localDB = LocalDB.create({storage:mockStorage})
    it("get",()=>{
        assert.isEmpty(localDB.get('user'))
    })

    it("set",()=>{
        localDB.set('user',[{id:1,key:1}])
        localDB.set('test',[{id:2,key:2}])
        assert.deepEqual([{id:1,key:1}],localDB.get('user'))
        assert.deepEqual([{id:2,key:2}],localDB.get('test'))
    })

    it("remove",()=>{
        localDB.remove('user')
        assert.isEmpty(localDB.get('user'))
    })

    it('clear',()=>{
        localDB.clear()
        assert.isTrue(mockStorage.isEmpty())
    })

    it("createStore",()=>{

    })
})

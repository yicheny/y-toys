import {assert} from 'chai';
import {LocalDB} from "./LocalDB";
import {mockStorage} from '../../base';

describe('mockStorage',()=>{
    const localDB = LocalDB.create({storage:mockStorage})
    it("getItem",()=>{
        assert.isEmpty(localDB.get('user'))
    })

    it("setItem",()=>{
        localDB.set('user',[{id:1,key:1}])
        localDB.set('test',[{id:2,key:2}])
        assert.deepEqual([{id:1,key:1}],localDB.get('user'))
        assert.deepEqual([{id:2,key:2}],localDB.get('test'))
    })

    it("removeItem",()=>{
        localDB.remove('user')
        assert.isEmpty(localDB.get('user'))
    })

    it('clear',()=>{
        localDB.clear()
        assert.isTrue(mockStorage.isEmpty())
    })
})

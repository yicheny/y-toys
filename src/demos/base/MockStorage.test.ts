import mockStorage from "./MockStorage";
import {assert} from 'chai';

describe('mockStorage',()=>{
    it("getItem",()=>{
        assert.isNull(mockStorage.getItem('user'))
    })

    it("setItem",()=>{
        mockStorage.setItem('user',JSON.stringify({id:1,key:1}))
        mockStorage.setItem('test',JSON.stringify({id:2,key:2}))
        assert.deepEqual(JSON.stringify({id:1,key:1}),mockStorage.getItem('user'))
        assert.deepEqual(JSON.stringify({id:2,key:2}),mockStorage.getItem('test'))
    })

    it("removeItem",()=>{
        mockStorage.removeItem('user')
        assert.isNull(mockStorage.getItem('user'))
    })

    it('clear',()=>{
        mockStorage.clear()
        assert.isTrue(mockStorage.isEmpty())
    })
})

import {Nullable} from "../../types";

class MockStorage extends Storage{
    private static _storage = new Map()

    getItem(key:string):Nullable<string>{
        return MockStorage._storage.get(key) || null;
    }

    setItem(key:string,value:string):void{
        MockStorage._storage.set(key,value);
    }

    removeItem(key:string):void{
        MockStorage._storage.delete(key);
    }

    clear():void{
        MockStorage._storage.clear();
    }

    isEmpty():boolean{
        return MockStorage._storage.size === 0;
    }
}

const mockStorage = new MockStorage();
export default  mockStorage;

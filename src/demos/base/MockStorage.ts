import {Nullable} from "../../types";

export abstract class Storage{
    abstract getItem(key:string):Nullable<string>;
    abstract setItem(key:string,value:string):void;
    abstract removeItem(key:string):void;
    abstract clear():void;
}

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

export const mockStorage = new MockStorage();

import React from 'react';
import PIndexDB from "./PIndexDB";

main();

export default function IndexDBDemo() {
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

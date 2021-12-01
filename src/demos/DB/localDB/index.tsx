import React from "react";
import {LocalDB} from "./LocalDB";

main();

export default function LocalDBDemo() {
    return (<div>

    </div>)
};

function main(){
    const test = createTest();
    // test.selectOne()
    // test.selectMany()
    // test.addOne();
    // test.addMany();
    // test.deleteOne();
    // test.deleteMany();
    // test.updateOne();
    // test.updateMany();
    // test.clear();

    function createTest(){
        const db = LocalDB.create({})
        const id_key_table = db.createStore({
            name:'user_key',
            primaryKey: "id",
        });

        return {
            addOne(){
                for(let k=0; k<20;k++){
                    id_key_table.addOne({id:k,key:k});
                }
            },
            addMany(){
              // const list = Array.from(Array(4),(x,i)=>({id:i,key:i}))
              // id_key_table.addMany(list)
            },
            deleteOne(){
                id_key_table.deleteOne(0)
            },
            deleteMany(){
                const list = Array.from(Array(4),(x,i)=>i)
                id_key_table.deleteMany(list)
            },
            updateOne(){
                id_key_table.updateOne({id:1,key:100})
            },
            updateMany(){
                id_key_table.updateMany([
                    {id:3,key:100},
                    {id:10,key:100},
                ])
            },
            selectOne(){
                console.log(id_key_table.selectOne(10))
            },
            selectMany(){
                console.log(id_key_table.selectMany([1,3,5,7,10]))
            },
            clear(){
                id_key_table.clear()
            }
        }
    }
}

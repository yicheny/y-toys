import React from "react";
import createDB from "./LocalDB";

main();

export default function LocalDBDemo() {
    return (<div>

    </div>)
};

function main(){
    const test = createTest();
    // test.addOne();
    test.addMany();
    // test.deleteOne();
    // test.deleteMany();

    // test.clear();

    function createTest(){
        const db = createDB();
        const id_key_table = db.createStore({
            name:'user_key',
            primaryKey: "id",
        });

        return {
            addOne(){
                for(let k=0; k<3;k++){
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
            clear(){
                id_key_table.clear()
            }
        }
    }
}

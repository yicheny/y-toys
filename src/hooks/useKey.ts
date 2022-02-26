import {useCallback, useState} from "react";

export function useKey():[number,()=>void]{
    const [k,setK] = useState<number>(0)

    const update = useCallback(()=>{
        setK(x=>++x);
    },[])

    // return {key:k,updateKey:update}
    return [k,update]
}
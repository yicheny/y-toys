import React, {useEffect} from "react";
import _ from "lodash";

export function useOutsideClick(ref:React.RefObject<HTMLElement>,handle:React.MouseEventHandler<HTMLElement>){
    useEffect(()=>{
        const listener = function (event:Event){
            if(!ref.current || ref.current.contains(event.target as Node)) return ;
            if(_.isFunction(handle)) handle(event);
        }
        document.addEventListener('click',listener);

        return ()=>{
            document.removeEventListener('click',listener)
        }
    },[ref,handle])
}

export function curryClsPrefix(pre:string){
    return function (name?:string){
        if(!name) return pre;
        return `${pre}-${name}`
    }
}

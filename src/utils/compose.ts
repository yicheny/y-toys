//TODO 未完成
export default function compose(...funcs:((arg: any) => any[])[]) {
    if (funcs.length === 0) return (arg: any) => arg
    if (funcs.length === 1) return funcs[0]
    return funcs.reduce((a, b) => (...args) => a(b(...args)))
}

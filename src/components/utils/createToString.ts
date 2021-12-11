export default function createToString() {
    return {
        array(list: any[]) {
            if(list.length===0) return '[ ]';
            return list.reduce((acc, x, i, l) => {
                let line = `    ${JSON.stringify(x)},`
                if (i === l.length - 1) line = line.concat(`\n`, ` ]`)
                return acc.concat(line, '\n')
            }, ' [\n')
        }
    }
}

import _ from 'lodash'

interface logProps {
    commonInfo: string,
    logCallback?: boolean | ((...arg: any[]) => void)
}

export default function createLog(props: logProps) {
    const limit = 100;
    const infoList: any[][] = [];
    const getInfoPlus = addInfoList(getInfo)
    return {
        log(info: any) {
            if(props.logCallback === false) return null;
            const params = getInfoPlus(info);
            if(_.isFunction(props.logCallback)) return props.logCallback(...params);
            console.log(...params)
        },
        getInfo(){
            return infoList
        }
    }

    function addInfoList(callback: (arg: any) => any[]){
        return function(info:any):any[]{
            const result = callback(info)
            if(infoList.length >= limit) infoList.shift();
            infoList.push(result);
            return result
        }
    }

    function getInfo(info:any){
        if (props.commonInfo) return [props.commonInfo,info]
        return [info]
    }
}

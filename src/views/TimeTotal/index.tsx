import React, {useCallback, useState} from 'react'
import _ from 'lodash'

export default function TimeTotal():React.ReactElement{
    const [totalData,setTotalData] = useState<Total>();

    const handleChange = useCallback((e)=>{
        setTotalData(new Total(e.target.value))
    },[])

    return <div>
        <textarea style={{width:480,height:320}} onChange={handleChange}/>
        <div>
            {_.map(totalData?.totalInfo(),(x,i)=>{
                return <div key={i}>
                    {x}
                </div>
            })}
        </div>
    </div>
}

type OneDayDict = {
    date:string,
    time:number,
    info:string
}

class Total{
    private readonly _source: string;
    private readonly _data: OneDayDict[];

    constructor(source:string) {
        this._source = source;
        this._data = this.getData();
    }

    private getData(){
        const oneDayInfos = this._source.split('\n').filter(x=>x.trim()!=='');
        return _.map(oneDayInfos,(oneDayInfo:string)=>{
            const [date,time,info] = _.split(oneDayInfo,'===')
            return {
                date,
                time:_.toNumber(time),
                info
            }
        });
    }

    public totalInfo(){
        const yearData = this.totalWithCount(this._data.length)
        const monthData = this.totalWithCount(30);
        const weekData = this.totalWithCount(7);
        return [
            `本年度学习时间共计${yearData.accTimes}小时，本年度平均每日学习时间${yearData.aveTime}小时;`,
            `本月学习时间共计${monthData.accTimes}小时，本月平均每日学习时间${monthData.aveTime}小时;`,
            `本周学习时间共计${weekData.accTimes}小时，本周平均每日学习时间${weekData.aveTime}小时;`,
        ]
    }

    private totalWithCount(count:number){
        const list = this._data.slice(-1 * count);
        const accTimes = _.reduce(list,(acc,x)=>acc+x.time,0);
        return {
            accTimes:transformToHour(accTimes),
            aveTime:transformToHour(accTimes/count)
        }
    }
}

function transformToHour(time:number){
    return (time/60).toFixed(2)
}

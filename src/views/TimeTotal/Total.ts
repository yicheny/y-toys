import _ from "lodash";

type OneDayDict = {
    date:string,
    time:number,
    info:string
}

export default class Total{
    private readonly _source: string;
    private readonly _data: OneDayDict[];

    constructor(source:string) {
        this._source = source;
        this._data = this.getData();
    }

    public getSource(){
        return this._source;
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
            `今年学习时间共计${yearData.accTimes}小时，今年平均每日学习时间${yearData.aveTime}小时;`,
            `最近一月学习时间共计${monthData.accTimes}小时，最近一月平均每日学习时间${monthData.aveTime}小时;`,
            `最近一周学习时间共计${weekData.accTimes}小时，最近一周平均每日学习时间${weekData.aveTime}小时;`,
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

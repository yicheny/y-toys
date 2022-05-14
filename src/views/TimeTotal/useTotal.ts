import _ from "lodash";
import {useCallback, useState} from "react";
import {message} from "../../components";
import {Store} from "../../base";

const store = new Store('time-total','')

export interface OneDayDict{
    date: string,
    time: number,
    info: string
}

export class Total {
    private readonly _source: string;
    private readonly _data: OneDayDict[];

    constructor(source: string) {
        this._source = source;
        this._data = this.getData();
    }

    public getSource() {
        return this._source;
    }

    public empty() {
        return this._source === '';
    }

    getData() {
        const oneDayInfos = this._source.split('\n').filter(x => x.trim() !== '');
        return _.map(oneDayInfos, (oneDayInfo: string) => {
            const [date, time, info] = _.split(oneDayInfo, '===')
            return {
                date,
                time: _.toNumber(time),
                info
            }
        });
    }

    public totalInfo() {
        const yearData = this.totalWithCount(this._data.length)
        const monthData = this.totalWithCount(30);
        const weekData = this.totalWithCount(7);
        return [
            `今年学习时间共计${yearData.accTimes}小时，今年平均每日学习时间${yearData.aveTime}小时;`,
            `最近一月学习时间共计${monthData.accTimes}小时，最近一月平均每日学习时间${monthData.aveTime}小时;`,
            `最近一周学习时间共计${weekData.accTimes}小时，最近一周平均每日学习时间${weekData.aveTime}小时;`,
        ]
    }

    private totalWithCount(count: number) {
        const list = this._data.slice(-1 * count);
        const accTimes = _.reduce(list, (acc, x) => acc + x.time, 0);
        return {
            accTimes: transformToHour(accTimes),
            aveTime: transformToHour(accTimes / count)
        }
    }
}

function transformToHour(time: number) {
    return (time / 60).toFixed(2)
}

export function useTotal() {
    const [totalData, setTotalData] = useState<Total>(new Total(''));

    const handleChange = useCallback((e) => {
        setTotalData(new Total(e.target.value))
    }, [])

    const save = useCallback(() => {
        if (totalData.empty()) return message.show("数据为空，异常！")
        if (totalData.getSource())
            store.save(totalData.getSource())
        message.show('存储成功！')
    }, [totalData])

    const read = useCallback(() => {
        setTotalData(new Total(store.read()))
        message.show('读取成功！')
    }, [])

    return {handleChange, save, read, totalData}
}




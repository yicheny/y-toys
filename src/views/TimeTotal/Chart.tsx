import ReactECharts from 'echarts-for-react';
import {useMemo} from "react";
import {OneDayDict, Total} from "./useTotal";
import _ from 'lodash';

interface Props {
    total:Total
}

interface SeriesData extends OneDayDict{
    value:number
}

interface TooltipFormatterParam<D>{
    data:D
}

export default function Chart(props:Props) {
    return <ReactECharts option={useOption(props.total)} style={{height:600}}/>
}

function useOption(total:Total){
    return useMemo(()=>{
        const data = total.getData()
        return  {
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                },
                formatter:(params:TooltipFormatterParam<SeriesData>[])=>{
                    const data = params[0].data;
                    return `<div>
                        <div>日期：${data.date}</div>
                        <div>学习时间：${data.time}分钟</div>
                        <div>学习内容：${data.info}</div>
                    </div>`
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '16%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: _.map(data,x=>x.date)
            },
            yAxis: {
                type: 'value',
            },
            series: [
                {
                    data: _.map(data,(x:SeriesData)=>{
                        x.value = x.time;
                        return x;
                    }),
                    type: 'bar',
                    showBackground: true,
                    backgroundStyle: {
                        color: 'rgba(180, 180, 180, 0.2)'
                    },
                }
            ],
            dataZoom: [
                {
                    show: true,
                    start: 90,
                    end: 100
                },
            ],
        };
    },[total])
}

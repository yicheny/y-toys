import {Select} from "../../../components";
import _ from 'lodash'

const options = _.times(1000,x=>({text:`第${x+1}行文本`,value:x}))

export default function SelectView(){
    return <div style={{margin:16}}>
            <Select options={options} onChange={(value)=>console.log(`当前获取的value是${value}`)}/>
        </div>
}

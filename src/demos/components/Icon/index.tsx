import React from 'react';
import {Box, Icon} from "../../../components";

const option = [
    {text:"调整",icon:"adjust"},
    {text:"上箭头",icon:"arrow-top"},
    {text:"右箭头",icon:"arrow-right"},
    {text:"下箭头",icon:"arrow-bottom"},
    {text:"左箭头",icon:"arrow-left"},
    {text:"固定",icon:"fixed"},
    {text:"关闭",icon:"close"},
    {text:"设置",icon:"setting"}
]

export default function IconDemo() {
    return <Box style={{display:'flex'}}>
        {
            option.map(x=>{
                return <div style={{margin:'6px 16px'}}>
                    <span style={{marginRight:8}}>{x.text}</span>
                    <Icon name={x.icon}/>
                </div>
            })
        }
    </Box>
}


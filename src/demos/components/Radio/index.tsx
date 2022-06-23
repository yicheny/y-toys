import React from 'react';
import {Box, RadioGroup} from "../../../components";

const options = [
    {text:"A",value:'A'},
    {text:"B",value:'B'},
    {text:"C",value:'C'},
    {text:"D",value:'D'},
]

export default function RadioDemo() {
    return (
        <Box>
            <RadioGroup options={options} value={'B'}/>
        </Box>
    );
}


import React from 'react';
import {Box, Button, message} from "../../../components";

export default function MessageDemo() {
    return <Box>
        <Button onClick={()=>message.show('message测试！')}>触发</Button>
    </Box>
}


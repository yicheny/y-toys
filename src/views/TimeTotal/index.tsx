import React from 'react'
import _ from 'lodash'
import {TextArea, Button,Box} from "../../components";
import styles from './index.module.scss'
import {useTotal} from "./useTotal";

export default function TimeTotal(): JSX.Element {
    const {handleChange, totalData, save, read} = useTotal();

    return <Box>
        <TextArea style={{width: 480, height: 320}} onChange={handleChange} value={totalData.getSource()}/>
        <div className={styles.buttonGroup}>
            <Button onClick={save}>存储</Button>
            <Button onClick={read}>读取</Button>
        </div>
        <TotalInfo data={totalData.totalInfo()}/>
    </Box>
}

interface TotalInfoProps {
    data: string[]
}

function TotalInfo(props: TotalInfoProps) {
    return <div>
        {_.map(props.data, (x, i) => {
            return <div key={i}>
                {x}
            </div>
        })}
    </div>
}

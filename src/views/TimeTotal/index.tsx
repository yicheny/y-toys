import React from 'react'
import _ from 'lodash'
import {TextArea, Button,Box} from "../../components";
import styles from './index.module.scss'
import {useTotal} from "./useTotal";
import {useTranslation} from "react-i18next";

export default function TimeTotal(): JSX.Element {
    const {handleChange, totalData, save, read} = useTotal();
    const {t} = useTranslation()

    return <Box>
        <TextArea style={{width: 480, height: 320}} onChange={handleChange} value={totalData.getSource()}/>
        <div className={styles.buttonGroup}>
            <Button onClick={save}>{t('studyTimeTotal.save')}</Button>
            <Button onClick={read}>{t('studyTimeTotal.load')}</Button>
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

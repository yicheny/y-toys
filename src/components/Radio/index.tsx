import {FC, Fragment, useEffect, useState} from "react";
import clsx from "clsx";
import './index.scss';
import {curryClsPrefix} from "../../utils";

type TRadioValue = string | number;

interface RadioProps {
    value: TRadioValue,
    onClick: (v: TRadioValue) => void,
    current?: TRadioValue
}

const radioPrefix = curryClsPrefix('c-radio')
const Radio: FC<RadioProps> = function (props) {
    return <span className={clsx(radioPrefix(), {active: props.current === props.value})}
                 onClick={()=>props.onClick(props.value)}>
         <span className={radioPrefix('icon')}/>
         <span className={radioPrefix('text')}>
             {props.children}
         </span>
    </span>
}

type RadioGroupOption = {
    value: TRadioValue
    text: string
}

interface RadioGroupProps {
    options: RadioGroupOption[],
    value:TRadioValue
    onChange?: (v?: TRadioValue) => void
}

export const RadioGroup: FC<RadioGroupProps> = function (props) {
    const {value,onChange} = props;
    const [current, setCurrent] = useState<TRadioValue>();

    useEffect(()=>{
        setCurrent(value)
    },[value])

    useEffect(() => {
        onChange && onChange(current);
    }, [onChange, current])

    return <Fragment>
        {
            props.options.map((option) => {
                return <Radio key={option.value}
                              value={option.value}
                              onClick={setCurrent}
                              current={current}>
                    {option.text}
                </Radio>
            })
        }
    </Fragment>
}

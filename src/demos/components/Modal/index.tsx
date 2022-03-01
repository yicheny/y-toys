import React from 'react';
import {useToggle} from "../../../hooks";
import {Modal} from "../../../components";

export function ModalView() {
    const {close,show} = useToggle(true)
    return (<div>
        {show && <Modal close={close}>测试</Modal>}
    </div>);
}

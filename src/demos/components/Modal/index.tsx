import React from 'react';
import {useToggle} from "../../../hooks";
import {Button, Modal, Box} from "../../../components";

export function ModalView() {
    const {close,show,open} = useToggle(false)
    return (<Box>
        <Button onClick={open}>打开弹窗</Button>
        {show && <Modal close={close}>内容</Modal>}
        {/*<Modal close={close}>测试</Modal>*/}
    </Box>);
}

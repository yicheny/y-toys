import React from 'react'
import {CommonComponentProps, RenderElement} from '../../types'
import './index.scss'
import {createPortal} from 'react-dom'
import {useDrag} from "../../hooks";
import clsx from "clsx";

interface ModalProps extends CommonComponentProps{
    children: RenderElement
    close: () => void
    title?: string
}

export default function Modal(props: ModalProps) {
    const {close,title='Modal',style,className} = props
    const {setDragRef, setTriggerRef} = useDrag();

    return createPortal(
        <div className={'c-modal-wrap'}>
            <div
                className={clsx('c-modal',className)}
                ref={(e) => {
                    setDragRef(e)
                }}
                style={style}
            >
                <div className={'c-modal-header'} ref={setTriggerRef}>
                    <div className='c-modal-title'>{title}</div>
                    <div className='c-modal-operation' onClick={() => close()}>
                        exit
                    </div>
                </div>
                <div className='c-modal-content'>{props.children}</div>
            </div>
        </div>,
        document.body
    )
}

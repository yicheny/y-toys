import React from 'react'
import { RenderElement } from '../../types'
import './index.scss'
import { createPortal } from 'react-dom'
import { useOutsideClick, useDrag } from '../../hooks'

interface ModalProps {
  children: RenderElement
  close: () => void
}

export default function Index(props: ModalProps) {
  const { close } = props
  const { setOutsideRef } = useOutsideClick<HTMLDivElement>(close)
  const { setDragRef, recordInitPos, clearPos, changePos } = useDrag<HTMLDivElement>()

  return createPortal(
    <div className='c-modal-wrap' onMouseMove={changePos} onMouseUp={clearPos} onMouseLeave={clearPos}>
      <div
        className='c-modal'
        ref={(e) => {
          setOutsideRef(e)
          setDragRef(e)
        }}
      >
        <div className='c-modal-header' onMouseDown={recordInitPos}>
          <div className='c-modal-title'>标题：点击外侧可关闭</div>
          <div className='c-modal-operation' onClick={() => close()}>
            关闭
          </div>
        </div>
        <div className='c-modal-content'>{props.children}</div>
      </div>
    </div>,
    document.body
  )
}

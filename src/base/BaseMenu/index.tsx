import React, {MouseEventHandler} from 'react';
import styles from './index.module.scss';
import _ from 'lodash'
import {CommonComponentProps, RenderElement} from "../../types";
import {useDragNextSimple} from "../../hooks/useDragNextSimple";

interface Props extends CommonComponentProps {
    size: number,
    children:RenderElement,
    onDoubleClick:MouseEventHandler<HTMLDivElement>
}

export function BaseMenu(props: Props) {
    const {style, size} = props;
    const {setDragRef} = useDragNextSimple();

    return <div className={styles.base}
                style={_.assign({width: size, height: size}, style)}
                ref={setDragRef}
                onDoubleClick={props.onDoubleClick}>
        {props.children}
    </div>
}

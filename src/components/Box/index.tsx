import React from "react";
import './index.scss'
import {CommonComponentProps, RenderElement} from "../../types";
import clsx from "clsx";

interface BoxProps extends CommonComponentProps {
    children: RenderElement
}

export default function Box(props: BoxProps) {
    return <div className={clsx('c-box', props.className)} style={props.style}>
        {props.children}
    </div>
}

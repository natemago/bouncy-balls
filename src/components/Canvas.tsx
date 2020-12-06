import React from 'react';
import {Canvas2DrawingProvider} from '../bouncyballs/drawables';

type CanvasProps = {
    drawingProvider: Canvas2DrawingProvider,
    onClick?: (event: CanvasMouseEvent) => void,
}

type CanvasState = {

}

export type CanvasMouseEvent = {
    x: number,
    y: number,
    event: React.MouseEvent,
}

export default class Canvas extends React.Component<CanvasProps, CanvasState> {
    
    drawingProvider?: Canvas2DrawingProvider
    canvas?: HTMLCanvasElement | null

    constructor(props:any) {
        super(props)
        this.drawingProvider = this.props.drawingProvider;
    }

    componentDidMount() {
        if(this.drawingProvider && this.canvas) {
            this.drawingProvider.setCanvas(this.canvas)
            console.log('Set canvas -> with context ::mount')
        }
    }

    componentDidUpdate() {
        if(this.drawingProvider && this.canvas) {
            this.drawingProvider.setCanvas(this.canvas)
            console.log('Set canvas -> with context ::update')
        }
    }

    handleClick(event: React.MouseEvent) {
        if(this.props.onClick) {
            const ev = {
                x: event.clientX,
                y: event.clientY,
                event
            }
            const rect = this.canvas?.getBoundingClientRect()
            if(rect) {
                ev.x -= rect.left
                ev.y -= rect.top
            }
            this.props.onClick(ev)
        }
    }    

    render() {
        return <canvas ref={(c) => this.canvas = c} width="1500" height="500" onClick={this.handleClick.bind(this)}></canvas>
    }
}
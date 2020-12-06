import React from 'react';
import {Canvas2DrawingProvider} from '../bouncyballs/drawables';

import './Canvas.css'

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
        }
        
        window.addEventListener('resize', this.updateCanvasWidthAndHeight.bind(this))
        this.updateCanvasWidthAndHeight()
    }

    componentDidUpdate() {
        if(this.drawingProvider && this.canvas) {
            this.drawingProvider.setCanvas(this.canvas)
        }
    }

    updateCanvasWidthAndHeight() {
        if (this.canvas) {
            const [width, height] = this.getSize()
            this.canvas.width = width?? 0
            this.canvas.height = height?? 0
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

    getSize() {
        const rect = this.canvas?.getBoundingClientRect()
        return [rect?.width, rect?.height]
    }

    render() {
        return <canvas ref={(c) => this.canvas = c} onClick={this.handleClick.bind(this)} className="drawing-canvas"></canvas>
    }
}
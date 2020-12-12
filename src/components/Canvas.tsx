import React from 'react';
import {Canvas2DrawingProvider} from '../bouncyballs/drawables';

import './Canvas.css'

/**
 * Canvas component properties.
 */
type CanvasProps = {
    /**
     * Reference to the DrawingProvider
     */
    drawingProvider: Canvas2DrawingProvider,

    /**
     * Handler for click events on the underlying canvas element.
     * The x and y coordinates of the click are corrected to be relative to
     * the unserlying canvas, as opposed to an absolute postion on the browser
     * viewport.
     */
    onClick?: (event: CanvasMouseEvent) => void,
}

/**
 * Canvas component state type.
 */
type CanvasState = {}

/**
 * Wrapper for a mouse event on the canvas.
 * Contains the original event and corrected x and y coordinates of the event
 * to the relative position of the canvas element.
 */
export type CanvasMouseEvent = {
    x: number,
    y: number,
    event: React.MouseEvent,
}

/**
 * Canvas component that manages an underlying HTML canvas element.
 * 
 * Binds the canvas to the Canvas2DrawingProvider as the underlying screen for
 * rendering Drawable objects.
 */
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

    /**
     * Updates the canvas element width and height properties to the actual
     * size of the canvas. This enables rescaling the canvas to the correct
     * propertions when the size of the canvas is regulated through CSS style.
     */
    updateCanvasWidthAndHeight() {
        if (this.canvas) {
            const [width, height] = this.getSize()
            this.canvas.width = width?? 0
            this.canvas.height = height?? 0
        }
    }

    /**
     * Handle a click on the canvas.
     * 
     * Wraps the event, corrects the x and y coordinated of the click, then calls the onClick hander
     * of the component.
     * @param event the actual event received from the canvas element.
     */
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

    /**
     * Returns the actual size of the canvas element in the DOM.
     */
    getSize() {
        const rect = this.canvas?.getBoundingClientRect()
        return [rect?.width, rect?.height]
    }

    render() {
        return <canvas ref={(c) => this.canvas = c} onClick={this.handleClick.bind(this)} className="drawing-canvas"></canvas>
    }
}
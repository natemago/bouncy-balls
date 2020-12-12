/**
 * Handler that is being called inside a loop. This type of handler is being called on each tick of the loop
 * with relevant tick metrics.
 * 
 * @param frame the frame number. Starts from 1.
 * @param time current frame time (a Date object).
 * @param delta, a number, the time difference from the previous tick in seconds.
 */
export interface LoopTickHandler {
    (frame: number, time: Date, delta: number): void;
};

/**
 * A loop that executes handlers (LoopTickHandler) periodically.
 * The handlers are usually executed multiple times per second.
 */
export interface Loop {
    /**
     * Starts the loop, if not running.
     */
    start(): void;

    /**
     * Stopts the loop, if running.
     */
    stop(): void;

    /**
     * Check if this loop is running.
     * 
     * @returns boolean true if the loop is running, otherwise false.
     */
    isRunning(): boolean;

    /**
     * Adds a handler to the list of handlers to be executed per tick.
     * @param handler the handler to be added to this loop.
     */
    addHandler(handler: LoopTickHandler): void;
}


/**
 * Implements the basic properties of a loop, like adding and managing handlers, setup and teardown per tick.
 */
export abstract class BaseLoop implements Loop{
    private running: boolean = false;
    protected frameTickHandler?: number;
    private frame: number = 0;
    private lastFrameAt?: Date;
    private tickDone:boolean = true;
    
    protected handlers: LoopTickHandler[] = [];

    /**
     * One tick of the loop.
     * This is the main function that is called when the loop is running, usually multiple times per second.
     */
    tick(): void {
        if (!this.running) {
            return
        }

        const frame = this.frame + 1;
        const currentTime = new Date();
        const delta = (this.lastFrameAt ? currentTime.getTime() - this.lastFrameAt?.getTime() : 0) / 1000;  // seconds instead of milliseconds
        this.handlers.forEach(handler => {
            try{
                handler(frame, currentTime, delta);
            }catch(e) {
                console.log('Error:', e, 'at handler:', handler);
            }
        })
        this.lastFrameAt = currentTime
    }

    /**
     * Starts the loop.
     * 
     * Sets up a handler for the 'tick' function, that schedules it to run periodically.
     */
    start(): void {
        if(this.running) {
            return
        }
        this.running = true;
        this.lastFrameAt = new Date()
        this.frameTickHandler = this.scheduleTick(this.tick.bind(this));
    }

    /**
     * Stops the loop.
     * 
     * Clears the handler for the 'tick' function and marks this loop as not running.
     */
    stop(): void {
        if(!this.running) {
            return;
        }
        if(this.frameTickHandler){
            this.cancelTick(this.frameTickHandler);
        }
        this.running = false
    }

    isRunning(): boolean {
        return this.running;
    }

    addHandler(handler: LoopTickHandler): void {
        this.handlers.push(handler);
    }


    /**
     * Schedule a function to run periodically.
     * 
     * This is called in BaseLoop.start to schedule the execution of the BaseLoop.tick function. This is
     * abstracted to allow for different implementations of scheduling the periodic 'tick', such as with
     * requestAnimationFrame or setInterval.
     * 
     * @param tickFn the 'tick' function to be scheduled to run periodically.
     */
    abstract scheduleTick(tickFn: Function): number;

    /**
     * Cancel the given periodic execution of the tick function, by the given tickHandler.
     * 
     * This is called in BaseLoop.stop to cancel the scheduled periodic execution of the 'tick' function.
     * @param tickHandler the handler for the schedule of the 'tick' function. Depending on implementation this
     * could be the setInterval handler, requestAnimationFrame handler or other, if different underlying implementation
     * is used.
     */
    abstract cancelTick(tickHandler:number): void;

}

/**
 * A loop for animations.
 * 
 * This implementation uses 'requestAnimationFrame' internally to schedule and run the tick function.
 * 
 * This implementation is intended to be used for visual animations, as 'requestAnimationFrame' may not be
 * called when the browser/tab is not in view.
 * 
 * The frame rate cannot be set directly, as it depends on the actual browser implementation of 'requestAnimationFrame'.
 */
export class AnimationLoop extends BaseLoop {

    /**
     * Schedules the periodic execution of the given function using 'requestAnimationFrame'.
     * @param tickFn the function to be scheduled to run periodically.
     */
    scheduleTick(tickFn: Function): number {
        const self = this;

        const onAnimationFrame = function(time: number) {
            tickFn()
            if(self.isRunning()) {
                self.frameTickHandler = requestAnimationFrame(onAnimationFrame);
            }
        }

        return requestAnimationFrame(onAnimationFrame);
    }

    /**
     * Cancels the execution of the scheduled function using 'cancelAnimationFrame'.
     * @param tickHandler the handler for the scheduled function.
     */
    cancelTick(tickHandler: number): void {
        if(this.frameTickHandler){
            cancelAnimationFrame(this.frameTickHandler);
        }
    }

}

/**
 * A loop for periodic update of the state of the objects.
 * 
 * This implementation uses 'setInterval' internally to schedule the execution of the handlers at a given
 * frame rate (FPS). The handlers will be executed always while this loop is running.
 */
export class UpdateLoop extends BaseLoop {

    fps: number = 60;

    /**
     * Create new UpdateLoop instance with a given frame rate (frames per second).
     * @param fps frame rate in frames-per-second.
     */
    constructor(fps: number) {
        super();
        this.fps = fps;
    }

    /**
     * Schedules the execution of the 'tick' function at a pre-defined frame rate.
     * @param tickFn the function to be scheduled to execute at a given frame rate.
     */
    scheduleTick(tickFn: Function): number {
        const interval = 1000/this.fps;
        return setInterval(tickFn, interval);
    }

    /**
     * Cancels the execution of the given handler.
     * @param tickHandler the scheduled function handler.
     */
    cancelTick(tickHandler: number): void {
        clearInterval(tickHandler);
    }
}
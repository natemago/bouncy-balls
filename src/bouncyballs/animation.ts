export interface LoopTickHandler {
    (frame: number, time: Date, delta: number): void;
};

export interface Loop {
    start(): void;
    stop(): void;
    isRunning(): boolean;
    addHandler(handler: LoopTickHandler): void;
}

export abstract class BaseLoop implements Loop{
    private running: boolean = false;
    protected frameTickHandler?: number;
    private frame: number = 0;
    private lastFrameAt?: Date;
    private tickDone:boolean = true;
    
    protected handlers: LoopTickHandler[] = [];


    constructor() {
    }

    tick() {
        // if(!this.tickDone) {
        //     return
        // }
        // this.tickDone = false;
        const frame = this.frame + 1;
        const currentTime = new Date();
        const delta = (this.lastFrameAt ? currentTime.getTime() - this.lastFrameAt?.getTime() : 0) / 1000;  // seconds instead of milliseconds
        this.handlers.forEach((handler) => {
            try{
                handler(frame, currentTime, delta);
            }catch(e) {
                console.log('Error:', e, 'at handler:', handler);
            }
        })
        //this.tickDone = true;
        this.lastFrameAt = currentTime
    }

    start() {
        if(this.running) {
            return
        }
        this.running = true;
        this.lastFrameAt = new Date()
        this.frameTickHandler = this.scheduleTick(this.tick.bind(this));
    }

    stop() {
        if(!this.running) {
            return;
        }
        if(this.frameTickHandler){
            this.cancelTick(this.frameTickHandler);
        }
    }

    isRunning(): boolean {
        return this.running;
    }

    addHandler(handler: LoopTickHandler): void {
        this.handlers.push(handler);
    }

    abstract scheduleTick(tickFn: Function): number;
    abstract cancelTick(tickHandler:number): void;

}

export class AnimationLoop extends BaseLoop {

    scheduleTick(tickFn: Function): number {
        console.log('Request animation frame...')

        const self = this;

        const onAnimationFrame = function(time: number) {
            tickFn()
            if(self.isRunning()) {
                self.frameTickHandler = requestAnimationFrame(onAnimationFrame);
            }
        }

        return requestAnimationFrame(onAnimationFrame);
    }

    cancelTick(tickHandler: number): void {
        if(this.frameTickHandler){
            cancelAnimationFrame(this.frameTickHandler);
        }
    }

}

export class UpdateLoop extends BaseLoop {

    fps: number = 60;

    constructor(fps: number) {
        super();
        this.fps = fps;
    }

    scheduleTick(tickFn: Function): number {
        const interval = 1000/this.fps;
        return setInterval(tickFn);
    }
    cancelTick(tickHandler: number): void {
        clearInterval(tickHandler);
    }

}
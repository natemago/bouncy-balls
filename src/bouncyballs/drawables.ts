export interface DrawingProvider {
    add(drawable:Drawable):void;
    remove(drawable: Drawable):void;
    render(frame: number, time: Date, delta: number):void
}

type BoundingBox = {
    x: number,
    y: number,
    width: number,
    height: number,
}

export interface Drawable {
    render(ctx: RenderingContext, frame: number, time: Date, delta: number):void;
    update(frame: number, time: Date, delta: number):void;
    getBoundingBox(): BoundingBox
}

/**
 * Represents a 2D vector.
 */
export class Vector2D {
    x: number = 0;
    y: number = 0;
    mag: number = 0;

    constructor(x?:number, y?:number) {
        if(x) {
            this.x = x;
        }
        if (y) {
            this.y = y;
        }
        this.mag = Math.sqrt(this.x**2 + this.y**2)
    }

    add(vec: Vector2D): Vector2D {
        return new Vector2D(this.x + vec.x, this.y + vec.y)
    }

    sub(vec: Vector2D): Vector2D {
        return new Vector2D(
            this.x - vec.x,
            this.y - vec.y
        )
    }

    /**
     * 
     * @param vec the vector
     */
    mul(vec: Vector2D) {
        return new Vector2D(this.x * vec.x, this.y * vec.y)
    }

    mulScalar(value:number): Vector2D {
        return new Vector2D(this.x * value, this.y * value)
    }

    euclidDistace(other:Vector2D): number {
        return Math.sqrt((this.x - other.x)**2 + (this.y - other.y)**2)
    }

    dot(other:Vector2D): number {
        return this.x * other.x + this.y * other.y
    }

    value(): number {
        return this.mag
    }

    edot(other:Vector2D): number {
        const cosV = this.x / this.value()
        return Math.abs(this.value() * other.value()) * cosV
    }

    scale(fx: number, fy:number): Vector2D {
        return this.mul(new Vector2D(fx, fy))
    }
}

export abstract class BaseDrawableObject implements Drawable{
    position:Vector2D = new Vector2D(0, 0);
    velocity: Vector2D = new Vector2D(0, 0);
    acceleration: Vector2D = new Vector2D(0, 0);
    scale:Vector2D = new Vector2D(1, 1);

    constructor(position?:Vector2D, velocity?:Vector2D, acceleration?: Vector2D, scale?: Vector2D) {
        this.position = position?? this.position;
        this.velocity = velocity?? this.velocity;
        this.acceleration = acceleration?? this.acceleration;
        this.scale = scale?? this.scale;
    }

    update(frame: number, time: Date, delta: number):void {
        this.velocity = this.velocity.add(this.acceleration.mulScalar(delta))
        this.position = this.position.add(this.velocity)
    }

    abstract render(ctx: RenderingContext, frame: number, time: Date, delta: number):void;
    abstract getBoundingBox(): BoundingBox
    
}


export abstract class BaseDrawingProvider implements DrawingProvider {
    drawables: Drawable[] = [];


    add(drawable: Drawable): void {
        this.drawables.push(drawable);
    }

    remove(drawable: Drawable): void {
        this.drawables = this.drawables.filter(d => d != drawable)
    }

    render(frame: number, time: Date, delta: number): void {
        const ctx = this.getRenderingContext()
        if(!ctx) {
            console.error('Rendering context not available. Will not render.')
            return 
        }
        this.beforeRender(ctx)


        this.drawables.forEach(drawable => {
            try {
                drawable.render(ctx, frame, time, delta);
            } catch(e) {
                console.error('Failed to draw', drawable, '; error:', e)
            }
        })

        this.afterRender(ctx)
    }

    protected beforeRender(ctx: RenderingContext) {

    }

    protected afterRender(ctx: RenderingContext) {

    }

    abstract getRenderingContext(): RenderingContext | undefined;

}

export class Canvas2DrawingProvider extends BaseDrawingProvider {
    
    private renderingContext?: CanvasRenderingContext2D;
    private canvasEl?: HTMLCanvasElement;

    constructor(){
        super()
    }

    setCanvas(canvas: HTMLCanvasElement): void {
        this.canvasEl = canvas;
        this.renderingContext = canvas.getContext("2d")?? undefined
    }

    getRenderingContext(): RenderingContext | undefined {
        return this.renderingContext;
    }

    beforeRender(ctx: CanvasRenderingContext2D) {
        if (!this.canvasEl) {
            return
        }
        ctx.save()
        ctx.clearRect(0, 0, this.canvasEl.width, this.canvasEl.height)
        ctx.transform(1, 0, 0, -1, 0, this.canvasEl.height)  // -1 scale the y axis, thus flip over
    }

    afterRender(ctx: CanvasRenderingContext2D) {
        ctx.restore()
    }
}


export class Specs {
    fillColor: string;
    borderColor: string;
    borderWidth: number;

    constructor(fillColor: string, borderColor: string, borderWidth: number) {
        this.fillColor = fillColor;
        this.borderColor = borderColor;
        this.borderWidth = borderWidth;
    }
}


export class Ball extends BaseDrawableObject {

    radius: number = 0;
    specs: Specs;

    constructor(radius: number, specs: Specs, position?:Vector2D, velocity?:Vector2D, acceleration?: Vector2D, scale?: Vector2D) {
        super(position, velocity, acceleration, scale)
        this.radius = radius;
        this.specs = specs;
    }


    render(ctx: CanvasRenderingContext2D, frame: number, time: Date, delta: number): void {
        if(this.radius <= 0) {
            return
        }
        ctx.save()

        ctx.fillStyle = this.specs.fillColor
        ctx.strokeStyle = this.specs.borderColor

        ctx.beginPath()
        ctx.arc(this.position.x + this.radius, this.position.y + this.radius, this.radius, 0, 2*Math.PI)
        ctx.closePath()
        ctx.fill()
        if (this.specs.borderWidth) {
            ctx.stroke()
        }

        ctx.restore()
    }

    getBoundingBox(): BoundingBox {
        return {
            x: this.position.x,
            y: this.position.y,
            width: this.radius * 2,
            height: this.radius * 2,
        }
    }

}
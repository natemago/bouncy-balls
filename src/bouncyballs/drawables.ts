/**
 * Provides drawing capabilities for rendering {Drawable} objects.
 * Implementations may do the actual rendering in HTML canvas, directly into HTML etc.
 * 
 * The provider can handle multiple objects to render. When calling render on this object, all {Drawable}
 * registered with this provider will be rendered.
 */
export interface DrawingProvider {
    /**
     * Add a {Drawable} object to be rendered by this provider.
     * @param drawable the object to render.
     */
    add(drawable:Drawable):void;

    /**
     * Remove an object from this provider.
     * @param drawable the object to remove.
     */
    remove(drawable: Drawable):void;

    /**
     * Render all registered {Drawable} objects.
     * @param frame current frame number.
     * @param time current time.
     * @param delta difference to the previous render time in seconds.
     */
    render(frame: number, time: Date, delta: number):void
}

/**
 * Defines a bounding box around an object. It is a rectangle enclosing the object.
 */
type BoundingBox = {
    /**
     * Position of the leftmost side of the object bounding box.
     */
    x: number,

    /**
     * Position of the lowermost side of the object bounding box.
     */
    y: number,

    /**
     * Width of the box enclosing the object.
     */
    width: number,

    /**
     * Height of the box enclosing the object.
     */
    height: number,
}


/**
 * An object that can be rendered on the screen.
 * 
 * To render the object, it must first be registered with a drawing provider. The {DrawingProvider}
 * provides the {RenderingContext} to perform the actual rendering of this drawable object.
 * 
 * Additionally, this interface exposes an operation to update the object internal state. As these
 * types of objects would most likely always be used within an animation and update loops, the update
 * method offers abstract way of handling the update of the internal state of the drawable object.
 * 
 */
export interface Drawable {

    /**
     * Render this object.
     * @param ctx the {RenderingContext} provided by the {DrawingProvider}.
     * @param frame current frame number.
     * @param time current time.
     * @param delta difference to the previous render time in seconds.
     */
    render(ctx: RenderingContext, frame: number, time: Date, delta: number):void;

    /**
     * Updates the internal state of the object, for the given frame.
     * @param frame current frame number.
     * @param time current time.
     * @param delta difference to the previous render time in seconds.
     */
    update(frame: number, time: Date, delta: number):void;

    /**
     * Returns the {BoundingBox} of this object. The bounding box is a rectangle
     * that encloses the object.
     */
    getBoundingBox(): BoundingBox
}

/**
 * @class Represents a 2D vector.
 * 
 * Each 2D vector has two components: x and y - positions on the x and y axes accordingly.
 * Additionally each vector has a magnitute, which is the Euclidean distance from the point (x, y)
 * on 2D coordinate system, to the origin point (0, 0) of that system.
 */
export class Vector2D {

    /**
     * Position on the x-axis.
     */
    x: number = 0;

    /**
     * Position on the y-axis.
     */
    y: number = 0;

    /**
     * The magnitude of the vector.
     * Distance to the origin point (0, 0); always positive.
     */
    mag: number = 0;

    /**
     * Creates new 2D vector for the given coordinates x and y.
     * @param x the position on the x axis.
     * @param y the position on the y axis.
     */
    constructor(x?:number, y?:number) {
        if(x) {
            this.x = x;
        }
        if (y) {
            this.y = y;
        }
        this.mag = Math.sqrt(this.x**2 + this.y**2)
    }

    /**
     * Add another vector to this vector.
     * @param vec the vector to add.
     * @returns {Vector2D} the sum of the two vectors.
     */
    add(vec: Vector2D): Vector2D {
        return new Vector2D(this.x + vec.x, this.y + vec.y)
    }

    /**
     * Subtract the given vector from this vector.
     * @param vec the vector to subtract from this vector.
     * @returns {Vector2D} the difference of the two vectors: (this - vec).
     */
    sub(vec: Vector2D): Vector2D {
        return new Vector2D(
            this.x - vec.x,
            this.y - vec.y
        )
    }

    /**
     * Multiplies the components of this vector by the components of the provided vector.
     * The result vector will be: (ax*bx, ay*by).
     * @param vec the vector to multiply with.
     * @returns {Vector2D} the result of the multiplication.
     */
    mul(vec: Vector2D): Vector2D {
        return new Vector2D(this.x * vec.x, this.y * vec.y)
    }

    /**
     * Multiplies this vector by a scalar.
     * @param value the scalar value to multiply this vector with.
     * @returns {Vector2D} the result vector of the multiplication by scalar value.
     */
    mulScalar(value:number): Vector2D {
        return new Vector2D(this.x * value, this.y * value)
    }

    /**
     * Calculates the Eucledian distance to another vector.
     * @param other the other vector to calculate distance to.
     * @returns {number} the Eucledian distance to the other vector. Always positive.
     */
    euclidDistace(other:Vector2D): number {
        return Math.sqrt((this.x - other.x)**2 + (this.y - other.y)**2)
    }

    /**
     * Calculates the dot product of this vector with antoher vector.
     * @param other the vector to calculate the dot product with.
     * @returns {number} the dot product value.
     */
    dot(other:Vector2D): number {
        return this.x * other.x + this.y * other.y
    }

    /**
     * Get the value (magnitude) of this vector.
     */
    value(): number {
        return this.mag
    }

    /**
     * Scale the components of this vector by the provided scale factors for each component.
     * @param fx the scale factor for the x component.
     * @param fy the scale factor for the y component.
     * @returns {Vector2D} the scaled vector.
     */
    scale(fx: number, fy:number): Vector2D {
        return this.mul(new Vector2D(fx, fy))
    }
}

/**
 * Base class for drawable objects.
 * Defines an internal state for moving objects:
 * <ul>
 * <li>position vector</li>
 * <li>velocity vector</li>
 * <li>acceleration vector</li>
 * <li>scale</li>
 * <ul>
 */
export abstract class BaseDrawableObject implements Drawable{
    /**
     * The object position in 2D.
     */
    position:Vector2D = new Vector2D(0, 0);

    /**
     * The object velosity in 2D
     */
    velocity: Vector2D = new Vector2D(0, 0);

    /**
     * The object acceleration in 2D
     */
    acceleration: Vector2D = new Vector2D(0, 0);

    /**
     * The scale of the vector values. Default scale is (1, 1).
     */
    scale:Vector2D = new Vector2D(1, 1);

    /**
     * Creates a new {Drawable} object from the given values for position, velocity and acceleration.
     * @param position the object position.
     * @param velocity the current velocity of the object.
     * @param acceleration the current acceleraiton of the object.
     * @param scale the object scale.
     */
    constructor(position?:Vector2D, velocity?:Vector2D, acceleration?: Vector2D, scale?: Vector2D) {
        this.position = position?? this.position;
        this.velocity = velocity?? this.velocity;
        this.acceleration = acceleration?? this.acceleration;
        this.scale = scale?? this.scale;
    }

    /**
     * Updates the object position based on its velocity, and the velocity based on the acceleration, based
     * on the elapsed time (delta).
     * @param frame current frame.
     * @param time current frame time.
     * @param delta the elapsed time since the last update (in seconds).
     */
    update(frame: number, time: Date, delta: number):void {
        this.position = this.position.add(this.velocity.mulScalar(delta))
        this.velocity = this.velocity.add(this.acceleration.mulScalar(delta))
    }

    abstract render(ctx: RenderingContext, frame: number, time: Date, delta: number):void;
    abstract getBoundingBox(): BoundingBox
    
}

/**
 * Base class for drawing providers.
 * 
 * Implements the management of the drawable objects, such as adding and removing of objects.
 * 
 * Implements the general render cycle for the objects.
 */
export abstract class BaseDrawingProvider implements DrawingProvider {
    drawables: Drawable[] = [];


    add(drawable: Drawable): void {
        this.drawables.push(drawable);
    }

    remove(drawable: Drawable): void {
        this.drawables = this.drawables.filter(d => d !== drawable)
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

    /**
     * Called before the actual rendering of the drawable objects starts, but after the RenderingContext has
     * been set.
     * @param ctx the current rendering context.
     */
    protected beforeRender(ctx: RenderingContext):void {

    }

    /**
     * Called after all drawable object have been rendered.
     * @param ctx the current rendering context.
     */
    protected afterRender(ctx: RenderingContext):void {

    }

    /**
     * Get the current rendering context, if available.
     * 
     * @returns the built {RenderingContext} if available, otherwise undefined.
     */
    abstract getRenderingContext(): RenderingContext | undefined;

}


/**
 * DrawingProvider that renders drawable objects on an HTML Canvas element.
 */
export class Canvas2DrawingProvider extends BaseDrawingProvider {
    
    private renderingContext?: CanvasRenderingContext2D;
    private canvasEl?: HTMLCanvasElement;

    /**
     * Set the underlying canvas element.
     * @param canvas the HTML canvas element on which to render the objects.
     */
    setCanvas(canvas: HTMLCanvasElement): void {
        this.canvasEl = canvas;
        this.renderingContext = canvas.getContext("2d")?? undefined
    }

    /**
     * Returns the underlying RenderingContext obtained from the canvas element.
     */
    getRenderingContext(): RenderingContext | undefined {
        return this.renderingContext;
    }

    /**
     * Pushes the current context state on stack, then clears the canvas to render the objects anew.
     * The underlying context is transformed, so that the y axis points upwards (instead of downwards as by default).
     * @param ctx the canvas 2D rendering context.
     */
    beforeRender(ctx: CanvasRenderingContext2D):void {
        if (!this.canvasEl) {
            return
        }
        ctx.save()
        ctx.clearRect(0, 0, this.canvasEl.width, this.canvasEl.height)
        ctx.transform(1, 0, 0, -1, 0, this.canvasEl.height)  // -1 scale the y axis, thus flip over
    }

    /**
     * Restores the original state of the canvas 2d rendering context.
     * @param ctx the canvas 2D rendering context.
     */
    afterRender(ctx: CanvasRenderingContext2D) {
        ctx.restore()
    }
}


/**
 * Object UI specification: fill color, border color and border width.
 */
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


/**
 * Drawable ball (circle) object.
 */
export class Ball extends BaseDrawableObject {

    radius: number = 0;
    specs: Specs;

    /**
     * Construct a new ball with the given specifications.
     * @param radius the ball (circle) radius.
     * @param specs the UI specifications.
     * @param position current position.
     * @param velocity current velocity.
     * @param acceleration current acceleration.
     * @param scale current scale (default (1, 1))
     */
    constructor(radius: number, specs: Specs, position?:Vector2D, velocity?:Vector2D, acceleration?: Vector2D, scale?: Vector2D) {
        super(position, velocity, acceleration, scale)
        this.radius = radius;
        this.specs = specs;
    }


    /**
     * Renders a circle on the canvas 2D rendering context.
     * @param ctx 
     * @param frame 
     * @param time 
     * @param delta 
     */
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

    /**
     * Returns the bounding box enclosing this circle.
     */
    getBoundingBox(): BoundingBox {
        return {
            x: this.position.x,
            y: this.position.y,
            width: this.radius * 2,
            height: this.radius * 2,
        }
    }

}
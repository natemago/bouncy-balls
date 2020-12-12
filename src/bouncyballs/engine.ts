import {AnimationLoop, UpdateLoop, Loop} from './animation'
import {Vector2D, DrawingProvider, Drawable, BaseDrawableObject, Ball} from './drawables'

/**
 * Engine and world settings, such as elasticiy, world width/height and frames per second.
 */
export type EngineSettings = {
    fps: number,
    world: {
        width: number,
        height: number,
    },
    elasticity: number,
}

/**
 * The main object orchestraing the rendering of objects and updating their states.
 * 
 * The engine contains all objects that sould be rendered on the screen (via the drawing provider)
 * and handles the upating of the state of each object. It applies handlers that check for collision
 * detection, bouncing back from the floor and state (position/velocity) update of the objects.
 */
export class Engine {

    animationLoop: Loop;
    updateLoop: Loop;
    settings: EngineSettings;
    drawingProvider: DrawingProvider;
    objects: Drawable[] = []

    /**
     * Creates a new Engine.
     * @param settings the engine settings
     * @param drawingProvider a {DrawingProvider} to use for rendering of the objects.
     */
    constructor(settings: EngineSettings, drawingProvider: DrawingProvider) {
        this.settings = settings
        this.animationLoop = new AnimationLoop()
        this.updateLoop = new UpdateLoop(settings.fps)
        this.drawingProvider = drawingProvider
    }

    /**
     * Starts the engine.
     * 
     * Basically starts the animation and update loops.
     */
    start():void {
        this.setupWorld()
        this.updateLoop.start()
        this.animationLoop.start()
    }

    /**
     * Does a setup of the world: add handlers to the update loop and registers the render handler of the
     * drawing provider with the animation loop.
     */
    setupWorld():void {
        this.updateLoop.addHandler(this.boundaryCheck.bind(this))
        this.updateLoop.addHandler(this.baseObjectsUpdate.bind(this))
        this.updateLoop.addHandler(this.bounceBack.bind(this))
        this.updateLoop.addHandler(this.collisionPhysics.bind(this))
        // setup the rendering
        this.animationLoop.addHandler(this.drawingProvider.render.bind(this.drawingProvider))
    }

    /**
     * Update state handler to check if the objects are still visible, and to remove those objects that
     * are invisible and will probably never come back in the world (such as balls rolling off to the left and right).
     * 
     * The objects are removed from the list and also are removed from the drawing provider to not render them.
     * 
     * @param frame current frame.
     * @param time current time.
     * @param delta elapsed time from the previous update frame.
     */
    boundaryCheck(frame: number, time:Date, delta:number):void {
        const {width} = this.settings.world
        const removeFromAnimation:Drawable[] = []
        this.objects = this.objects.filter(drawable => {
            if(drawable instanceof BaseDrawableObject) {
                const bdo = drawable as BaseDrawableObject
                const {x} = bdo.position
                
                if ((x < 0 && bdo.velocity.x < 0) || (x > width && bdo.velocity.x > 0)) {
                    removeFromAnimation.push(drawable)
                    return false
                }
                return true
            }
            return false
        })
        const drawingProvider = this.drawingProvider
        removeFromAnimation.forEach(drawable => drawingProvider.remove(drawable))
    }

    /**
     * Calls the 'update' method on every managed Drawable object.
     * 
     * This updates the position and velocity of each object.
     *
     * @param frame current frame.
     * @param time current time.
     * @param delta elapsed time from the previous update frame.
     */
    baseObjectsUpdate(frame: number, time:Date, delta:number): void {
        this.objects.forEach(drawable => {
            drawable.update(frame, time, delta)
        })
    }

    /**
     * Update loop hander to check if an object should bounce back from the floor.
     * 
     * When an object bounces back, the y-component of the velocity is flipped and the
     * position of the object on the y-axis is corrected (if the object is bellow the floor
     * is it put back on the floor at y=0).
     * 
     * @param frame current frame.
     * @param time current time.
     * @param delta elapsed time from the previous update frame.
     */
    bounceBack(frame: number, time:Date, delta:number): void {
        const {elasticity} = this.settings
        this.objects.forEach(drawable => {
            if (drawable instanceof BaseDrawableObject) {
                const bdo = drawable as BaseDrawableObject
                const bbox = bdo.getBoundingBox()
                if (bbox.y <= 0) {
                    bdo.position = new Vector2D(bdo.position.x, 0)

                    let correctedVelocity = bdo.velocity.y - bdo.acceleration.y*delta
                    bdo.velocity = new Vector2D(bdo.velocity.x, -(correctedVelocity)*elasticity)
                }
            }
        })
    }

    /**
     * Update loop handler that provides collision detection and performs an ideal elastic collision between the colliding balls.
     * 
     * After it detects a collision between two balls, it calculates the resulting velocities of the colision and corrects
     * the position of the second ball in the case when the two balls are overlapping.
     * 
     * @param frame current frame.
     * @param time current time.
     * @param delta elapsed time from the previous update frame.
     */
    collisionPhysics(frame: number, time:Date, delta:number):void {
        const balls:Ball[] = this.objects.filter(d => d instanceof Ball).map(d => d as Ball);
        const colliding: [Ball, Ball][] = []

        balls.forEach((d, i) => {
            const ball = d as Ball
            balls.slice(i+1).forEach(b2 => {
                const dist = ball.position.euclidDistace(b2.position)
                const radDist = ball.radius + b2.radius
                if (dist <= radDist) { // colision
                    colliding.push([ball, b2])
                    if (dist < radDist) { // fix the overlapping balls
                        const diff = radDist - dist
                        const vd = b2.position.sub(ball.position)
                        const scf = (vd.mag + diff) / vd.mag
                        b2.position = vd.scale(scf, scf).add(ball.position)
                    }
                }
            })
        })

        colliding.forEach(pair => {
            const [b1, b2] = pair
            const m1 = b1.radius**3 // mass proprtional to volume, volume is proportional to the 3rd power of the radius
            const m2 = b2.radius**3
            const c1 = b1.position.add(new Vector2D(b1.radius, b1.radius))
            const c2 = b2.position.add(new Vector2D(b2.radius, b2.radius))

            // Calculate the resulting velocity for an ideal elastic collision, using the following equations:
            // 
            //               2*m2   <v1 - v2, x1 - x2>
            //  v1' = v1 -  ⎯⎯⎯⎯ ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ (x1 - x2)
            //              m1 + m2    ||x1 - x2||^2
            // 

            // 
            //               2*m1   <v2 - v1, x2 - x1>
            //  v2' = v2 -  ⎯⎯⎯⎯ ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯ (x2 - x1)
            //              m1 + m2    ||x2 - x1||^2
            // 
            // 
            // Where:
            //   - v1 - is the initial velocity of the first ball
            //   - v1' - is the velocity of the first ball after the collision
            //   - v2 - is the initial velocity of the second ball
            //   - v2' - is the velocity of the second ball after the collision
            //   - m1 - is the mass of the first ball
            //   - m2 - is the mass of the second ball
            //   - x1 - is the position of the center of the first ball (vector)
            //   - x2 - is the position of the center of the second ball (vector)
            //   - <x1, x2> - represents the dot product of x1 and x2
            //   - ||vec|| - represents the magnitude of a vector

            const v1 = b1.velocity.sub(c1.sub(c2).mulScalar(b1.velocity.sub(b2.velocity).dot(c1.sub(c2)) / (c1.sub(c2).value()**2)).mulScalar((2*m2)/(m1+m2)))
            const v2 = b2.velocity.sub(c2.sub(c1).mulScalar(b2.velocity.sub(b1.velocity).dot(c2.sub(c1)) / (c2.sub(c1).value()**2)).mulScalar((2*m1)/(m1+m2)))

            b1.velocity = v1
            b2.velocity = v2
        })
    }

    /**
     * Stops the update and the animation loops.
     */
    stop():void {
        this.animationLoop.stop()
        this.updateLoop.stop()
    }

    /**
     * Updates the world size to new values.
     * 
     * Can be called while the engine is running.
     * 
     * @param w the new width of the world.
     * @param h the new height of the world.
     */
    updateWorldSize(w: number, h: number): void {
        this.settings.world = {
            width: w,
            height: h
        }
    }

    /**
     * Add another Drawable object to this engine.
     * @param obj the object to be added.
     */
    addObject(obj:Drawable): void {
        this.drawingProvider.add(obj)
        this.objects.push(obj)
    }
}
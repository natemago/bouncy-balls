import {AnimationLoop, UpdateLoop, Loop} from './animation'
import {Vector2D, DrawingProvider, Drawable, BaseDrawableObject, BaseDrawingProvider, Ball, Specs, Canvas2DrawingProvider} from './drawables'

type EngineSettings = {
    fps: number,
    world: {
        width: number,
        height: number,
    },
    elasticity: number,
}

export class Engine {

    animationLoop: Loop;
    updateLoop: Loop;
    settings: EngineSettings;
    drawingProvider: DrawingProvider;
    objects: Drawable[] = []

    constructor(settings: EngineSettings, drawingProvider: DrawingProvider) {
        this.settings = settings
        this.animationLoop = new AnimationLoop()
        this.updateLoop = new UpdateLoop(settings.fps)
        this.drawingProvider = drawingProvider
    }

    start():void {
        this.setupWorld()
        this.updateLoop.start()
        this.animationLoop.start()
    }

    setupWorld():void {
        this.updateLoop.addHandler(this.boundaryCheck.bind(this))
        this.updateLoop.addHandler(this.baseObjectsUpdate.bind(this))
        this.updateLoop.addHandler(this.bounceBack.bind(this))
        this.updateLoop.addHandler(this.collisionPhysics.bind(this))
        // setup the rendering
        this.animationLoop.addHandler(this.drawingProvider.render.bind(this.drawingProvider))
    }

    boundaryCheck(frame: number, time:Date, delta:number):void {
        const {width, height} = this.settings.world
        const removeFromAnimation:Drawable[] = []
        this.objects = this.objects.filter(drawable => {
            if(drawable instanceof BaseDrawableObject) {
                const bdo = drawable as BaseDrawableObject
                const {x,y} = bdo.position
                
                if ((x < 0 && bdo.velocity.x < 0) || (x > width && bdo.velocity.x > 0)) {
                    removeFromAnimation.push(drawable)
                    return false
                }
                return true
            }
        })
        const drawingProvider = this.drawingProvider
        removeFromAnimation.forEach(drawable => drawingProvider.remove(drawable))
    }

    baseObjectsUpdate(frame: number, time:Date, delta:number): void {
        this.objects.forEach(drawable => {
            drawable.update(frame, time, delta)
        })
    }

    bounceBack(frame: number, time:Date, delta:number): void {
        const {elasticity} = this.settings
        this.objects.forEach(drawable => {
            if (drawable instanceof BaseDrawableObject) {
                const bdo = drawable as BaseDrawableObject
                const bbox = bdo.getBoundingBox()
                if (bbox.y <= 0) {
                    bdo.position = new Vector2D(bdo.position.x, 0)
                    bdo.velocity = new Vector2D(bdo.velocity.x, -bdo.velocity.y*elasticity)
                }
            }
        })
    }


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
            const c1 = b1.position.add(new Vector2D(b1.radius, b1.radius))
            const c2 = b2.position.add(new Vector2D(b2.radius, b2.radius))
            const v1 = b1.velocity.sub(c1.sub(c2).mulScalar(b1.velocity.sub(b2.velocity).dot(c1.sub(c2)) / (c1.sub(c2).value()**2)))
            const v2 = b2.velocity.sub(c2.sub(c1).mulScalar(b2.velocity.sub(b1.velocity).dot(c2.sub(c1)) / (c2.sub(c1).value()**2)))

            b1.velocity = v1
            b2.velocity = v2
        })
    }


    stop():void {
        this.animationLoop.stop()
        this.updateLoop.stop()
    }

    updateWorldSize(w: number, h: number): void {
        this.settings.world = {
            width: w,
            height: h
        }
    }

    createBall(x: number, y: number):void {
        const velocity = 10
        const ball = new Ball(Math.random()*7 + 8, {
            fillColor: 'red',
            borderColor: 'black',
            borderWidth: 1,
        }, new Vector2D(x, this.settings.world.height - y), new Vector2D(
            Math.random()*velocity-velocity/2, 
            Math.random()*velocity-velocity/2), new Vector2D(0, -9.81))
        this.drawingProvider.add(ball)
        this.objects.push(ball)
    }
}
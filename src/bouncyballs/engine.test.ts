import {Engine} from './engine'
import {DrawingProvider, Drawable, BaseDrawableObject, Ball, Vector2D} from './drawables'

test('Test engine start and stop', () => {
    const drawingProviderMock = {
        render: (...args:any) => {},
    } as DrawingProvider
    const engine = new Engine({
        elasticity: 1,
        fps: 60,
        world: {
            width: 100,
            height: 100,
        }
    }, drawingProviderMock)

    const animLoopStart = jest.spyOn(engine.animationLoop, 'start')
    const animLoopStop = jest.spyOn(engine.animationLoop, 'stop')
    const updLoopStart = jest.spyOn(engine.updateLoop, 'start')
    const updLoopStop = jest.spyOn(engine.updateLoop, 'stop')
    const setupWorld = jest.spyOn(engine, 'setupWorld')

    engine.start()

    expect(animLoopStart).toHaveBeenCalled()
    expect(updLoopStart).toHaveBeenCalled()
    expect(setupWorld).toHaveBeenCalled()

    engine.stop()

    expect(animLoopStop).toHaveBeenCalled()
    expect(updLoopStop).toHaveBeenCalled()
})


test('Test Engine addObject', () => {
    const drawingProviderMock = {
        add: (...args:any) => {},
    } as DrawingProvider
    const engine = new Engine({
        elasticity: 1,
        fps: 60,
        world: {
            width: 100,
            height: 100,
        }
    }, drawingProviderMock)

    const drawingProviderAdd = jest.spyOn(drawingProviderMock, 'add')

    const drawable = {} as Drawable

    engine.addObject(drawable)

    expect(engine.objects.length).toBe(1)
    expect(drawingProviderAdd).toHaveBeenCalled()
})

test('Test Engine update world size', () => {
    const drawingProviderMock = {
    } as DrawingProvider
    const engine = new Engine({
        elasticity: 1,
        fps: 60,
        world: {
            width: 100,
            height: 100,
        }
    }, drawingProviderMock)

    expect(engine.settings.world.width).toBe(100)
    expect(engine.settings.world.height).toBe(100)

    engine.updateWorldSize(300, 400)
    expect(engine.settings.world.width).toBe(300)
    expect(engine.settings.world.height).toBe(400)
})

test('Test Engine boundary check', () => {
    const drawingProviderMock = {
        add: (...args:any) => {},
        remove: (...args:any) => {},
    } as DrawingProvider
    const engine = new Engine({
        elasticity: 1,
        fps: 60,
        world: {
            width: 100,
            height: 100,
        }
    }, drawingProviderMock)

    const newDrawable = (x:number, y:number):BaseDrawableObject => {
        return new Ball(10, {
            fillColor: 'red',
            borderColor: 'black',
            borderWidth:1,
        }, new Vector2D(x, y), new Vector2D(x, y))
    }

    for (let i = -100; i < 200; i += 10) {
        engine.addObject(newDrawable(i, 30))
    }

    expect(engine.objects.length).toBe(30)

    engine.boundaryCheck(1, new Date(), 0)

    expect(engine.objects.length).toBe(11)  // at 0, 10, 20, ... and 100
})

test('Test Engine baseObjectsUpdate', () => {
    const drawingProviderMock = {
        add: (...args:any) => {},
        remove: (...args:any) => {},
    } as DrawingProvider
    const engine = new Engine({
        elasticity: 1,
        fps: 60,
        world: {
            width: 100,
            height: 100,
        }
    }, drawingProviderMock)


    const createDrawableObject = (x: number, y: number): Drawable => {
        return {
            update: (...args: any): void => {},
        } as Drawable
    }

    
    for (let i = 0; i < 10; i++) {
        engine.addObject(createDrawableObject(i, i))
    }

    expect(engine.objects.length).toBe(10)

    const spies = engine.objects.map(obj => {
        return jest.spyOn(obj, 'update')
    })

    engine.baseObjectsUpdate(1, new Date(), 1)

    spies.forEach(objUpdateMethod => {
        expect(objUpdateMethod).toHaveBeenCalled()
    })

})

test('Test Enging bounceBack (from floor)', () => {
    const drawingProviderMock = {
        add: (...args: any): void => {}
    } as DrawingProvider

    const engine = new Engine({
        elasticity: 1,
        fps: 60,
        world: {
            width: 100,
            height: 100,
        }
    }, drawingProviderMock)

    const newDrawable = (x:number, y:number):BaseDrawableObject => {
        return new Ball(10, {
            fillColor: 'red',
            borderColor: 'black',
            borderWidth:1,
        }, new Vector2D(x, y))
    }

    const b1 = newDrawable(10, 0)
    b1.velocity = new Vector2D(0, -10)
    b1.acceleration = new Vector2D(0, -9.81)
    b1.position = new Vector2D(10, 0)


    const b2 = newDrawable(10, -5)
    b2.velocity = new Vector2D(0, -10)
    b2.acceleration = new Vector2D(0, -9.81)
    
    engine.addObject(b1)
    engine.addObject(b2)

    engine.bounceBack(1, new Date(), 1)

    expect(b1.position.y).toBe(0)
    expect(b1.velocity.y).toBe(10) // inverted from -10

    expect(b2.position.y).toBe(0)  // corrected for position of -5
    expect(b2.velocity.y).toBe(10) // inverted from -10

})

test('Test Engine collisionPhysics', () => {
    const drawingProviderMock = {
        add: (...args: any): void => {}
    } as DrawingProvider

    const engine = new Engine({
        elasticity: 1,
        fps: 60,
        world: {
            width: 100,
            height: 100,
        }
    }, drawingProviderMock)

    const newDrawable = (x:number, y:number, vx:number, vy:number):BaseDrawableObject => {
        return new Ball(10, {
            fillColor: 'red',
            borderColor: 'black',
            borderWidth:1,
        }, new Vector2D(x, y), new Vector2D(vx, vy))
    }

    // Two balls moving twards each other on the X-axis, touching
    const b1 = newDrawable(10, 10, 10, 0)
    const b2 = newDrawable(30, 10, -5, 0)

    engine.addObject(b1)
    engine.addObject(b2)

    engine.collisionPhysics(1, new Date(), 1)

    // expect objects to exchange horizontal speed - same mass, ideally elastic collision
    expect(b1.velocity.x).toBe(-5)
    expect(b2.velocity.x).toBe(10)

    // Two balls moving towards each other on the Y axis
    b1.position = new Vector2D(10, 10)
    b2.position = new Vector2D(10, 30)

    b1.velocity = new Vector2D(0, 10) // up
    b2.velocity = new Vector2D(0, -5) // down

    engine.collisionPhysics(2, new Date(), 1)

    // expect objects to exchange horizontal speed - same mass, ideally elastic collision
    expect(b1.velocity.y).toBe(-5)
    expect(b2.velocity.y).toBe(10)

    // check if position is corrected, if the balls are overlapping
    b1.position = new Vector2D(10, 10)
    b2.position = new Vector2D(10, 15)

    b1.velocity = new Vector2D(0, 10) // up
    b2.velocity = new Vector2D(0, -5) // down

    engine.collisionPhysics(3, new Date(), 1)

    // expect objects to exchange horizontal speed - same mass, ideally elastic collision
    expect(b1.velocity.y).toBe(-5)
    expect(b2.velocity.y).toBe(10)

    // expect that the position of the second ball is corrected
    expect(b2.position.y).toBe(30)

    // Test a case when the colision is at an angle towards the velocity vector
    const bb1 = b1 as Ball
    const bb2 = b2 as Ball

    bb1.radius = Math.sqrt(5)
    bb2.radius = Math.sqrt(5)

    bb1.position = new Vector2D(10, 10)
    bb2.position = new Vector2D(14, 12)

    const v1 = new Vector2D(2, -1)
    const v2 = new Vector2D(-1, 2)

    bb1.velocity = v1
    bb2.velocity = v2

    engine.collisionPhysics(4, new Date(), 1)

    expect(bb1.velocity.x === v1.x).toBeFalsy()
    expect(bb1.velocity.y === v1.y).toBeFalsy()
    expect(bb2.velocity.x === v2.x).toBeFalsy()
    expect(bb2.velocity.y === v2.y).toBeFalsy()

    // expect the total momentum to be conserved (mass is equal in both balls)
    expect(v1.x + v2.x).toBeCloseTo(bb1.velocity.x + bb2.velocity.x)
    expect(v1.y + v2.y).toBeCloseTo(bb1.velocity.y + bb2.velocity.y)
})
import {Vector2D, Canvas2DrawingProvider, Drawable, Ball} from './drawables'


test('Test Vector2D base creation', () => {
    const vec = new Vector2D(3, 4)
    expect(vec.x).toBe(3)
    expect(vec.y).toBe(4)
    expect(vec.mag).toBe(5)
    expect(vec.value()).toBe(5)
})

test('Test Vector2D addition', () => {
    const a = new Vector2D(3, 4)
    const b = new Vector2D(5, 6)

    const ab = a.add(b)
    const ba = b.add(a)

    expect(ab.x).toBe(ba.x)
    expect(ab.y).toBe(ba.y)

    expect(ab.x).toBe(a.x + b.x)
    expect(ab.y).toBe(a.y + b.y)
})

test('Test Vector2D subtraction', () => {
    const a = new Vector2D(3, 4)
    const b = new Vector2D(5, 6)

    const ab = a.sub(b)

    expect(ab.x).toBe(a.x - b.x)
    expect(ab.y).toBe(a.y - b.y)
})

test('Test Vector2D multiplication by scalar', () => {
    const a = new Vector2D(3, 4)

    const ab = a.mulScalar(5)

    expect(ab.x).toBe(a.x * 5)
    expect(ab.y).toBe(a.y * 5)
})

test('Test Vector2D multiplication (mul)', () => {
    const a = new Vector2D(3, 4)
    const b = new Vector2D(5, 6)

    const ab = a.mul(b)

    expect(ab.x).toBe(a.x * b.x)
    expect(ab.y).toBe(a.y * b.y)
})

test('Test Vector2D Euclid distance', () => {
    const a = new Vector2D(3, 10)
    const b = new Vector2D(6, 14)

    const d = a.euclidDistace(b)

    expect(d).toBe(5)
})

test('Test Vector2D dot product', () => {
    const a = new Vector2D(3, 10)
    const b = new Vector2D(6, 14)

    const d = a.dot(b)

    expect(d).toBe(3*6 + 10*14)
})

test('Test scale a vector', () => {
    const a = new Vector2D(5, 7)
    const result = a.scale(2, 3)

    expect(result.x).toBe(10)
    expect(result.y).toBe(21)
})

test('Test Canvas2DrawingProvider', () => {

    const drawable = {
        render: (...args:any) => {}
    } as Drawable

    const drawableRenderMock = jest.spyOn(drawable, 'render')

    const context = {
        save: () => {},
        restore: () => {},
        clearRect: (...args:any) => {},
        transform: (...args:any) => {},
    } as CanvasRenderingContext2D

    const canvas = {
        getContext: (type:string) => {
            return context
        }
    } as HTMLCanvasElement

    const getContextMock = jest.spyOn(canvas, 'getContext')


    const provider = new Canvas2DrawingProvider()
    provider.setCanvas(canvas)

    expect(getContextMock).toHaveBeenCalled()
    
    const ctx = provider.getRenderingContext()
    expect(ctx).toBeTruthy()
    
    provider.add(drawable)
    expect(provider.drawables.length).toBe(1)

    provider.render(1, new Date(), 0)

    expect(drawableRenderMock).toHaveBeenCalledTimes(1)

    provider.remove(drawable)

    expect(provider.drawables.length).toBe(0)
})

test('Test Ball as Drawable - render', () => {
    const ball = new Ball(10, {
        borderColor: 'black',
        borderWidth: 1,
        fillColor: 'red'
    }, new Vector2D(20, 30), new Vector2D(5, 5), new Vector2D(1, 1))

    const context = {
        beginPath: () => {},
        closePath: () => {},
        arc: (...args:any) => {},
        fill: () => {},
        stroke: () => {},
        save: () => {},
        restore: () => {},
    } as CanvasRenderingContext2D

    const spies = [
        jest.spyOn(context, 'beginPath'),
        jest.spyOn(context, 'closePath'),
        jest.spyOn(context, 'beginPath'),
        jest.spyOn(context, 'arc'),
        jest.spyOn(context, 'fill'),
        jest.spyOn(context, 'stroke'),
        jest.spyOn(context, 'save'),
        jest.spyOn(context, 'restore'),
    ]
    


    const bbox = ball.getBoundingBox()
    expect(bbox.height).toBe(20)
    expect(bbox.width).toBe(20)
    expect(bbox.x).toBe(20)
    expect(bbox.y).toBe(30)
    
    ball.render(context, 1, new Date(), 0)

    spies.forEach(fn => {
        expect(fn).toBeCalled()
    })

})


test('Test Ball as Drawable - update', () => {
    const ball = new Ball(10, {
        borderColor: 'black',
        borderWidth: 1,
        fillColor: 'red'
    }, new Vector2D(20, 30), new Vector2D(5, 5), new Vector2D(1, 1))

    ball.update(1, new Date(), 10)

    const pos = ball.position
    expect(pos.x).toBe(20 + 5*10)
    expect(pos.y).toBe(30 + 5*10)
})
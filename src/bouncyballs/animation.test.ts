import jest from 'ts-jest'
import {AnimationLoop, UpdateLoop} from './animation'

test('Test animation loop', () => {
    const initTime = new Date()

    return new Promise((resolve) => {
        
        const loop = new AnimationLoop()

        loop.addHandler((tick: number, date: Date, delta: number)=> {
            
            expect(tick).toBeGreaterThan(0)
            expect(date.getTime()).toBeGreaterThan(initTime.getTime())
            expect(delta).toBeGreaterThanOrEqual(0)

            resolve(true)
        })
        loop.start()
    })
})

test('Test animation loop start and stop', () => {
    const loop = new AnimationLoop()
    loop.addHandler(() => {

    })
    loop.start()
    return  (new Promise((resolve) => {
        // just put it at the end of the event loop
        setTimeout(() => {
            expect(loop.isRunning()).toBeTruthy()
            resolve(true)
        })
    })).then(() => {
        loop.stop()
        return new Promise((resolve) => {
            expect(loop.isRunning()).toBeFalsy()
            resolve(true)
        })
    })
})

test('Test Update loop', () => {
    const initTime = new Date()

    const loop = new UpdateLoop(60)

    return new Promise((resolve) => {
        loop.addHandler((tick: number, date: Date, delta: number)=> {
            
            expect(tick).toBeGreaterThan(0)
            expect(date.getTime()).toBeGreaterThan(initTime.getTime())
            expect(delta).toBeGreaterThanOrEqual(0)

            resolve(true)
        })
        loop.start()
    })
})

test('Test update loop start and stop', () => {
    const loop = new UpdateLoop(60)
    loop.addHandler(() => {

    })
    loop.start()
    return  (new Promise((resolve) => {
        // just put it at the end of the event loop
        setTimeout(() => {
            expect(loop.isRunning()).toBeTruthy()
            resolve(true)
        })
    })).then(() => {
        loop.stop()
        return new Promise((resolve) => {
            expect(loop.isRunning()).toBeFalsy()
            resolve(true)
        })
    })
})
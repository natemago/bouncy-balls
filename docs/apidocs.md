## Classes

<dl>
<dt><a href="#App">App</a></dt>
<dd><p>Main app React component class.</p></dd>
<dt><a href="#Vector2D">Vector2D</a></dt>
<dd><p>Represents a 2D vector.</p>
<p>Each 2D vector has two components: x and y - positions on the x and y axes accordingly.
Additionally each vector has a magnitute, which is the Euclidean distance from the point (x, y)
on 2D coordinate system, to the origin point (0, 0) of that system.</p></dd>
<dt><a href="#BaseDrawableObject">BaseDrawableObject</a></dt>
<dd></dd>
<dt><a href="#Ball">Ball</a></dt>
<dd></dd>
<dt><a href="#BaseLoop">BaseLoop</a></dt>
<dd><p>Implements the basic properties of a loop, like adding and managing handlers, setup and teardown per tick.</p></dd>
<dt><a href="#UpdateLoop">UpdateLoop</a></dt>
<dd></dd>
</dl>

## Members

<dl>
<dt><a href="#Vector2D">Vector2D</a></dt>
<dd><p>Base class for drawable objects.
Defines an internal state for moving objects:</p>
<ul>
<li>position vector</li>
<li>velocity vector</li>
<li>acceleration vector</li>
<li>scale</li>
<ul></dd>
<dt><a href="#BaseDrawableObject">BaseDrawableObject</a></dt>
<dd><p>Base class for drawing providers.</p>
<p>Implements the management of the drawable objects, such as adding and removing of objects.</p>
<p>Implements the general render cycle for the objects.</p></dd>
<dt><a href="#BaseDrawingProvider">BaseDrawingProvider</a></dt>
<dd><p>DrawingProvider that renders drawable objects on an HTML Canvas element.</p></dd>
<dt><a href="#Canvas2DrawingProvider">Canvas2DrawingProvider</a></dt>
<dd><p>Object UI specification: fill color, border color and border width.</p></dd>
<dt><a href="#Specs">Specs</a></dt>
<dd><p>Drawable ball (circle) object.</p></dd>
<dt><a href="#BaseLoop">BaseLoop</a></dt>
<dd><p>A loop for animations.</p>
<p>This implementation uses 'requestAnimationFrame' internally to schedule and run the tick function.</p>
<p>This implementation is intended to be used for visual animations, as 'requestAnimationFrame' may not be
called when the browser/tab is not in view.</p>
<p>The frame rate cannot be set directly, as it depends on the actual browser implementation of 'requestAnimationFrame'.</p></dd>
<dt><a href="#AnimationLoop">AnimationLoop</a></dt>
<dd><p>A loop for periodic update of the state of the objects.</p>
<p>This implementation uses 'setInterval' internally to schedule the execution of the handlers at a given
frame rate (FPS). The handlers will be executed always while this loop is running.</p></dd>
</dl>

<a name="App"></a>

## App
<p>Main app React component class.</p>

**Kind**: global class  
<a name="Vector2D"></a>

## Vector2D
<p>Represents a 2D vector.</p>
<p>Each 2D vector has two components: x and y - positions on the x and y axes accordingly.
Additionally each vector has a magnitute, which is the Euclidean distance from the point (x, y)
on 2D coordinate system, to the origin point (0, 0) of that system.</p>

**Kind**: global class  

* [Vector2D](#Vector2D)
    * [new Vector2D(x, y)](#new_Vector2D_new)
    * [.add(vec)](#Vector2D+add) ⇒ [<code>Vector2D</code>](#Vector2D)
    * [.sub(vec)](#Vector2D+sub) ⇒ [<code>Vector2D</code>](#Vector2D)
    * [.mul(vec)](#Vector2D+mul) ⇒ [<code>Vector2D</code>](#Vector2D)
    * [.mulScalar(value)](#Vector2D+mulScalar) ⇒ [<code>Vector2D</code>](#Vector2D)
    * [.euclidDistace(other)](#Vector2D+euclidDistace) ⇒ <code>number</code>
    * [.dot(other)](#Vector2D+dot) ⇒ <code>number</code>
    * [.value()](#Vector2D+value)
    * [.scale(fx, fy)](#Vector2D+scale) ⇒ [<code>Vector2D</code>](#Vector2D)

<a name="new_Vector2D_new"></a>

### new Vector2D(x, y)
<p>Creates new 2D vector for the given coordinates x and y.</p>


| Param | Description |
| --- | --- |
| x | <p>the position on the x axis.</p> |
| y | <p>the position on the y axis.</p> |

<a name="Vector2D+add"></a>

### vector2D.add(vec) ⇒ [<code>Vector2D</code>](#Vector2D)
<p>Add another vector to this vector.</p>

**Kind**: instance method of [<code>Vector2D</code>](#Vector2D)  
**Returns**: [<code>Vector2D</code>](#Vector2D) - <p>the sum of the two vectors.</p>  

| Param | Description |
| --- | --- |
| vec | <p>the vector to add.</p> |

<a name="Vector2D+sub"></a>

### vector2D.sub(vec) ⇒ [<code>Vector2D</code>](#Vector2D)
<p>Subtract the given vector from this vector.</p>

**Kind**: instance method of [<code>Vector2D</code>](#Vector2D)  
**Returns**: [<code>Vector2D</code>](#Vector2D) - <p>the difference of the two vectors: (this - vec).</p>  

| Param | Description |
| --- | --- |
| vec | <p>the vector to subtract from this vector.</p> |

<a name="Vector2D+mul"></a>

### vector2D.mul(vec) ⇒ [<code>Vector2D</code>](#Vector2D)
<p>Multiplies the components of this vector by the components of the provided vector.
The result vector will be: (ax<em>bx, ay</em>by).</p>

**Kind**: instance method of [<code>Vector2D</code>](#Vector2D)  
**Returns**: [<code>Vector2D</code>](#Vector2D) - <p>the result of the multiplication.</p>  

| Param | Description |
| --- | --- |
| vec | <p>the vector to multiply with.</p> |

<a name="Vector2D+mulScalar"></a>

### vector2D.mulScalar(value) ⇒ [<code>Vector2D</code>](#Vector2D)
<p>Multiplies this vector by a scalar.</p>

**Kind**: instance method of [<code>Vector2D</code>](#Vector2D)  
**Returns**: [<code>Vector2D</code>](#Vector2D) - <p>the result vector of the multiplication by scalar value.</p>  

| Param | Description |
| --- | --- |
| value | <p>the scalar value to multiply this vector with.</p> |

<a name="Vector2D+euclidDistace"></a>

### vector2D.euclidDistace(other) ⇒ <code>number</code>
<p>Calculates the Eucledian distance to another vector.</p>

**Kind**: instance method of [<code>Vector2D</code>](#Vector2D)  
**Returns**: <code>number</code> - <p>the Eucledian distance to the other vector. Always positive.</p>  

| Param | Description |
| --- | --- |
| other | <p>the other vector to calculate distance to.</p> |

<a name="Vector2D+dot"></a>

### vector2D.dot(other) ⇒ <code>number</code>
<p>Calculates the dot product of this vector with antoher vector.</p>

**Kind**: instance method of [<code>Vector2D</code>](#Vector2D)  
**Returns**: <code>number</code> - <p>the dot product value.</p>  

| Param | Description |
| --- | --- |
| other | <p>the vector to calculate the dot product with.</p> |

<a name="Vector2D+value"></a>

### vector2D.value()
<p>Get the value (magnitude) of this vector.</p>

**Kind**: instance method of [<code>Vector2D</code>](#Vector2D)  
<a name="Vector2D+scale"></a>

### vector2D.scale(fx, fy) ⇒ [<code>Vector2D</code>](#Vector2D)
<p>Scale the components of this vector by the provided scale factors for each component.</p>

**Kind**: instance method of [<code>Vector2D</code>](#Vector2D)  
**Returns**: [<code>Vector2D</code>](#Vector2D) - <p>the scaled vector.</p>  

| Param | Description |
| --- | --- |
| fx | <p>the scale factor for the x component.</p> |
| fy | <p>the scale factor for the y component.</p> |

<a name="BaseDrawableObject"></a>

## BaseDrawableObject
**Kind**: global class  

* [BaseDrawableObject](#BaseDrawableObject)
    * [new BaseDrawableObject(position, velocity, acceleration, scale)](#new_BaseDrawableObject_new)
    * [.update(frame, time, delta)](#BaseDrawableObject+update)

<a name="new_BaseDrawableObject_new"></a>

### new BaseDrawableObject(position, velocity, acceleration, scale)
<p>Creates a new {Drawable} object from the given values for position, velocity and acceleration.</p>


| Param | Description |
| --- | --- |
| position | <p>the object position.</p> |
| velocity | <p>the current velocity of the object.</p> |
| acceleration | <p>the current acceleraiton of the object.</p> |
| scale | <p>the object scale.</p> |

<a name="BaseDrawableObject+update"></a>

### baseDrawableObject.update(frame, time, delta)
<p>Updates the object position based on its velocity, and the velocity based on the acceleration, based
on the elapsed time (delta).</p>

**Kind**: instance method of [<code>BaseDrawableObject</code>](#BaseDrawableObject)  

| Param | Description |
| --- | --- |
| frame | <p>current frame.</p> |
| time | <p>current frame time.</p> |
| delta | <p>the elapsed time since the last update (in seconds).</p> |

<a name="Ball"></a>

## Ball
**Kind**: global class  

* [Ball](#Ball)
    * [new Ball(radius, specs, position, velocity, acceleration, scale)](#new_Ball_new)
    * [.render(ctx, frame, time, delta)](#Ball+render)
    * [.getBoundingBox()](#Ball+getBoundingBox)

<a name="new_Ball_new"></a>

### new Ball(radius, specs, position, velocity, acceleration, scale)
<p>Construct a new ball with the given specifications.</p>


| Param | Description |
| --- | --- |
| radius | <p>the ball (circle) radius.</p> |
| specs | <p>the UI specifications.</p> |
| position | <p>current position.</p> |
| velocity | <p>current velocity.</p> |
| acceleration | <p>current acceleration.</p> |
| scale | <p>current scale (default (1, 1))</p> |

<a name="Ball+render"></a>

### ball.render(ctx, frame, time, delta)
<p>Renders a circle on the canvas 2D rendering context.</p>

**Kind**: instance method of [<code>Ball</code>](#Ball)  

| Param |
| --- |
| ctx | 
| frame | 
| time | 
| delta | 

<a name="Ball+getBoundingBox"></a>

### ball.getBoundingBox()
<p>Returns the bounding box enclosing this circle.</p>

**Kind**: instance method of [<code>Ball</code>](#Ball)  
<a name="BaseLoop"></a>

## BaseLoop
<p>Implements the basic properties of a loop, like adding and managing handlers, setup and teardown per tick.</p>

**Kind**: global class  

* [BaseLoop](#BaseLoop)
    * [.tick()](#BaseLoop+tick)
    * [.start()](#BaseLoop+start)
    * [.stop()](#BaseLoop+stop)

<a name="BaseLoop+tick"></a>

### baseLoop.tick()
<p>One tick of the loop.
This is the main function that is called when the loop is running, usually multiple times per second.</p>

**Kind**: instance method of [<code>BaseLoop</code>](#BaseLoop)  
<a name="BaseLoop+start"></a>

### baseLoop.start()
<p>Starts the loop.</p>
<p>Sets up a handler for the 'tick' function, that schedules it to run periodically.</p>

**Kind**: instance method of [<code>BaseLoop</code>](#BaseLoop)  
<a name="BaseLoop+stop"></a>

### baseLoop.stop()
<p>Stops the loop.</p>
<p>Clears the handler for the 'tick' function and marks this loop as not running.</p>

**Kind**: instance method of [<code>BaseLoop</code>](#BaseLoop)  
<a name="UpdateLoop"></a>

## UpdateLoop
**Kind**: global class  

* [UpdateLoop](#UpdateLoop)
    * [new UpdateLoop(fps)](#new_UpdateLoop_new)
    * [.scheduleTick(tickFn)](#UpdateLoop+scheduleTick)
    * [.cancelTick(tickHandler)](#UpdateLoop+cancelTick)

<a name="new_UpdateLoop_new"></a>

### new UpdateLoop(fps)
<p>Create new UpdateLoop instance with a given frame rate (frames per second).</p>


| Param | Description |
| --- | --- |
| fps | <p>frame rate in frames-per-second.</p> |

<a name="UpdateLoop+scheduleTick"></a>

### updateLoop.scheduleTick(tickFn)
<p>Schedules the execution of the 'tick' function at a pre-defined frame rate.</p>

**Kind**: instance method of [<code>UpdateLoop</code>](#UpdateLoop)  

| Param | Description |
| --- | --- |
| tickFn | <p>the function to be scheduled to execute at a given frame rate.</p> |

<a name="UpdateLoop+cancelTick"></a>

### updateLoop.cancelTick(tickHandler)
<p>Cancels the execution of the given handler.</p>

**Kind**: instance method of [<code>UpdateLoop</code>](#UpdateLoop)  

| Param | Description |
| --- | --- |
| tickHandler | <p>the scheduled function handler.</p> |

<a name="Vector2D"></a>

## Vector2D
<p>Base class for drawable objects.
Defines an internal state for moving objects:</p>
<ul>
<li>position vector</li>
<li>velocity vector</li>
<li>acceleration vector</li>
<li>scale</li>
<ul>

**Kind**: global variable  

* [Vector2D](#Vector2D)
    * [new Vector2D(x, y)](#new_Vector2D_new)
    * [.add(vec)](#Vector2D+add) ⇒ [<code>Vector2D</code>](#Vector2D)
    * [.sub(vec)](#Vector2D+sub) ⇒ [<code>Vector2D</code>](#Vector2D)
    * [.mul(vec)](#Vector2D+mul) ⇒ [<code>Vector2D</code>](#Vector2D)
    * [.mulScalar(value)](#Vector2D+mulScalar) ⇒ [<code>Vector2D</code>](#Vector2D)
    * [.euclidDistace(other)](#Vector2D+euclidDistace) ⇒ <code>number</code>
    * [.dot(other)](#Vector2D+dot) ⇒ <code>number</code>
    * [.value()](#Vector2D+value)
    * [.scale(fx, fy)](#Vector2D+scale) ⇒ [<code>Vector2D</code>](#Vector2D)

<a name="new_Vector2D_new"></a>

### new Vector2D(x, y)
<p>Creates new 2D vector for the given coordinates x and y.</p>


| Param | Description |
| --- | --- |
| x | <p>the position on the x axis.</p> |
| y | <p>the position on the y axis.</p> |

<a name="Vector2D+add"></a>

### vector2D.add(vec) ⇒ [<code>Vector2D</code>](#Vector2D)
<p>Add another vector to this vector.</p>

**Kind**: instance method of [<code>Vector2D</code>](#Vector2D)  
**Returns**: [<code>Vector2D</code>](#Vector2D) - <p>the sum of the two vectors.</p>  

| Param | Description |
| --- | --- |
| vec | <p>the vector to add.</p> |

<a name="Vector2D+sub"></a>

### vector2D.sub(vec) ⇒ [<code>Vector2D</code>](#Vector2D)
<p>Subtract the given vector from this vector.</p>

**Kind**: instance method of [<code>Vector2D</code>](#Vector2D)  
**Returns**: [<code>Vector2D</code>](#Vector2D) - <p>the difference of the two vectors: (this - vec).</p>  

| Param | Description |
| --- | --- |
| vec | <p>the vector to subtract from this vector.</p> |

<a name="Vector2D+mul"></a>

### vector2D.mul(vec) ⇒ [<code>Vector2D</code>](#Vector2D)
<p>Multiplies the components of this vector by the components of the provided vector.
The result vector will be: (ax<em>bx, ay</em>by).</p>

**Kind**: instance method of [<code>Vector2D</code>](#Vector2D)  
**Returns**: [<code>Vector2D</code>](#Vector2D) - <p>the result of the multiplication.</p>  

| Param | Description |
| --- | --- |
| vec | <p>the vector to multiply with.</p> |

<a name="Vector2D+mulScalar"></a>

### vector2D.mulScalar(value) ⇒ [<code>Vector2D</code>](#Vector2D)
<p>Multiplies this vector by a scalar.</p>

**Kind**: instance method of [<code>Vector2D</code>](#Vector2D)  
**Returns**: [<code>Vector2D</code>](#Vector2D) - <p>the result vector of the multiplication by scalar value.</p>  

| Param | Description |
| --- | --- |
| value | <p>the scalar value to multiply this vector with.</p> |

<a name="Vector2D+euclidDistace"></a>

### vector2D.euclidDistace(other) ⇒ <code>number</code>
<p>Calculates the Eucledian distance to another vector.</p>

**Kind**: instance method of [<code>Vector2D</code>](#Vector2D)  
**Returns**: <code>number</code> - <p>the Eucledian distance to the other vector. Always positive.</p>  

| Param | Description |
| --- | --- |
| other | <p>the other vector to calculate distance to.</p> |

<a name="Vector2D+dot"></a>

### vector2D.dot(other) ⇒ <code>number</code>
<p>Calculates the dot product of this vector with antoher vector.</p>

**Kind**: instance method of [<code>Vector2D</code>](#Vector2D)  
**Returns**: <code>number</code> - <p>the dot product value.</p>  

| Param | Description |
| --- | --- |
| other | <p>the vector to calculate the dot product with.</p> |

<a name="Vector2D+value"></a>

### vector2D.value()
<p>Get the value (magnitude) of this vector.</p>

**Kind**: instance method of [<code>Vector2D</code>](#Vector2D)  
<a name="Vector2D+scale"></a>

### vector2D.scale(fx, fy) ⇒ [<code>Vector2D</code>](#Vector2D)
<p>Scale the components of this vector by the provided scale factors for each component.</p>

**Kind**: instance method of [<code>Vector2D</code>](#Vector2D)  
**Returns**: [<code>Vector2D</code>](#Vector2D) - <p>the scaled vector.</p>  

| Param | Description |
| --- | --- |
| fx | <p>the scale factor for the x component.</p> |
| fy | <p>the scale factor for the y component.</p> |

<a name="BaseDrawableObject"></a>

## BaseDrawableObject
<p>Base class for drawing providers.</p>
<p>Implements the management of the drawable objects, such as adding and removing of objects.</p>
<p>Implements the general render cycle for the objects.</p>

**Kind**: global variable  

* [BaseDrawableObject](#BaseDrawableObject)
    * [new BaseDrawableObject(position, velocity, acceleration, scale)](#new_BaseDrawableObject_new)
    * [.update(frame, time, delta)](#BaseDrawableObject+update)

<a name="new_BaseDrawableObject_new"></a>

### new BaseDrawableObject(position, velocity, acceleration, scale)
<p>Creates a new {Drawable} object from the given values for position, velocity and acceleration.</p>


| Param | Description |
| --- | --- |
| position | <p>the object position.</p> |
| velocity | <p>the current velocity of the object.</p> |
| acceleration | <p>the current acceleraiton of the object.</p> |
| scale | <p>the object scale.</p> |

<a name="BaseDrawableObject+update"></a>

### baseDrawableObject.update(frame, time, delta)
<p>Updates the object position based on its velocity, and the velocity based on the acceleration, based
on the elapsed time (delta).</p>

**Kind**: instance method of [<code>BaseDrawableObject</code>](#BaseDrawableObject)  

| Param | Description |
| --- | --- |
| frame | <p>current frame.</p> |
| time | <p>current frame time.</p> |
| delta | <p>the elapsed time since the last update (in seconds).</p> |

<a name="BaseDrawingProvider"></a>

## BaseDrawingProvider
<p>DrawingProvider that renders drawable objects on an HTML Canvas element.</p>

**Kind**: global variable  

* [BaseDrawingProvider](#BaseDrawingProvider)
    * [.beforeRender(ctx)](#BaseDrawingProvider+beforeRender)
    * [.afterRender(ctx)](#BaseDrawingProvider+afterRender)

<a name="BaseDrawingProvider+beforeRender"></a>

### baseDrawingProvider.beforeRender(ctx)
<p>Called before the actual rendering of the drawable objects starts, but after the RenderingContext has
been set.</p>

**Kind**: instance method of [<code>BaseDrawingProvider</code>](#BaseDrawingProvider)  

| Param | Description |
| --- | --- |
| ctx | <p>the current rendering context.</p> |

<a name="BaseDrawingProvider+afterRender"></a>

### baseDrawingProvider.afterRender(ctx)
<p>Called after all drawable object have been rendered.</p>

**Kind**: instance method of [<code>BaseDrawingProvider</code>](#BaseDrawingProvider)  

| Param | Description |
| --- | --- |
| ctx | <p>the current rendering context.</p> |

<a name="Canvas2DrawingProvider"></a>

## Canvas2DrawingProvider
<p>Object UI specification: fill color, border color and border width.</p>

**Kind**: global variable  

* [Canvas2DrawingProvider](#Canvas2DrawingProvider)
    * [.setCanvas(canvas)](#Canvas2DrawingProvider+setCanvas)
    * [.getRenderingContext()](#Canvas2DrawingProvider+getRenderingContext)
    * [.beforeRender(ctx)](#Canvas2DrawingProvider+beforeRender)
    * [.afterRender(ctx)](#Canvas2DrawingProvider+afterRender)

<a name="Canvas2DrawingProvider+setCanvas"></a>

### canvas2DrawingProvider.setCanvas(canvas)
<p>Set the underlying canvas element.</p>

**Kind**: instance method of [<code>Canvas2DrawingProvider</code>](#Canvas2DrawingProvider)  

| Param | Description |
| --- | --- |
| canvas | <p>the HTML canvas element on which to render the objects.</p> |

<a name="Canvas2DrawingProvider+getRenderingContext"></a>

### canvas2DrawingProvider.getRenderingContext()
<p>Returns the underlying RenderingContext obtained from the canvas element.</p>

**Kind**: instance method of [<code>Canvas2DrawingProvider</code>](#Canvas2DrawingProvider)  
<a name="Canvas2DrawingProvider+beforeRender"></a>

### canvas2DrawingProvider.beforeRender(ctx)
<p>Pushes the current context state on stack, then clears the canvas to render the objects anew.
The underlying context is transformed, so that the y axis points upwards (instead of downwards as by default).</p>

**Kind**: instance method of [<code>Canvas2DrawingProvider</code>](#Canvas2DrawingProvider)  

| Param | Description |
| --- | --- |
| ctx | <p>the canvas 2D rendering context.</p> |

<a name="Canvas2DrawingProvider+afterRender"></a>

### canvas2DrawingProvider.afterRender(ctx)
<p>Restores the original state of the canvas 2d rendering context.</p>

**Kind**: instance method of [<code>Canvas2DrawingProvider</code>](#Canvas2DrawingProvider)  

| Param | Description |
| --- | --- |
| ctx | <p>the canvas 2D rendering context.</p> |

<a name="Specs"></a>

## Specs
<p>Drawable ball (circle) object.</p>

**Kind**: global variable  
<a name="BaseLoop"></a>

## BaseLoop
<p>A loop for animations.</p>
<p>This implementation uses 'requestAnimationFrame' internally to schedule and run the tick function.</p>
<p>This implementation is intended to be used for visual animations, as 'requestAnimationFrame' may not be
called when the browser/tab is not in view.</p>
<p>The frame rate cannot be set directly, as it depends on the actual browser implementation of 'requestAnimationFrame'.</p>

**Kind**: global variable  

* [BaseLoop](#BaseLoop)
    * [.tick()](#BaseLoop+tick)
    * [.start()](#BaseLoop+start)
    * [.stop()](#BaseLoop+stop)

<a name="BaseLoop+tick"></a>

### baseLoop.tick()
<p>One tick of the loop.
This is the main function that is called when the loop is running, usually multiple times per second.</p>

**Kind**: instance method of [<code>BaseLoop</code>](#BaseLoop)  
<a name="BaseLoop+start"></a>

### baseLoop.start()
<p>Starts the loop.</p>
<p>Sets up a handler for the 'tick' function, that schedules it to run periodically.</p>

**Kind**: instance method of [<code>BaseLoop</code>](#BaseLoop)  
<a name="BaseLoop+stop"></a>

### baseLoop.stop()
<p>Stops the loop.</p>
<p>Clears the handler for the 'tick' function and marks this loop as not running.</p>

**Kind**: instance method of [<code>BaseLoop</code>](#BaseLoop)  
<a name="AnimationLoop"></a>

## AnimationLoop
<p>A loop for periodic update of the state of the objects.</p>
<p>This implementation uses 'setInterval' internally to schedule the execution of the handlers at a given
frame rate (FPS). The handlers will be executed always while this loop is running.</p>

**Kind**: global variable  

* [AnimationLoop](#AnimationLoop)
    * [.scheduleTick(tickFn)](#AnimationLoop+scheduleTick)
    * [.cancelTick(tickHandler)](#AnimationLoop+cancelTick)

<a name="AnimationLoop+scheduleTick"></a>

### animationLoop.scheduleTick(tickFn)
<p>Schedules the periodic execution of the given function using 'requestAnimationFrame'.</p>

**Kind**: instance method of [<code>AnimationLoop</code>](#AnimationLoop)  

| Param | Description |
| --- | --- |
| tickFn | <p>the function to be scheduled to run periodically.</p> |

<a name="AnimationLoop+cancelTick"></a>

### animationLoop.cancelTick(tickHandler)
<p>Cancels the execution of the scheduled function using 'cancelAnimationFrame'.</p>

**Kind**: instance method of [<code>AnimationLoop</code>](#AnimationLoop)  

| Param | Description |
| --- | --- |
| tickHandler | <p>the handler for the scheduled function.</p> |


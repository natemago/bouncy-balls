import React from 'react';

import {AnimationLoop, UpdateLoop} from './bouncyballs/animation'
import {Canvas2DrawingProvider, Ball, Specs, Vector2D} from './bouncyballs/drawables'
import {Engine} from './bouncyballs/engine'

import Canvas, {CanvasMouseEvent} from './components/Canvas'

import logo from './logo.svg';
import './App.css';


/**
 * Main app React component class.
 */
class App extends React.Component {

  drawingProvider: Canvas2DrawingProvider

  engine: Engine


  constructor(props:any) {
    super(props)
    this.drawingProvider = new Canvas2DrawingProvider()

    this.engine = new Engine({
      fps: 60,
      world: {
        width: 1500,
        height: 500,
      },
      elasticity: 0.7,
    }, this.drawingProvider)
  }

  componentDidMount(){
    this.engine.start()
  }
  
  createBall(x: number, y: number) {
    return new Ball(Math.random()* 30,new Specs('red', 'black', 1), new Vector2D(x, y), 
      new Vector2D(Math.random()*2 - 1, Math.random()*2-1), new Vector2D(0, 0.981))
  }

  onClick(e: CanvasMouseEvent) {
    for(let i = 0; i < 4; i++){
      this.engine.createBall(e.x, e.y)
    }
    
  }

  render(){
    return (
      <div className="App">
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header> */}
        <section>
          <Canvas drawingProvider={this.drawingProvider} onClick={this.onClick.bind(this)} ></Canvas>
        </section>
      </div>
    );
  }
  
}

export default App;
 
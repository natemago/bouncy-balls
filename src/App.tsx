import React from 'react';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCog, faBook, faChevronUp, faChevronDown} from '@fortawesome/free-solid-svg-icons'
import {faGithub} from '@fortawesome/free-brands-svg-icons'


import {Canvas2DrawingProvider, Ball, Specs, Vector2D} from './bouncyballs/drawables'
import {Engine} from './bouncyballs/engine'

import Canvas, {CanvasMouseEvent} from './components/Canvas'
import Settings, {SettingsValues, Pallete, ObjectsSize} from './components/Settings'

import logo from './logo.svg';
import './App.css';


type AppState = {
  settingsVisible: boolean,
  settings: SettingsValues,
}

type AppProps = {}


const GRAVITY_ACCEL = -9.81      // g, gravitational acceleration (however in pixels per second)
const G_COEFF = 150              // Multiply g by this coefficient. Not real, but looks nice on screen.
const FPS = 60                   // Frames per second. This would be the update frequency, that should match 
                                 // as closely as possible to the animation frequency.
const ELASTICITY = 0.7           // Also called Coefficient of restitution. How much does the balls bounce back.
const INITIAL_BALLS_SPEED = 400  // Coefficient for the initial random velocity magnitude.

/**
 * Main app component class.
 * 
 * Initializes the drawing engine, adds the Canvas and the Settings pannel.
 */
class App extends React.Component<AppProps, AppState> {

  drawingProvider: Canvas2DrawingProvider
  canvas?: Canvas | null
  engine: Engine

  constructor(props:any) {
    super(props)
    this.drawingProvider = new Canvas2DrawingProvider()
    const settings = {
      elasticity: ELASTICITY,
        newObjectsPerClick: 5,
        objectsColor: Pallete.Red,
        objectsSize: ObjectsSize.Medium,
    }
    this.state = {
      settingsVisible: false,
      settings: settings,
    }
    this.engine = new Engine({
      fps: FPS,
      world: {
        width: 0,
        height: 0,
      },
      elasticity: settings.elasticity,
    }, this.drawingProvider)
  }

  componentDidMount(){
    const updateWorldSize = this.updateWorldSize.bind(this)
    window.addEventListener('resize', ev => {
      updateWorldSize()
    })
    updateWorldSize()
    this.engine.start()
  }

  updateWorldSize() {
    const [width, height] = this.canvas?.getSize()?? [0, 0]
    this.engine.updateWorldSize(width?? 0, height?? 0)
  }
  
  createBall(x: number, y: number) {
    const {settings} = this.state
    const position = new Vector2D(x, y)
    const g = new Vector2D(0, G_COEFF*GRAVITY_ACCEL)
    const velocityRange = INITIAL_BALLS_SPEED
    const randomVelocity = new Vector2D(Math.random()*velocityRange - velocityRange/2, Math.random()*velocityRange - velocityRange/2)
    return new Ball(
      settings.objectsSize/2 + Math.random()*(settings.objectsSize/2),
      new Specs(settings.objectsColor, 'black', 1),
      position, 
      randomVelocity, 
      g)
  }

  onClick(e: CanvasMouseEvent) {
    let objectsNumber = this.state.settings.newObjectsPerClick
    let y = this.engine.settings.world.height - e.y
    while(objectsNumber) {
      this.engine.addObject(this.createBall(e.x, y))
      objectsNumber--
    }
  }

  changeSettings(settings: SettingsValues) {
    this.setState(Object.assign(this.state, {
      settings: settings
    }))
    this.engine.settings.elasticity = settings.elasticity
  }

  toggleSettings() {
    this.setState(Object.assign(this.state, {
      settingsVisible: !this.state.settingsVisible
    }))
  }

  closeSettings():void {
    this.setState(Object.assign(this.state, {
      settingsVisible: false
    }))
  }

  render(){
    const settinsComp = this.state.settingsVisible ? <Settings settings={this.state.settings} onSetSettings={this.changeSettings.bind(this)} onClose={this.closeSettings.bind(this)}></Settings> : <></>
    const settingOpenIcon = this.state.settingsVisible ? <FontAwesomeIcon icon={faChevronUp} /> : <FontAwesomeIcon icon={faChevronDown}/>
    return (
      <div className="App">
        <header className="App-header" title="Click anywhere on the screen :)">
          <div className="header-menu">
            <div className="logo-wrap">
            <img src={logo} alt="logo" className="logo"/>
            </div>
            <div className="header-title">
              <h1>Bouncy Balls</h1>
            </div>
            <div className="header-actions header-docitem">
    <button onClick={this.toggleSettings.bind(this)} className="header-button" title="Click here to change the settings"><FontAwesomeIcon icon={faCog}></FontAwesomeIcon> <label>Settings</label> {settingOpenIcon}</button>
            </div>
            <div className="header-docitem">
              <a href="docs" className="header-button" title="Check out the docs!"><FontAwesomeIcon icon={faBook} /> <label>Docs</label></a>
              <a href="https//github.com/natemago/bouncy-balls" className="header-button" title="Visit the source code repository on Github!"><FontAwesomeIcon icon={faGithub} /></a>
            </div>
          </div>
          {settinsComp}
        </header>
        <section className="main-section">
          <Canvas drawingProvider={this.drawingProvider} onClick={this.onClick.bind(this)} ref={(c) => this.canvas = c}></Canvas>
        </section>
      </div>
    );
  }
}

export default App;
 
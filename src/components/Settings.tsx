import React from 'react'

import './Settings.css'

/**
 * Settings values exposed type.
 */
export type SettingsValues = {
    newObjectsPerClick: number,
    objectsColor: string,
    objectsSize: number,
    elasticity: number,
}


/**
 * Settings component state type.
 */
type SettingsState = {
    newObjectsPerClick: number,
    objectsColor: string,
    objectsSize: number,
    elasticity: number,
    settingsOpen: boolean,
}

/**
 * Settings component props type.
 */
type SettingsProps = {
    /**
     * The initial settings for the settings panel.
     */
    settings: SettingsValues,

    /**
     * Called when the settings have changed with the updated settings.
     */
    onSetSettings?: (settings: SettingsValues)=> void

    /**
     * Called when the panel have been closed.
     */
    onClose?: ()=>void
}

/**
 * Objects colors pallete to choose from.
 */
export const Pallete = {
    Red: "#c4014c",
    Magenta: "#f3008e",
    Green: "#09d877",
    Teal: "#12cebe",
    Blue: "#4596f1",
    Yellow: "#ffdc3d"
}

/**
 * Objects sizes to choose from.
 */
export const ObjectsSize = {
    Little: 7,
    Small: 10,
    Medium: 20,
    Large: 25,
    Huge: 50,
}


/**
 * A settings pannel to control the values for the drawable objects and the rendering engine.
 */
export default class Settings extends React.Component<SettingsProps, SettingsState> {

    constructor(props: SettingsProps) {
        super(props)
        const settings = props.settings
        this.state = {
            settingsOpen: false,
            ...settings
        }
    }

    saveSettings():void {
        const state = this.state
        if(this.props.onSetSettings) {
            this.props.onSetSettings({
                newObjectsPerClick: state.newObjectsPerClick,
                objectsColor: state.objectsColor,
                objectsSize: state.objectsSize,
                elasticity: state.elasticity,
            })
        }
    }

    closeSettings(): void {
        if(this.props.onClose) {
            this.props.onClose()
        }
    }

    updateState(values: any) {
        this.setState(Object.assign(this.state, values))
        this.saveSettings()
    }

    toggleSettings() {
        const state = this.state
        this.setState(Object.assign(this.state, {
            settingsOpen: !state.settingsOpen
        }))
    }

    render():any {
        const state = this.state
        const colorOptions = Object.entries(Pallete).map((entry, i)=> {
            const [name, value] = entry
            return <option value={value} key={i}>{name}</option>
        })
        const sizeOptions = Object.entries(ObjectsSize).map((entry, i) => {
            const [name, value] = entry
            return <option value={value} key={i}>{name}</option>
        })
        return (
            <div className="settings">
                <div className="settings-form">
                    <div className="input-group">
                        <label htmlFor="objects-per-click">Objects per click</label>
                        <input 
                            name="objects-per-click" 
                            type="number" 
                            value={state.newObjectsPerClick} 
                            min="1" 
                            max="500" 
                            title="Number of objects to create per single click."
                            placeholder="Number of objects"
                            data-testid="objects-per-click"
                            onChange={e => this.updateState({
                                newObjectsPerClick: Number(e.target.value)
                            })}></input>
                    </div>
                    <div className="input-group">
                    <label htmlFor="objects-color">Objects color</label>
                        <select 
                            name="objects-color" 
                            value={state.objectsColor} 
                            title="The color of the newly created objects."
                            placeholder="Select a color from the list"
                            data-testid="objects-color"
                            onChange={e => this.updateState({
                                objectsColor: e.target.value
                            })}>
                            {colorOptions}
                        </select>
                    </div>
                    <div className="input-group">
                    <label htmlFor="objects-size">Objects size</label>
                        <select 
                            name="objects-size"
                            value={state.objectsSize}
                            title="Approximate size of the newly created objects."
                            placeholder="Select the approximate size of the objects."
                            data-testid="objects-size"
                            onChange={e => this.updateState({
                                objectsSize: Number(e.target.value)
                            })}>
                            {sizeOptions}
                        </select>
                    </div>
                    <div className="input-group">
                    <label htmlFor="elasticity">Elasticity</label>
                        <input 
                            name="elasiticity" 
                            type="number" 
                            min="0" 
                            max="1" 
                            step="0.01" 
                            title="How elastic should the collision should be. 1 - completely elastic; 0 - will not bounce at all."
                            placeholder="Choose a value between 0 and 1 (for example 0.7)."
                            data-testid="elasticity"
                            value={this.state.elasticity} onChange={e => this.updateState({
                                elasticity: Number(e.target.value)
                            })}></input>
                    </div>
                </div>
            </div>
        );
    }
}
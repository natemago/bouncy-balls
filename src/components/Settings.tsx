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
    Green: "#00b84c",
    Teal: "#008c9e",
    Blue: "#004a9e",
    Yellow: "#ebe712"
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
        // if(this.props.onClose) {
        //     this.props.onClose()
        // }
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
        const colorOptions = Object.entries(Pallete).map((entry=> {
            const [name, value] = entry
            return <option value={value} >{name}</option>
        }))
        const sizeOptions = Object.entries(ObjectsSize).map(entry => {
            const [name, value] = entry
            return <option value={value} >{name}</option>
        })
        return (
            <div className="settings">
                <div className="settings-form">
                    <div className="input-group">
                        <label htmlFor="objects-per-click">Objects per click</label>
                        <input name="objects-per-click" type="number" value={state.newObjectsPerClick} min="1" max="500" onChange={e => this.updateState({
                            newObjectsPerClick: Number(e.target.value)
                        })}></input>
                    </div>
                    <div className="input-group">
                    <label htmlFor="objects-color">Objects color</label>
                        <select name="objects-color" value={state.objectsColor} onChange={e => this.updateState({
                            objectsColor: e.target.value
                        })}>
                            {colorOptions}
                        </select>
                    </div>
                    <div className="input-group">
                    <label htmlFor="objects-size">Objects size</label>
                        <select name="objects-size" value={state.objectsSize} onChange={e => this.updateState({
                            objectsSize: Number(e.target.value)
                        })}>
                            {sizeOptions}
                        </select>
                    </div>
                    <div className="input-group">
                    <label htmlFor="elasticity">Elasticity</label>
                        <input name="elasiticity" type="number" min="0" max="1" step="0.01" value={this.state.elasticity} onChange={e => this.updateState({
                            elasticity: Number(e.target.value)
                        })}></input>
                    </div>
                    {/* <div className="input-group form-actions">
                        <button onClick={this.closeSettings.bind(this)}>Cancel</button>
                        <button onClick={this.saveSettings.bind(this)}>Save</button>
                    </div> */}
                </div>
            </div>
        );
    }
}
import React from 'react'

import './Settings.css'


type SettingsState = {
    newObjectsPerClick: number,

}
type SettingsProps = {}


export default class Settings extends React.Component<SettingsProps, SettingsState> {

    saveSettings():void {

    }

    render():any {
        const state = this.state
        return (
            <form>
                <input type="number" value={state.newObjectsPerClick}></input>
                <button onClick={this.saveSettings}>Save</button>
            </form>
        );
    }
}
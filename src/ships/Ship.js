import React, { Component } from 'react'
import { API_URL } from '../config'
import UpdateShip from './UpdateShip'

export default class extends Component {
    state = {
        isUpdating: false
    }
    handleDelete = async () => {
        await fetch(`${API_URL}/ship/${this.props.ship._id}`, {
            method: 'DELETE'
        }).then(res => console.log(res))
        .then(() => this.props.refresh())
        .catch(err => console.log(err))
    }

    toggleUpdate = () => {
        this.setState({ isUpdating : !this.state.isUpdating})
    }

    buttons = () => (
        <div>
            <input type="button" value="Delete" onClick={this.handleDelete} />
            <input type="button" value="Update" onClick={this.toggleUpdate} />
        </div>
    )
    updateForm = () => (
        <div>
            <UpdateShip ship={this.props.ship} refresh={this.props.refresh} closeUpdate={this.toggleUpdate}/>
            <input type="button" value="Cancel" onClick={this.toggleUpdate}/>
        </div>
    )
    render() {
        const ship = this.props.ship
        return (
            <fieldset>
                <legend>{ship.name}</legend>
                <img src={ship.img_url} height="100 px" />
                <h4>Type: {ship.type}</h4>
                <p>{ship.desc}</p>
                {this.state.isUpdating ? <this.updateForm/> : <this.buttons/>}
            </fieldset>
        )
    }
}
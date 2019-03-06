import React, { Component } from 'react';
import { API_URL } from '../config'
import CreateShip from './CreateShip'
import Ship from './Ship'

// Fetch Data from API
// Create Presenter Component
// Render Data thru Presenters via State
class Ships extends Component {
    state = {
        ships : []
    }

    getShips = async () => {
        await fetch(`${API_URL}/ships`)
            .then(response => response.json())
            .then(data => data.map(element => <Ship ship={element} refresh={this.getShips}/>))
            .then(components => this.setState({ ships: components }))
            .catch( err => console.log(err))
    }

    componentDidMount() {
        this.getShips()
    }

    render() {
        return (
            <div>
                <CreateShip refresh={this.getShips}/>
                {this.state.ships}
            </div>
        );
    }
}

export default Ships;

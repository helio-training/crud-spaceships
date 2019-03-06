import React, { Component } from 'react'
import { API_URL } from '../config'

export default class extends Component {
    state = {
        name: this.props.ship.name,
        type: this.props.ship.type,
        img_url: this.props.ship.img_url,
        desc: this.props.ship.desc
    }

    handleChange = (event) =>{
        this.setState({
            [event.target.name] : event.target.value
        }) 
    }
    handleSubmit = async (event) => {
        event.preventDefault()
        await fetch(`${API_URL}/ship/${this.props.ship._id}`, {
            method : "PUT",
            body: JSON.stringify(this.state)
        }).then( res => console.log(res.json()))
        .then( () => this.setState({ 
            name: "",
            type: "",
            img_url: "",
            desc: ""
        }))
        .then(() => this.props.closeUpdate())
        .then( () => this.props.refresh())
        .catch(err => console.log(err))
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h2> - Update Ship - </h2>
                <input type="text" 
                    name="name" 
                    placeholder="Ship Name" 
                    value={this.state.name} 
                    onChange={this.handleChange}/>
                <br/>
                <input type="text" 
                    name="type" 
                    placeholder="Vessel Type" 
                    value={this.state.type} 
                    onChange={this.handleChange}/>
                <br />
                <input type="text" 
                    name="img_url" 
                    placeholder="Image URL" 
                    value={this.state.img_url} 
                    onChange={this.handleChange}/>
                <br />
                <textarea name="desc" 
                    placeholder="Description" 
                    value={this.state.desc} 
                    onChange={this.handleChange}/>
                <br />
                <input type="submit" value="Update Ship"/>
            </form>
        )
    }
}
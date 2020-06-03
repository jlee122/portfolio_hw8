import React, { useState, Component } from 'react'
import firebase from '../config'
//import Modal from 'react-modal'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

export class CreateList extends Component {
    constructor() {
        super();
        this.state = { lists: [],
                       title: "",
                    };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        this.setState({ lists: this.props.lists})
    }
    handleChange(event) {
        this.setState({title: event.target.value});
    }
    handleSubmit(event) {
        event.preventDefault();
        const list = this.state.lists;
        list.push(this.state.title);
        this.setState({
            lists: list,
            title: ""
        })
        this.props.addList.bind(this, this.state.title);
        this.state.title = "";  
    }
    render() {
        return (
            <div>
                <div className="list-header">
                    <h1>Create a New List of Movies</h1>
                    <p>Enter the title of the list you want to create and press submit</p>
                </div>
                <form className="list-input" onSubmit={this.handleSubmit}>
                    <input type="text" value={this.state.title} placeholder="List Title" onChange={this.handleChange}/>
                    <input type="submit" value="Submit"/>
                </form>         
            </div>
            
        )
    }
}

export default CreateList;
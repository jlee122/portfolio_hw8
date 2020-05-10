import React, { Component } from 'react'

export class Home extends Component {
    render() {
        return (
            <div className="home">
                <div className="ucsb-image">
                    <img src="ucsb.jpg" alt="UCSB"></img>
                </div>
                <div className="home-text">
                    <h2>Joon's Portfolio</h2>
                    <p>Hi! Welcome to my portfolio website</p>
                </div>
            </div>
        )
    }
}
export default Home;
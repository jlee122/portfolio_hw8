import React, { Component } from 'react'

export class About extends Component {
    render() {
        return (
            <div className="about">
                <div className="profile-image">
                    <img src="profile.png"></img>
                </div>
                <div className="about-text">
                    <h2>About me</h2>
                    <p>My name is Joon Lee, currently a 4th year at UCSB, studying computer science.</p>
                </div>
            </div>
        )
    }
}
export default About;
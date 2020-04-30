import React, { Component } from 'react'
import { SRLWrapper } from "simple-react-lightbox"
import ScrollUpButton from "react-scroll-up-button"

export class Projects extends Component {
    render() {
        return (
            <SRLWrapper>
            <div className="projects-grid">
                <div className="project-img">
                    <img src="navSB.png"></img>
                </div>
                <div className="project-img">
                    <img src="nexa3d-pic1.jpg"></img>
                </div>
                <div className="project-img">
                    <img src="nexa3d-pic2.jpg"></img>
                </div>
                <div className="project-img">
                    <img src="nexa3d-pic3.jpg"></img>
                </div>
                <div className="project-img">
                    <img src="nexa3d-pic4.jpg"></img>
                </div>
                <div className="project-img">
                    <img src="nexa3d-pic5.jpg"></img>
                </div>
            </div>
            <ScrollUpButton />
            </SRLWrapper>
            
            
        )
    }
}
export default Projects;
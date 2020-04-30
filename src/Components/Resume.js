import React, { Component } from 'react'

export class Resume extends Component {
    render() {
        return (
            <div className="resume-grid">
                <div className="resume">
                    <div className="resume-pic">
                        <img src="nexa-logo.png" width="200px"></img>
                    </div>
                    <div className="resume-title">
                        <h3>Software Developer</h3>
                        <p>Developed user interface and server for its main product, 3D printers, using Python, QML, C++ Developed a feature that lets printers and computers to communicate through HTTP protocol Gained experience in working with a team and using task managing software, such as Confluence, Jira, Git, and BitBucket</p>
                    </div>
                </div>
                <div className="resume">
                    <div className="resume-pic"><img src="xponentialworks-logo.jpg"></img></div>                
                    <div className="resume-title">
                        <h3>Software Development & QA Intern</h3>
                        <p>Gained experience in user testing, continuous integration and deployment, and quality control Familiarized with using Google Cloud Platform, Docker, Kubernetes, and App Engine Developed features and tests for single-page application using Vue.js framework Wrote tests requiring use of GCP with Go Language.</p>
                </div>  
            </div>                
            </div>
        )
    }
}
export default Resume;
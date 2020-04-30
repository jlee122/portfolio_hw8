import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub } from '@fortawesome/free-brands-svg-icons'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons'
import 'w3-css/3/w3.css'

export class Footer extends Component {
    render() {
        return (
            <div>
                <footer className="w3-container w3-padding-64 w3-center w3-black w3-xlarge">
                    <a className="icons" href="https://github.com/jlee122/portfolio"><FontAwesomeIcon icon={faGithub}/></a>
                    <a className="icons" href="https://www.linkedin.com/in/joonlee122/"><FontAwesomeIcon icon={faLinkedin}/></a>
                </footer>
            </div>
        )
    }
}
export default Footer;
import React, { Component } from 'react'
import Home from './Home'
import About from './About'
import Resume from './Resume'
import Projects from './Projects'
import SimpleReactLightbox, { SRLWrapper } from "simple-react-lightbox"

export class Body extends Component {
    displayContent = () => {
        var activeTab = this.props.activeTab
        if(activeTab == 1)
            return <Home/>
        else if(activeTab == 2)
            return <About/>
        else if(activeTab == 3)
            return <Resume/>
        else
            return (
            <SimpleReactLightbox><Projects/></SimpleReactLightbox>
            )
    }
    render() {
        return (this.displayContent());        
    }
}
export default Body;
import React, { Component } from 'react'
import Home from './Home'
import About from './About'
import Resume from './Resume'
import Projects from './Projects'
import SimpleReactLightbox, { SRLWrapper } from "simple-react-lightbox"
import Guestbook from './Guestbook'
import Movie from './Movie'

export class Body extends Component {
    displayContent = () => {
        var activeTab = this.props.activeTab
        if(activeTab == 1)
            return <Home/>
        else if(activeTab == 2)
            return <About/>
        else if(activeTab == 3)
            return <Resume/>
        else if(activeTab == 4)
            return (
            <SimpleReactLightbox><Projects/></SimpleReactLightbox>
            )
        else if(activeTab == 5)
            return <Guestbook/>
        else if(activeTab == 6)
            return (<SimpleReactLightbox><Movie/></SimpleReactLightbox>)
    }
    render() {
        return (this.displayContent());        
    }
}
export default Body;
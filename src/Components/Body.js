import React, { Component } from 'react'
import Home from './Home'
import About from './About'
import Resume from './Resume'
import Projects from './Projects'
import SimpleReactLightbox, { SRLWrapper } from "simple-react-lightbox"
import Guestbook from './Guestbook'
import Movie from './Movie'
import AddMovie from './AddMovie'
import CreateList from './CreateList'
import Demo from './Demo'
import firebase from '../config'


export class Body extends Component {
    constructor() {
        super();
        this.state = {
            lists: ['All', 'Watched', 'WannaWatch']
        }
        this.addList = (list) => {
            const newList = this.state.lists;
            newList.push(list);
            this.setState({
                lists: newList
            })
        }
    }
    componentDidMount() {
        const itemRef = firebase.database().ref('list');
        itemRef.orderByChild('list').once('value', (snapshot) => {
            let items = snapshot.val();
            let newList = this.state.lists;
            for( let item in items ){
                if(!newList.includes(items[item].list)){
                    newList.push(items[item].list)
                }
            }
            this.setState({lists: newList})
        })

    }
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
            return <Movie lists={this.state.lists}/>
        else if(activeTab == 7)
            return <AddMovie/>
        else if(activeTab == 8)
            return <CreateList lists={this.state.lists} addList={this.addList}/>
        else if(activeTab == 9)
            return <Demo/>
    }
    render() {
        return (this.displayContent());        
    }
}
export default Body;
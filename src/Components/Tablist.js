import React, { Component } from 'react'
import Tab from './Tab'

export class Tablist extends Component {
    render() {
        return this.props.tabs.map((tab) => (
            <Tab tab={tab} 
            activeTab={this.props.activeTab} 
            changeTab={this.props.changeTab}/>
        ));
    }
}
export default Tablist;

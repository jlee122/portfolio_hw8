import React, { Component } from 'react'

export class Tab extends Component {
    addStyling = () => {
        if(this.props.tab.id == this.props.activeTab) {
            return {backgroundColor: "gray"}
        }
        else{
            return {backgroundColor: "black"}
        }
    }
    render() {
        return (
            <div className='tab' style={this.addStyling()} 
                onClick={this.props.changeTab.bind(this, this.props.tab.id)}>
                <h5 className='tab_title'>{this.props.tab.title}</h5>
            </div>
        )
    }
}
export default Tab;
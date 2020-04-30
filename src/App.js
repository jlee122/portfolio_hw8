import React, { Component } from 'react';
import './App.css'
import Tablist from './Components/Tablist';
import Body from './Components/Body';
import Footer from './Components/Footer';

export class App extends Component {
  constructor(){
    super();
    this.state = {
      activeTab: 1
    }
    this.changeTab = (id) => {
      this.setState({
        activeTab: id
      })
    }
  }

  render() {
    const tabs = [
    {
      id: 1,
      title: 'Home'
    },
    {
      id: 2,
      title: 'About'
    }, 
    {
      id: 3,
      title: 'Resume'
    }, 
    {
      id: 4,
      title: 'Projects'
    }   
    ]
    return (      
      <div className = "body">
        <div className="header">
          <h1>Welcome to Joon's Portfolio</h1>
        </div>
        <div className = "nav-bar">
          <Tablist tabs={tabs} 
          activeTab={this.state.activeTab} 
          changeTab={this.changeTab}/>
        </div>
        <div className = "main-body">
          <Body activeTab={this.state.activeTab}/>
        </div>
        <div className="footer">
          <Footer/>
        </div>
      </div>
    );
  }
}
export default App;
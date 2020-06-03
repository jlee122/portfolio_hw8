import React, { Component } from 'react'
import Select from 'react-select'
import firebase from '../config.js'

const options = [
    { value: 'Yes', label: 'Yes' },
    { value: 'No', label: 'No'}
]

export class Guestbook extends Component {
    constructor() {
        super();
        this.state = {name: '', desc: '', msg: '', options: '', posts: []};

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    } 
      
    handleChange(event){
        if(event.value === undefined){
            this.setState({[event.target.name]: event.target.value});  
        }else{
            this.setState({options: event.value});
        }
    }
    handleSubmit(event){
        event.preventDefault();
        const itemsRef = firebase.database().ref('data');
        var t = firebase.database.ServerValue.TIMESTAMP
        var time = new Date()
        const post = {
            name: this.state.name,
            desc: this.state.desc,
            msg: this.state.msg,
            options: this.state.options,
            time: time.toLocaleString()
        };
        itemsRef.push(post);
        this.setState({
            name: '', desc: '', msg: ''
        });
    }
    componentDidMount() {
        const itemsRef = firebase.database().ref('data');
        itemsRef.on('value', (snapshot) => {
          let items = snapshot.val();
          let newState = [];
          for (let item in items) {
            newState.push({
              id: item,
              name: items[item].name,
              desc: items[item].desc,
              msg: items[item].msg,
              options: items[item].options,
              time: items[item].time
            });
          }
          
          this.setState({
            posts: newState
          });
        });
    }
    componentDidUpdate(prevProps, prevState, snapshot){
    //only call set state here if it is wrapped in a condition
    //if you initialize this.state.shouldUpdate and have not changed it yet then this will not run
        if(this.state.shouldUpdate != prevState.shouldUpdate){
            //same code as above to retrieve the data
            const itemsRef = firebase.database().ref('data');
            itemsRef.on('value', (snapshot) => {
            let items = snapshot.val();
            let newState = [];
            for (let item in items) {
                newState.push({
                id: item,
                name: items[item].name,
                desc: items[item].desc,
                msg: items[item].msg,
                options: items[item].options,
                time: items[item].time
                });
            }
            this.setState({
                posts: newState
            });
            });
        }
    }
    render() {
        return (
            <div className="guestbook">
                <div className="guestform">
                    <h2 id="guestText">Leave me a message, and let everyone know you visited!</h2>
                    <form onSubmit={this.handleSubmit}>
                        <label>
                            What is your name?
                            <input type="text" name="name" required minlength="5" maxlength="20" value={this.state.name} onChange={this.handleChange}/>
                        </label>
                        <label>
                            Tell me a little about yourself.
                            <input type="text" name="desc" value={this.state.desc} onChange={this.handleChange}/>
                        </label>
                        <label>
                            Leave a message to my guestbook!
                            <input type="text" name="msg" required minlength="15" maxlength="500" value={this.state.msg} onChange={this.handleChange}/>
                        </label>
                        <label>
                            Would you like your name and message to be viewable by other guests of this site?
                            <Select name="options" required options={options} onChange={this.handleChange}/>
                        </label>
                        <label>
                            If you would like me to be able to contact you, Please leave your email. (Your email will not be posted)
                            <input type="text" email="email"/>
                        </label>
                        <input type="submit" value="Send Message"/>
                    </form>
                </div>
                <div className="posts">
                    <div className="post">
                        <ul>
                            {this.state.posts.map((post) => {
                                if (post.options === 'Yes') {
                                    return (
                                        <li key={post.id}>
                                            <h6>{post.time}</h6>
                                            <h3>{post.name}</h3>
                                            <h5>{post.desc}</h5>
                                            <p>{post.msg}</p>
                                        </li>
                                    )        
                                }
                                
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}
export default Guestbook;
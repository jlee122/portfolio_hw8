import React, { Component } from 'react'
import firebase from '../config'

const axios = require('axios')

export class AddMovie extends Component {
    constructor() {
        super();
        this.state = { movieID: "" };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({movieID: event.target.value});
    }
    handleSubmit(event) {
        event.preventDefault();
        const itemRef = firebase.database().ref('movies');
        itemRef.orderByChild('imdbID').equalTo(this.state.movieID).once('value').then((snapshot) => {
            let items = snapshot.val();
            if (!snapshot.exists()){
                axios.get('https://www.omdbapi.com/?apikey=ec83e25b&i=' + this.state.movieID).then((res) => {
                    const data = res.data;
                    const movie = {
                        imdbID: this.state.movieID,
                        title: data["Title"],
                        director: data["Director"],
                        rating: data["imdbRating"],
                        poster: data["Poster"].toString()
                    };
                    itemRef.push(movie);
                    this.setState({
                        movieID: ""
                    });
                }).catch((e)=>{
                    this.setState({
                        movieID: ""
                    })
                    console.log(e)
                })
            }else{
                console.log("already exist")
            }
        })
        
    }

    render() {
        return (
            <div>
                <div className="add-movie-header">
                    <h1>Add a New Movie</h1>
                    <p>Enter the IMDB ID of the movie you want to add and press submit</p>
                </div>
                <form className="movie-input" onSubmit={this.handleSubmit}>
                    <input type="text" value={this.state.movieID} placeholder="IMDB ID" onChange={this.handleChange}/>
                    <input type="submit" value="Submit"/>
                </form>              
            </div>
        )
    }
}

export default AddMovie;
import React, { Component } from 'react'
import { SRLWrapper } from "simple-react-lightbox"
import ScrollUpButton from "react-scroll-up-button"

const axios = require('axios')

const PREFIX = 'https://www.omdbapi.com/?apikey=ec83e25b&i='

async function getMoviePoster(movie){
    try {
        const res = await axios.get(PREFIX+movie)
        const data = res.data;
        var x = document.getElementById(movie)
        x.src = data["Poster"].toString()
        x.alt = data["Title"] + ",  Director: " + data["Director"] + ",  IMDB Rating: " + data["imdbRating"]
    }
    catch(e){
        console.log(e);
    }   
}

export class Movie extends Component {
    constructor() {
        super();
        this.state = {
            movies: [ 'tt7286456', 'tt4154796', 'tt0816692', 'tt1375666', 'tt1706620', 'tt3501632', 'tt0993846', 'tt4154756', 'tt5463162']
        };
        for (let movie in this.state.movies){
            getMoviePoster(this.state.movies[movie])
        }
    }
    render() { 
        return (
            <SRLWrapper>
            <div className="movie-grid">
                {this.state.movies.map((id) => {                     
                    return (
                        <div className="movie">
                            <SRLWrapper>
                                <img id={id}></img>
                            </SRLWrapper>
                        </div>
                    )
                })}
            </div>
            <ScrollUpButton />
            </SRLWrapper>
            
        )
    }
}
export default Movie;
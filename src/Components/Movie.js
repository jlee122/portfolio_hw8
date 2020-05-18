import React, { Component } from 'react'
import { SRLWrapper } from "simple-react-lightbox"
import ScrollUpButton from "react-scroll-up-button"

const IDs = [ 'tt7286456', 'tt6751688']
const axios = require('axios')

const PREFIX = 'http://www.omdbapi.com/?apikey=ec83e25b&i='

async function getMoviePoster(movie){
    const res =await axios.get(PREFIX+movie);
    const data = await res.data;
    return data.Poster
}

export class Movie extends Component {
    constructor() {
        super();
        this.movies = [ 'tt7286456', 'tt6751688', 'tt4154796', 'tt0816692', 'tt1375666', 'tt1706620', 'tt3501632', 'tt0993846', 'tt4154756', 'tt5463162']
    }

    render() {
        return <div className="movie-grid">
            <div className="movie">
                {this.movies.map((id) => {
                    
                    console.log(getMoviePoster(id))
                    return (
                        <img src={getMoviePoster(id)}></img>
                    )
                })}
            </div>
        </div>
    }
}
export default Movie;
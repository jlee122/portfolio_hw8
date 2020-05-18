import React, { Component } from 'react'
import { SRLWrapper } from "simple-react-lightbox"
import ScrollUpButton from "react-scroll-up-button"

const IDs = [ 'tt7286456', 'tt4154796']
const axios = require('axios')

const PREFIX = 'https://www.omdbapi.com/?apikey=ec83e25b&i='

function getMoviePoster(movie){
    axios.get(PREFIX+movie).then((res)=>{
        const data = res.data;
        var x = document.getElementById(movie)
        x.src = data["Poster"].toString()
        return
    })
    .catch((e) => {
        console.log(e);
    })
      
}

export class Movie extends Component {
    constructor() {
        super();
        this.state = {
            movies: [ 'tt7286456', 'tt4154796', 'tt0816692', 'tt1375666', 'tt1706620', 'tt3501632', 'tt0993846', 'tt4154756', 'tt5463162']
        };
    }

    render() {
        return (
            <SRLWrapper>
            <div className="movie-grid">
                <div className="movie">
                    {this.state.movies.map((id) => {  
                        getMoviePoster(id)                      
                        return (
                            <img id={id}></img>
                            // <li key={id}>
                            //     {console.log(id)}                                
                            //     <img src={getMoviePoster(id)}></img>
                            // </li>
                        )
                    })}
                </div>
            </div>
            <ScrollUpButton />
            </SRLWrapper>
        )
    }
}
export default Movie;
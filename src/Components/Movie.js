import React, { Component, useState } from 'react'
import { SRLWrapper } from "simple-react-lightbox"
import ScrollUpButton from "react-scroll-up-button"
import firebase from '../config'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Dropdown from 'react-bootstrap/Dropdown'

export class Movie extends Component {
    constructor() {
        super();
        this.state = {
            movies: [],
            lists: [],
            isOpen: false,
            movie: [],
            currentList: 'All',
            movieSearch: '',
            grid: 'repeat(4,auto)',
            visible: 1,
            shouldUpdate: false
        };
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.addToList = this.addToList.bind(this);
        this.displayList = this.displayList.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.loadMore = this.loadMore.bind(this);
    }
    handleChange(event) {
        this.setState({ movieSearch: event.target.value })
    }
    handleSubmit(event) {
        event.preventDefault();
        const itemRef = firebase.database().ref('movies');
        itemRef.orderByChild('title').once('value').then((snapshot) => {
            let items = snapshot.val();
            let newState = [];
            for( let item in items) {
                let t = items[item].title.toLowerCase()
                if(t.includes(this.state.movieSearch)){
                    newState.push({
                        id: item,
                        title: items[item].title,
                        director: items[item].director,
                        rating: items[item].rating,
                        poster: items[item].poster
                    })
                }
            }
            this.setState({movies: newState})
            this.setState({movieSearch: ''})
        })
    }
    loadMore() {
        let v = this.state.visible + 1
        this.setState({visible: v, grid: 'repeat(8,auto)', shouldUpdate: true})
    }
    async showModal(id) {
        await this.setState({movie: id});
        if(this.state.isOpen === false){
            this.setState({isOpen: true});
        }
    }
    hideModal() {
        if(this.state.isOpen === true){
            this.setState({isOpen: false});
        }
    }
    addToList(list) {
        const itemRef = firebase.database().ref('list');
        itemRef.orderByChild('list').equalTo(list).once('value').then((snapshot) => {
            let items = snapshot.val();
            let exist = false;
            for (let item in items) {
                if(items[item].movieID == this.state.movie.id){
                    exist = true;
                }
            }
            if(!exist) {
                itemRef.push({
                    movieID: this.state.movie.id,
                    title: this.state.movie.title,
                    list: list
                });
            }
        })
        this.hideModal();
    }
    deleteMovie(id) {
        const itemRef = firebase.database().ref('movies/'+id);
        itemRef.remove();
        const listRef = firebase.database().ref('list');
        listRef.orderByChild('movieID').equalTo(id).once('value').then((snapshot) => {
            let items = snapshot.val();
            for (let item in items) {
                firebase.database().ref('list/'+item).remove();
            }
        })
        this.hideModal();
    }
    async displayList(list){
        let g = this.state.grid;
        this.setState({visible: 1})
        let limit = this.state.visible*8
        if(list == "All"){
            const itemsRef = firebase.database().ref('movies');
            itemsRef.limitToFirst(limit).on('value', (snapshot) => {
                let items = snapshot.val();
                let newState = [];
                for (let item in items) {
                    newState.push({
                        id: item,
                        title: items[item].title,
                        director: items[item].director,
                        rating: items[item].rating,
                        poster: items[item].poster
                    })
                }
                this.setState({
                    movies: newState,
                    currentList: list
                });
            })
        }else{
            const itemRef = firebase.database().ref('list');
            let moviesInList = [];
            let newState = [];
            await itemRef.orderByChild('list').equalTo(list).limitToFirst(limit).once('value').then((snapshot) => {
                let items = snapshot.val();            
                for (let item in items){
                    moviesInList.push(items[item].movieID);
                }
                for (let movie in moviesInList){                    
                    firebase.database().ref('movies/'+moviesInList[movie]).once('value').then((snapshot) => {
                        let item = snapshot.val()
                        newState.push({
                            id: moviesInList[movie],
                            title: item.title,
                            director: item.director,
                            rating: item.rating,
                            poster: item.poster
                        })
                    })
                }                
            })
            this.setState({
                movies: newState,
                currentList: list
            })
        }
    }
    componentDidMount() {
        this.setState({ lists: this.props.lists })
        const itemsRef = firebase.database().ref('movies');
        let limit = 8;        
        itemsRef.limitToFirst(limit).on('value', (snapshot) => {
            let items = snapshot.val();
            let newState = [];
            for (let item in items) {
                newState.push({
                    id: item,
                    title: items[item].title,
                    director: items[item].director,
                    rating: items[item].rating,
                    poster: items[item].poster
                })
            }
            this.setState({
                movies: newState
            });
        })
    }
    componentDidUpdate(prevProps, prevState, snapshot){
        //only call set state here if it is wrapped in a condition
        //if you initialize this.state.shouldUpdate and have not changed it yet then this will not run
            if(this.state.shouldUpdate != prevState.shouldUpdate){
                //same code as above to retrieve the data
                this.displayList(this.state.currentList);
              
            }
        }

    render() {
        return (
            <div>
                <div className="movie-header">
                    <div className="sort-dropdown">
                        <Dropdown drop='down'>
                            <Dropdown.Toggle variant='primary' id="sort-list-button">
                                {this.state.currentList}
                            </Dropdown.Toggle>                
                            <Dropdown.Menu>
                                {this.state.lists.map((list) => {
                                    return (
                                        <Dropdown.Item as="button" onClick={() => this.displayList(list)}>{list}</Dropdown.Item>
                                    )
                                })}
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <div className="search-bar">
                        <form className="movie-search" onSubmit={this.handleSubmit}>
                            <input type="text" value={this.state.movieSearch} placeholder="Search movie" onChange={this.handleChange}/>
                            <input type="submit" value="Search"/>
                        </form>
                    </div>
                </div>
            
            <div className="movie-grid" style={{ 'grid-template-columns': this.state.grid }}>
                
                {this.state.movies.map((id) => {                   
                    return (
                        <div className="movie">                            
                            <img src={id.poster} onClick={() => this.showModal(id)}></img>                        
                        </div>
                    )
                })}                         
            </div>
            <Button className="load" variant="primary" onClick={this.loadMore}>Load more</Button>
                <ScrollUpButton /> 
                <Modal show={this.state.isOpen} onHide={this.hideModal}>
                    <Modal.Header>
                        <Modal.Title>{this.state.movie.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <img src={this.state.movie.poster}></img>
                        <div className="info">
                            <h3>IMDB Rating: {this.state.movie.rating}</h3>
                            <h4>Director: {this.state.movie.director}</h4>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <Dropdown drop='up'>
                            <Dropdown.Toggle variant="primary" id="add-to-list-button">
                                Add to list
                            </Dropdown.Toggle>

                            <Dropdown.Menu>
                                {this.state.lists.map((list) => {
                                    if(list !== "All"){
                                        return (
                                            <Dropdown.Item as="button" onClick={() => this.addToList(list)}>{list}</Dropdown.Item>
                                        )
                                    }
                                })}
                            </Dropdown.Menu>
                        </Dropdown>
                        <Button variant="danger" onClick={() => this.deleteMovie(this.state.movie.id)}>Delete</Button>
                        <Button variant="secondary" onClick={this.hideModal}>Cancel</Button>
                    </Modal.Footer>
                </Modal>
            </div>
            
        )
    }
}
export default Movie;
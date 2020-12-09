import React, { Component } from 'react';
import './SingleMovie.css'
import { getCurrentMovie } from '../apiCalls.js'
import { Link } from 'react-router-dom'

class SingleMovie extends Component {
    constructor(props) {
        super(props)
        this.state = {
            movie: null,
            error: null
        }
    }

    componentDidMount() {
        console.log("single movie has mounted")
        getCurrentMovie(this.props.movieID)
        .then(data => this.setState({ movie: data.movie }))
        .catch(error => this.setState({ error: error.message}))
    }

    render() {
        console.log("Single movie state", this.state, this.props)
        const { movie } = this.state
        return(
            <section className="single-movie">
                { movie && 
                    <>
                        <h2>{ movie.title }</h2>
                        <p>{ movie.tagline }</p>
                        <img src={ movie.backdrop_path } alt="single-movie"/>
                        <p>{ movie.overview }</p>
                        <p>Average Rating: { (movie.average_rating * 10).toFixed(0) }%</p>
                        <p>Genre: { movie.genres.join(', ') }</p>
                        <p>Revenue: ${ (movie.revenue / 1000000).toFixed(2) }M</p>
                        <p>Runtime: { movie.runtime } mins</p>
                        <Link to="/">Back to Home</Link>
                    </>
                }
            </section>
        )
    }
}

export default SingleMovie;
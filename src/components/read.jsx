// read.jsx
// Shows every movie stored in MongoDB (Lab 7, Exercise 7).
import { useEffect, useState } from "react";
import axios from 'axios';
import Movies from "./movies";

const Read = () => {
    // The list of movies returned by the server (starts empty).
    const [myMovies, setMovie] = useState([]);

    // useEffect with [] runs once, when the page first loads.
    useEffect(
        () => {
            // Ask the Express server for all movies. The server runs
            // Movie.find({}) and sends back a plain JSON array, so the
            // movies are in response.data (not response.data.myArray like Lab 6).
            axios.get('http://localhost:4000/api/movies')
                .then((response) => {
                    console.log(response.data);
                    setMovie(response.data);
                })
                .catch((error) => { console.log(error) });
        }, []
    );

    return (
        <div>
            <h1>Hello from Read component</h1>
            {/* Pass the movies down to the Movies component to display */}
            <Movies myMovies={myMovies}></Movies>
        </div>
    );
}

export default Read;

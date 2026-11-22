// movies.jsx
// Loops through the list of movies and shows a MovieItem card for each one.
import MovieItem from './movieItem';

const Movies = (props) => {
    return props.myMovies.map(
        (movie) => {
            // MongoDB gives every document a unique _id, so it is used as the
            // React key (the Lab 6 hard-coded data used imdbID instead).
            return <MovieItem mymovie={movie} key={movie._id}></MovieItem>
        }
    );
}

export default Movies;

// movies.jsx - shows a card for each movie
import MovieItem from './movieItem';

const Movies = (props) => {
    return props.myMovies.map(
        (movie) => {
            // _id is the MongoDB id
            return <MovieItem mymovie={movie} key={movie._id}></MovieItem>
        }
    );
}

export default Movies;

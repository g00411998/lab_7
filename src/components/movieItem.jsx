// movieItem.jsx
// Displays one movie as a Bootstrap card.
import Card from 'react-bootstrap/Card';

const MovieItem = (props) => {
    // The field names are lowercase (title, year, poster) because they
    // match the Mongoose schema on the server.
    return (
        <div>
            <Card className="text-center">
                <Card.Body>
                    <Card.Title>{props.mymovie.title}</Card.Title>
                    <img src={props.mymovie.poster} alt={props.mymovie.title} />
                </Card.Body>
                <Card.Footer className="text-muted">{props.mymovie.year}</Card.Footer>
            </Card>
        </div>
    );
}

export default MovieItem;

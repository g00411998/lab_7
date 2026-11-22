// create.jsx
// Form for adding a new movie. On submit it sends the movie to the
// Express server (POST /api/movies), which saves it in MongoDB (Lab 7, Exercise 6).

import { useState } from "react";
import axios from 'axios'

function Create() {
  // One piece of state for each input box in the form.
  const [title, setTitle] = useState('');
  const [year, setYear] = useState('');
  const [poster, setPoster] = useState('');

  const handleSubmit = (e) => {
    // Stop the browser from reloading the page when the form is submitted.
    e.preventDefault();
    console.log(title, year, poster);

    // Build the movie object. The field names match the Mongoose schema
    // on the server (title, year, poster).
    const movie = {
      title: title,
      year: year,
      poster: poster
    };

    // Send the movie to the server. The server replies with
    // { message, movie } once it has been saved in the database.
    axios.post('http://localhost:4000/api/movies', movie)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err.data));
  }

  return (
    <div>
      <h2>This is my Create Component.</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Add Movie Title: </label>
          <input type="text"
            className="form-control"
            value={title}
            onChange={(e) => { setTitle(e.target.value) }}
          />
        </div>
        <div className="form-group">
          <label>Add Movie Year: </label>
          <input type="text"
            className="form-control"
            value={year}
            onChange={(e) => { setYear(e.target.value) }}
          />
        </div>
        <div className="form-group">
          <label>Add Movie Poster: </label>
          <textarea type="text"
            className="form-control"
            value={poster}
            onChange={(e) => { setPoster(e.target.value) }}
          />
        </div>
        <input type="submit" value="Add Movie" />
      </form>
    </div>
  );
}

export default Create;

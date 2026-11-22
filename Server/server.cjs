// =====================================================================
// Lab 7: Mongo/MERN - Data Representation and Querying
// server.cjs - Express back end that stores and reads movies in MongoDB
// Run it with:  node Server/server.cjs   (listens on http://localhost:4000)
// =====================================================================

// Import Express and create the app. The API runs on port 4000;
// the React front end runs separately (Vite, port 5173).
const express = require('express');
const app = express();
const port = 4000;

// CORS lets the React app (a different port/origin) call this API.
const cors = require('cors');
app.use(cors());

// Extra CORS headers so the browser allows every method the app uses.
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// body-parser reads the data sent in a POST request and puts it on req.body
// (both form-encoded data and JSON, which is what axios sends).
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// ---------------------------------------------------------------------
// Exercise 4: Database connection with Mongoose
// Mongoose is an ODM (Object Data Modeling) library: it lets us talk to
// MongoDB using schemas and models instead of raw database commands.
// The connection string comes from MongoDB Atlas (cluster > Connect) and
// uses the database user created in Exercise 3 (admin / admin).
// "MoviesBD" at the end is the name of the database the movies are stored in.
// ---------------------------------------------------------------------
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin:admin@joyhowlader.wczq1ks.mongodb.net/MoviesBD')
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log('Could not connect to MongoDB:', err.message));

// ---------------------------------------------------------------------
// Exercise 5: Create a data model
// A schema is the blueprint for each document: every movie has a
// title, a year and a poster (image URL), all stored as Strings.
// ---------------------------------------------------------------------
const movieSchema = new mongoose.Schema({
    title: String,
    year: String,
    poster: String
});

// The model is built from the schema. 'Movie' maps to the "movies"
// collection in MongoDB (Mongoose makes the name lowercase and plural).
// We use the Movie model to create, read, update and delete documents.
const Movie = mongoose.model('Movie', movieSchema);

// Simple test route: http://localhost:4000/
app.get('/', (req, res) => {
    res.send('Hello World');
});

// GET /api/movies - hard-coded movie list from Lab 6
// (replaced by a MongoDB query in Exercise 7).
app.get('/api/movies', (req, res) => {
    const myMovies = [
        {
            "Title": "Avengers: Infinity War (server)",
            "Year": "2018",
            "imdbID": "tt4154756",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BMjMxNjY2MDU1OV5BMl5BanBnXkFtZTgwNzY1MTUwNTM@._V1_SX300.jpg"
        },
        {
            "Title": "Captain America: Civil War (server)",
            "Year": "2016",
            "imdbID": "tt3498820",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BMjQ0MTgyNjAxMV5BMl5BanBnXkFtZTgwNjUzMDkyODE@._V1_SX300.jpg"
        },
        {
            "Title": "World War Z (server)",
            "Year": "2013",
            "imdbID": "tt0816711",
            "Type": "movie",
            "Poster": "https://m.media-amazon.com/images/M/MV5BNDQ4YzFmNzktMmM5ZC00MDZjLTk1OTktNDE2ODE4YjM2MjJjXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_SX300.jpg"
        }
    ];
    res.json({ myArray: myMovies });
});

// Start the server and listen for requests on port 4000.
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

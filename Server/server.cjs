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

// ---------------------------------------------------------------------
// Exercise 7: Retrieve all data
// GET /api/movies - replaces the hard-coded movie list from Lab 6.
// Movie.find({}) with an empty filter {} returns every document in the
// "movies" collection. res.json sends them back to React as a JSON array.
// ---------------------------------------------------------------------
app.get('/api/movies', async (req, res) => {
    const movies = await Movie.find({});
    res.json(movies);
});

// ---------------------------------------------------------------------
// Exercise 6: Add data to MongoDB
// POST /api/movies - called by the Create page when the form is submitted.
// async/await: saving to the database takes time, so the function is
// marked async and "await" pauses it until the save has finished.
// ---------------------------------------------------------------------
app.post('/api/movies', async (req, res) => {
    // Pull the title, year and poster out of the data sent in the request body.
    const { title, year, poster } = req.body;

    // Create a new Movie document from the model...
    const newMovie = new Movie({ title, year, poster });
    // ...and save it to the "movies" collection in MongoDB.
    await newMovie.save();

    // 201 = Created. Send back a message and the saved movie (now with its _id).
    res.status(201).json({ message: 'Movie created successfully', movie: newMovie });
});

// ---------------------------------------------------------------------
// Exercise 8: Retrieve data by ID
// GET /api/movie/:id - ":id" is a route parameter, so a request to
// /api/movie/6740abc... puts "6740abc..." in req.params.id.
// Movie.findById() looks up the one document whose _id matches and
// sends it back as JSON.
// ---------------------------------------------------------------------
app.get('/api/movie/:id', async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    res.send(movie);
});

// Start the server and listen for requests on port 4000.
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

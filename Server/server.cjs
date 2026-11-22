// Lab 7 - Express server with MongoDB (Mongoose)
const express = require('express');
const app = express();
const port = 4000;

// Allow the React app to call this server
const cors = require('cors');
app.use(cors());

// CORS headers
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// Read data sent in the request body
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connect to MongoDB
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin:admin@joyhowlader.wczq1ks.mongodb.net/MoviesBD')
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.log('Could not connect to MongoDB:', err.message));

// Movie schema
const movieSchema = new mongoose.Schema({
    title: String,
    year: String,
    poster: String
});

// Movie model
const Movie = mongoose.model('Movie', movieSchema);

// Test route
app.get('/', (req, res) => {
    res.send('Hello World');
});

// Get all movies
app.get('/api/movies', async (req, res) => {
    const movies = await Movie.find({});
    res.json(movies);
});

// Add a new movie
app.post('/api/movies', async (req, res) => {
    const { title, year, poster } = req.body;
    const newMovie = new Movie({ title, year, poster });
    await newMovie.save();
    res.status(201).json({ message: 'Movie created successfully', movie: newMovie });
});

// Get one movie by id
app.get('/api/movie/:id', async (req, res) => {
    const movie = await Movie.findById(req.params.id);
    res.send(movie);
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

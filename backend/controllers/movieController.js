const Movie = require('../models/movie');

const createMovie = async (req, res) => {
    try {
        const movie = new Movie(req.body);
        await movie.save();
        res.status(201).json(movie);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getMovies = async (req, res) => {
    try {
        const movies = await Movie.find();
        res.status(200).json(movies);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const deleteMovie = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedMovie = await Movie.findByIdAndDelete(id);
        if (!deletedMovie) {
            return res.status(404).json({ message: "Movie not found" });
        }

        res.status(200).json({ message: "Movie deleted successfully", deletedMovie });
    } catch (err) {

        res.status(500).json({ error: err.message });
    }
};

const getMovie = async (req, res) => {
    try {
        const {title} = req.params;

        const movies = await Movie.find({ title: new RegExp(title, "i") });

        res.status(200).json(movies);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { createMovie, getMovies, getMovie, deleteMovie };

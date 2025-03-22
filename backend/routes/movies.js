const express = require('express');
const { createMovie, getMovies, getMovie, deleteMovie} = require('../controllers/movieController');
const router = express.Router();

router.post('/', createMovie);
router.get('/', getMovies);
router.get('/:title', getMovie);
router.delete('/:id', deleteMovie)

module.exports = router;

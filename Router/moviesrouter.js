const express = require("express");
const router = express.Router();
const Movie = require("../Models/Movies");
const {
  createMovie,
  getAllMovies,
  getMovieById,
  updateMovie,
  deleteMovie,
  searchMovies,
  searchMoviesByTags,
} = require("../Controllers/MoviesController");

// Create a new movie
router.post("/movies", createMovie);

// Get all movies
router.get("/movies", getAllMovies);

// Get a movie by ID
router.get("/movies/:id", getMovieById);

// Update a movie
router.put("/movies/:id", updateMovie);

// Delete a movie
router.delete("/movies/:id", deleteMovie);

// for the fillerting the movies
router.get("/moviessearch", searchMovies);

// for the search bar
router.get("/searchmoviesbytags", searchMoviesByTags);

module.exports = router;

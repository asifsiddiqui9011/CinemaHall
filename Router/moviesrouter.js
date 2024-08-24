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

// Search movies
router.get("/moviessearch", searchMovies);

module.exports = router;

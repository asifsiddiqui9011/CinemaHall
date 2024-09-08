const express = require("express");
const router = express.Router();
const {
  createMovie,
  getAllMovies,
  getMovieById,
  updateMovie,
  deleteMovie,
  searchMovies,
<<<<<<< HEAD
} = require("../controllers/MoviesController");
=======
  searchMoviesByTags,
} = require("../Controllers/MoviesController");
>>>>>>> 0bec7cffebea9a548335f8dcf25f9f7892043c80

// Create a new movie
router.post("/movies", createMovie);

// Get all movies
router.get("/getmovies", getAllMovies);

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

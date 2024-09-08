const express = require("express");
const router = express.Router();
const {
  createMovie,
  getAllMovies,
  getMovieById,
  updateMovie,
  deleteMovie,
  searchMovies,
  searchMoviesByTags,

} = require("../controllers/MoviesController");




router.post("/movies", createMovie);


router.get("/getmovies", getAllMovies);


router.get("/movies/:id", getMovieById);


router.put("/movies/:id", updateMovie);


router.delete("/movies/:id", deleteMovie);


router.get("/moviessearch", searchMovies);

// search bar
router.get("/searchmoviesbytags", searchMoviesByTags);

module.exports = router;

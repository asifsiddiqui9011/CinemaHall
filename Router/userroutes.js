const express = require("express");
const userController = require("../controllers/UserController");
const movieController = require("../controllers/MoviesController");
const router = express.Router();


router.post("/users", userController.createUser);


router.post("/login", userController.loginUser);


router.get("/users", userController.getAllUsers);


router.get("/users/:id", userController.getUserById);


router.put("/users/:id", userController.updateUser);


router.delete("/users/:id", userController.deleteUser);

module.exports = router;


router.post("/movies", movieController.createMovie);
router.get("/movies", movieController.getAllMovies);
router.get("/movies/:id", movieController.getMovieById);
router.put("/movies/:id", movieController.updateMovie);
router.delete("/movies/:id", movieController.deleteMovie);
router.get("/movies/search", movieController.searchMovies);

module.exports = router;

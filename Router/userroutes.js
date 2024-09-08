const express = require("express");
const userController = require("../controllers/UserController");
const movieController = require("../controllers/MoviesController");
const router = express.Router();

// Create a new user
router.post("/users", userController.createUser);

// User login
router.post("/login", userController.loginUser);

// Get all users (protected route)
router.get("/users", userController.getAllUsers);

// Get a user by ID (protected route)
router.get("/users/:id", userController.getUserById);

// Update a user by ID (protected route)
router.put("/users/:id", userController.updateUser);

// Delete a user by ID (protected route)
router.delete("/users/:id", userController.deleteUser);

module.exports = router;

// Movies router
router.post("/movies", movieController.createMovie);
router.get("/movies", movieController.getAllMovies);
router.get("/movies/:id", movieController.getMovieById);
router.put("/movies/:id", movieController.updateMovie);
router.delete("/movies/:id", movieController.deleteMovie);
router.get("/movies/search", movieController.searchMovies);

module.exports = router;

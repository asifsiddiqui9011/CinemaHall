const Movie = require("../Models/Movies");

exports.createMovie = async (req, res) => {
  try {
    const movie = new Movie(req.body);
    await movie.save();
    res.status(201).json({ message: "Movie created successfully" });
  } catch (error) {
    res.status(400).json({ message: "Error creating movie", error });
  }
};

exports.getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find().exec();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: "Error fetching movies", error });
  }
};

exports.getMovieById = async (req, res) => {
  try {
    const id = req.params.id;
    const movie = await Movie.findById(id).exec();
    if (!movie) {
      res.status(404).json({ message: "Movie not found" });
    } else {
      res.json(movie);
    }
  } catch (error) {
    res.status(500).json({ message: "Error fetching movie", error });
  }
};

exports.updateMovie = async (req, res) => {
  try {
    const id = req.params.id;
    const movie = await Movie.findByIdAndUpdate(id, req.body, {
      new: true,
    }).exec();
    if (!movie) {
      res.status(404).json({ message: "Movie not found" });
    } else {
      res.json({ message: "Movie updated successfully" });
    }
  } catch (error) {
    res.status(400).json({ message: "Error updating movie", error });
  }
};

exports.deleteMovie = async (req, res) => {
  try {
    const id = req.params.id;
    await Movie.findByIdAndRemove(id).exec();
    res.json({ message: "Movie deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting movie", error });
  }
};
// filter the movies
exports.searchMovies = async (req, res) => {
  try {
    const { query } = req;
    const searchQuery = {};

    if (query.movieName) {
      searchQuery.movieName = { $regex: query.movieName, $options: "i" };
    }
    if (query.genre) {
      searchQuery.genre = { $in: query.genre };
    }
    // Add more search fields as needed

    const movies = await Movie.find(searchQuery);
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: "Error fetching movie", error: err });
  }
};

// for the search bar
exports.searchMoviesByTags = async (req, res) => {
  try {
    // Extract tags from request body
    const { tags } = req.body;

    // Validate if tags are provided
    if (!tags || !tags.length) {
      return res.status(400).json({ message: "Tags are required for search" });
    }

    // Search for movies that match any of the tags
    const movies = await Movie.find({ tags: { $in: tags } });

    // If no movies found, return a message
    if (!movies.length) {
      return res
        .status(404)
        .json({ message: "No movies found with the provided tags" });
    }

    // Return the movies in the response
    res.status(200).json(movies);
  } catch (error) {
    console.error("Error searching movies:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

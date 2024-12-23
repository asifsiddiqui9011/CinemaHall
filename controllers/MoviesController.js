// const Movie = require("../models/Movies.js");
const Movie = require('../models/Movies.js')
const Slot = require('../models/Slot.js')
const mongoose = require('mongoose')

// Create a new movieid
// function generateMainId() {
//   const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
//   let result = "";
//   for (let i = 0; i < 8; i++) {
//     result += characters.charAt(Math.floor(Math.random() * characters.length));
//   }
//   return result;
// }


// Function to generate a unique mainId (simple example, you might want a more sophisticated method)
const generateMainId = () => {
  return `Movie-${Math.random().toString(36).substr(2, 9)}`;
};

exports.createMovie = async (req, res) => {
  try {
    // Ensure that the required fields in the request body are properly formatted
    const {
      movieName,
      genre,
      duration,
      releaseDate,
      tags,
      trailerLink,
      description,
      language,
      directors,
      certification,
      videoDimension,
      mainCasts,
      lastScreenDate,
      industry,
      imageMainUrl,
      imageBackgroundUrl,
    } = req.body;
    if ( !movieName || !genre || !duration || !releaseDate || !tags   || !trailerLink || !description  || !language || !directors   || !
      certification || !videoDimension || !mainCasts || !lastScreenDate || !industry || !imageMainUrl || !imageBackgroundUrl) {
      return res.status(400).json({ message: 'Missing required parameters' });
    }
    const movieData = {
      ...req.body,
      mainId: generateMainId(), // Generate a unique mainId
    };
     console.log(movieData,"moviedata")
    // Create a new Movie instance with the movie data
    const movie = new Movie(movieData);

    // Save the movie to the database
    await movie.save();

    // Send a success response
    res.status(201).json({ message: "Movie created successfully", movie });
  } catch (error) {
    // Handle any errors that occur during the movie creation
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
    const {id} =req.params
  
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid movie ID" });
    }

    const movieObjectId = new mongoose.Types.ObjectId(id);

    const slots = await Slot.updateMany(
      { movieId: movieObjectId },
      { $unset: { movieId: "" } }, 
     { new: true, runValidators: true }
    );

    if (slots.length === 0) {
      return res.status(404).json({ message: "No slots found with the given movieId" });
    }

    await Movie.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: "Slots found with the given movieId" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};





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
 

    const movies = await Movie.find(searchQuery);
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: "Error fetching movie", error: err });
  }
};


exports.searchMoviesByTags = async (req, res) => {
  try {

    const { tags } = req.body;


    if (!tags || !tags.length) {
      return res.status(400).json({ message: "Tags are required for search" });
    }

    
    const movies = await Movie.find({ tags: { $in: tags } });

    
    if (!movies.length) {
      return res
        .status(404)
        .json({ message: "No movies found with the provided tags" });
    }

  
    res.status(200).json(movies);
  } catch (error) {
    console.error("Error searching movies:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

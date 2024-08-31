const Movie = require("../Models/Movies");

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
    const movieData = {
      ...req.body,
      mainId: generateMainId(), // Generate a unique mainId
    };

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
    const id = req.params.id;
    await Movie.findByIdAndRemove(id).exec();
    res.json({ message: "Movie deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting movie", error });
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
    // Add more search fields as needed

    const movies = await Movie.find(searchQuery);
    res.json(movies);
  } catch (err) {
    res.status(500).json({ message: "Error fetching movie", error: err });
  }
};

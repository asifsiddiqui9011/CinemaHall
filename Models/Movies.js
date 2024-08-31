const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
  {
    movieName: { type: String, required: true },
    mainId: { type: String, required: true, unique: true },
    genre: { type: String, required: true },
    language: { type: String, required: true },
    rating: { type: Number, min: 0, max: 10 },
    releaseDate: { type: Date, required: true },
    duration: { type: String, required: true }, // Format like '2h 30m'
    directors: { type: String, required: true },
    mainCasts: { type: String, required: true },
    description: { type: String, required: true },
    certification: { type: String, required: true },
    imageBackgroundUrl: { type: String, required: true },
    imageMainUrl: { type: String, required: true },
    trailerLink: { type: String, required: true },
    industry: { type: String, required: true },
    videoDimension: { type: String, enum: ["2D", "3D"], required: true },
    numberOfBookings: { type: Number, default: 0 },
    tags: { type: String }, // Flexible for additional filtering
  },
  { timestamps: true }
);

movieSchema.index({
  movieName: "text",
  genre: "text",
  language: "text",
  certification: "text",
  videoDimension: "text",
  directors: "text",
  mainCasts: "text",
});

module.exports = mongoose.model("Movie", movieSchema);

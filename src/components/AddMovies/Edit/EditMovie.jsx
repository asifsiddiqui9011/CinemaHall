import { useState } from "react";
import axios from "axios";
import { useContext } from "react";
import { AdminContext } from "../../../Context/AdminContext";
import { useParams } from "react-router-dom";

const EditMovie = () => {
  
  const {editMovie, setEditMovie} = useContext(AdminContext)

  const{mainId} = useParams()

  const changeHandler = (e) => {
    setEditMovie((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const updateMovie = async (event) => {
    event.preventDefault();
    console.log(editMovie,"movie")
    try {
      const response = await axios.put(`http://localhost:4000/api/movies/${mainId}`, editMovie);
      console.log("Movie Updated successfully", response.data);
    } catch (error) {
      console.error("Error updating Movie", error.response?.data || error.message);
    }
  };

  return (
    <div className="addmovie-container">
      <h1 className="heading">Add Movie</h1>
      <form onSubmit={updateMovie} className="form">
        <span>
          Movie_Name:{" "}
          <input
            type="text"
            placeholder="Enter movie name"
            value={editMovie.movieName || ""}
            name="movieName"
            id="movieName"
            onChange={changeHandler}
          />
        </span>
       
        <span>
          Main_Image:
          <input
            type="text"
            placeholder="Enter movie name"
            name="imageMainUrl"
            id="imageMainUrl"
            value={editMovie.imageMainUrl || ""}
            onChange={changeHandler}
          />
        </span>
        <span>
          Background_Image:
          <input
            type="text"
            placeholder="Enter movie name"
            name="imageBackgroundUrl"
            id="imageBackgroundUrl"
            value={editMovie.imageBackgroundUrl || ""}
            onChange={changeHandler}
          />
        </span>
        <span>
          Trailer Link
          <input
            type="text"
            placeholder="Enter movie name"
            name="trailerLink"
            id="trailerLink"
            value={editMovie.trailerLink || ""}
            onChange={changeHandler}
          />
        </span>
        <span>
          Director:
          <input
            type="text"
            placeholder="Enter movie name"
            name="directors"
            id="directors"
            value={editMovie.directors || ""}
            onChange={changeHandler}
          />
        </span>
        <span>
          Genre:
          <input
            type="text"
            placeholder="Enter movie name"
            name="genre"
            id="genre"
            value={editMovie.genre || ""}
            onChange={changeHandler}
          />
        </span>

        <span>
          Industry:
          <select
            name="industry"
            id="industry"
            value={editMovie.industry || ""}
            onChange={changeHandler}
          >
            <option value="Bollywood">Bollywood</option>
            <option value="Hollywood">Hollywood</option>
            <option value="Tollywood">Tollywood</option>
            <option value="Other">Other</option>
          </select>
        </span>

        <span>
          Video_Dimension:
          <select
            name="videoDimension"
            id="videoDimension"
            value={editMovie.videoDimension || ""}
            onChange={changeHandler}
          >
            <option value="2D">2D</option>
            <option value="3D">3D</option>
          </select>
        </span>

        <span>
          Language:
          <select
            name="language"
            id="language"
            value={editMovie.language || ""}
            onChange={changeHandler}
          >
            <option value="English">English</option>
            <option value="Hindi">Hindi</option>
            <option value="Tamil">Tamil</option>
            <option value="Telugu">Telugu</option>
            <option value="Urdu">Urdu</option>
          </select>
        </span>

        <span>
          Certification:
          <select
            name="certification"
            id="certification"
            value={editMovie.certification || ""}
            onChange={changeHandler}
          >
            <option value="U/A">U/A</option>
            <option value="U">U</option>
            <option value="A">A</option>
          </select>
        </span>
        <span>
          Duration
          <input
            type="time"
            placeholder="Enter movie name"
            name="duration"
            id="duration"
            value={editMovie.duration || ""}
            onChange={changeHandler}
          />
        </span>
        <span>
          Release_Date:
          <input
            type="date"
            placeholder="Enter movie name"
            name="releaseDate"
            id="releaseDate"
            value={editMovie.releaseDate.slice(0,10) || ""}
            onChange={changeHandler}
          />
        </span>
        <span>
          lastScreenDate:
          <input
            type="date"
            placeholder="Enter movie name"
            name="lastScreenDate"
            id="lastScreenDate"
            value={editMovie.lastScreenDate || ""}
            onChange={changeHandler}
          />
        </span>
        <span>
          Cast:
          <textarea
            type="text"
            placeholder="Enter movie name"
            name="mainCasts"
            id="mainCasts"
            value={editMovie.mainCasts || ""}
            onChange={changeHandler}
          />
        </span>
        <span>
          Tags:
          <textarea
            name="tags"
            id="tags"
            placeholder="Add Movie Tags"
            onChange={changeHandler}
            value={editMovie.tags || ""}
          ></textarea>
        </span>
        <span>
          Description:
          <textarea
            type="text"
            placeholder="Enter movie description"
            name="description"
            id="description"
            value={editMovie.description || ""}
            onChange={changeHandler}
          />
        </span>

        <button type="submit">Add Movie</button>
      </form>
    </div>
  );
};

export default EditMovie;

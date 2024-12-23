// import { useState } from "react"
// import "./AddMovies.css"

// const AddMovies = () => {

//   const [movie,setMovie] = useState({
   
//   })
  
//   const changeHandler = (e)=>{
//     setMovie((prev)=>({...prev,[e.target.name]:e.target.value}))
//   }



//   const addMovie = (event)=>{
//     event.preventDefault();
//     console.log(movie,"movie")
  

//   return (
//     <div className="addmovie-container">
//       <h1>Add Movie</h1>
//       <form  onSubmit={addMovie} className="form">
//          <span>Movie_Name: <input type="text" placeholder="Enter movie name" value={movie.movieName} name="movieName" id="movieName" onChange={changeHandler} /></span>
//          <span>Duration <input type="time" placeholder="Enter movie name" name="duration" id="duration" onChange={changeHandler} /></span>
//          <span>Release_Date: <input type="date" placeholder="Enter movie name" name="releaseDate" id="releaseDate" onChange={changeHandler} /></span>
//          <span>Main_Image: <input type="text" placeholder="Enter movie name" name="imageMainUrl" id="imageMainUrl" onChange={changeHandler} /></span>
//          <span>Background_Image: <input type="text" placeholder="Enter movie name" name=" imageBackgroundUrl" id=" imageBackgroundUrl" onChange={changeHandler} /></span>
//          <span>Trailer Link <input type="text" placeholder="Enter movie name" name="trailerLink" id="trailerLink" onChange={changeHandler} /></span>
//          <span>Director: <input type="text" placeholder="Enter movie name" name="directors" id="directors" onChange={changeHandler} /></span>
//          <span>Cast: <input type="text" placeholder="Enter movie name" name="mainCasts" id="mainCasts" onChange={changeHandler} /></span>
//          <span>Genre: <input type="text" placeholder="Enter movie name" name="genre" id="genre" onChange={changeHandler} /></span>
        
//          <span>
//             Industry: 
//             <select name="industry" id="industry" value={movie.industry} onChange={changeHandler}>
//               <option value="Bollywood">Bollywood</option>
//               <option value="Hollywood">Hollywood</option>
//               <option value="Tollywood">Tollywood</option>
//               <option value="Other">Other</option>
//             </select>
//         </span>

//          <span>
//           Video_Dimention: 
//           <select name=" videoDimension" id=" videoDimension" onChange={changeHandler}>
//             <option value="2D">2D</option>
//             <option value="3D">3D</option>
//           </select>
//          </span>
         
//          <span>
//           Language: 
//           <select name="language" id="language" value={movie.language} onChange={changeHandler}>
//             <option value="English">English</option>
//             <option value="Hindi">Hindi</option>
//             <option value="Tamil">Tamil</option>
//             <option value="Telugu">Telugu</option>
//             <option value="Urdu">Urdu</option>
//           </select>
//          </span>
         
//          <span>
//           certification: 
//           <select name="certification" id="certification" value={movie.certification} onChange={changeHandler}>
//             <option value="U/A">U/A</option>
//             <option value="U">U</option>
//             <option value="A">A</option>
//           </select>
//           </span>
//           <span>Tags: <textarea name="tags" id="tags" placeholder="Add Movie Tags" onChange={changeHandler}></textarea></span>
//          <span>Description: <textarea type="text" placeholder="Enter movie description" name="description" id="description" onChange={changeHandler}/></span>
         
//          <button type="submit">Add Movie</button>
//       </form>
//     </div>
//   )
// }

// export default AddMovies


import { useState } from "react";
import "./AddMovies.css";
import axios from "axios";
import imageselect from "../../assets/imageselector.jpg"
 
const AddMovies = () => {


  const [mainImg, setMainImg] = useState(false);
  const [bgImg, setBgImg] = useState(false);

  const [movie, setMovie] = useState({
    imageMainUrl:"",
    imageBackgroundUrl:"",
  });


  const mainImgHandler = (e)=>{
    
    setMainImg(e.target.files[0]);
         
}

const bgImgHandler = (e)=>{
  setBgImg(e.target.files[0]);}

  const changeHandler = (e) => {
    setMovie((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const addMovie = async (event) => {
    event.preventDefault();
    console.log(movie, "movie");

    let responseData = {};
    let newMovie = { ...movie };

    let formData = new FormData();
    formData.append('newMovie', mainImg);
    formData.append('newMovie', bgImg);

    console.log(formData, "formdata");
        try {
          const uploadResponse = await fetch('http://localhost:4000/upload', {
            method: 'POST',
            body: formData,
          });
          responseData = await uploadResponse.json();
          console.log(responseData, "response data");
    
          if (responseData.success) {
            newMovie.imageMainUrl = responseData.image_urls[0];
            newMovie.imageBackgroundUrl = responseData.image_urls[1];
    
            console.log(newMovie, "product saved data ", responseData.image_urls, responseData);
    
            try {
              const response = await axios.post('http://localhost:4000/api/movies', newMovie);
              console.log("Movie Added Successfully", response.data);
              alert("Movie added successfully!");
            } catch (error) {
              console.error("Error Adding movie", error.response?.data || error.message);
            }
          } else {
            alert("Failed to upload images");
          }
        } catch (error) {
          console.error("Error uploading images", error);
          alert("Error uploading images");
        }
      };
  return (
    <div className="addmovie-container">
      <h1 className="heading">Add Movie</h1>
      <form onSubmit={addMovie} className="form">
        <span>
          Movie_Name:{" "}
          <input
            type="text"
            placeholder="Enter movie name"
            value={movie.movieName || ""}
            name="movieName"
            id="movieName"
            onChange={changeHandler}
            required
          />
        </span>
        <span>
          Duration{" "}
          <input
            type="time"
            placeholder="Enter movie name"
            name="duration"
            id="duration"
            onChange={changeHandler}
            required
          />
        </span>
        <span>
          Release_Date:{" "}
          <input
            type="date"
            placeholder="Enter movie name"
            name="releaseDate"
            id="releaseDate"
            onChange={changeHandler}
            required
          />
        </span>
        <span>
          lastScreenDate:
          <input
            type="date"
            placeholder="Enter movie name"
            name="lastScreenDate"
            id="lastScreenDate"
            onChange={changeHandler}
            required
          />
        </span>
        {/* <span>
          Main_Image:{" "}
          <input
            type="text"
            placeholder="Enter movie name"
            name="imageMainUrl"
            id="imageMainUrl"
            onChange={changeHandler}
          />
        </span>
        <span>
          Background_Image:{" "}
          <input
            type="text"
            placeholder="Enter movie name"
            name="imageBackgroundUrl"
            id="imageBackgroundUrl"
            onChange={changeHandler}
          />
        </span> */}
        <span>
          Trailer Link{" "}
          <input
            type="text"
            placeholder="Enter movie name"
            name="trailerLink"
            id="trailerLink"
            onChange={changeHandler}
            required
          />
        </span>
        <span>
          Director:{" "}
          <input
            type="text"
            placeholder="Enter movie name"
            name="directors"
            id="directors"
            onChange={changeHandler}
            required
          />
        </span>
        <span>
          Cast:{" "}
          <input
            type="text"
            placeholder="Enter movie name"
            name="mainCasts"
            id="mainCasts"
            onChange={changeHandler}
            required
          />
        </span>
        <span>
          Genre:{" "}
          <input
            type="text"
            placeholder="Enter movie name"
            name="genre"
            id="genre"
            onChange={changeHandler}
            required
          />
        </span>

        <span>
          Industry:
          <select
            name="industry"
            id="industry"
            value={movie.industry || ""}
            onChange={changeHandler}
            required
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
            onChange={changeHandler}
            required
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
            value={movie.language || "english"}
            onChange={changeHandler}
            required
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
            value={movie.certification || ""}
            onChange={changeHandler}
            required
          >
            <option value="U/A">U/A</option>
            <option value="U">U</option>
            <option value="A">A</option>
          </select>
        </span>
        <span>
          Tags:{" "}
          <textarea
            name="tags"
            id="tags"
            placeholder="Add Movie Tags"
            onChange={changeHandler}
            required
          ></textarea>
        </span>
        <span>
          Description:{" "}
          <textarea
            type="text"
            placeholder="Enter movie description"
            name="description"
            id="description"
            onChange={changeHandler}
            required
          />
        </span>

        <label htmlFor="mainImg">
            <img src={mainImg?URL.createObjectURL(mainImg):imageselect} alt="mainImg" className="input-image"/>   
        </label>
        <input onChange= {mainImgHandler} type="file" name="mainImg" id="mainImg" hidden required/>
        <label htmlFor="bgImg">
            <img src={bgImg?URL.createObjectURL(bgImg):imageselect} alt="bgImg" className="input-image"/>   
    
       </label>
        <input onChange= {bgImgHandler} type="file" name="bgImg" id="bgImg" hidden required/>
<br />
        <button type="submit">Add Movie</button>
      </form>

     



    </div>
  );
};

export default AddMovies;

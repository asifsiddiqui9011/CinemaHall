import { useEffect, useState } from "react"
import Card from "../Cards/Card"
import axios from "axios"
import "./MoviesList.css"
import { Link } from "react-router-dom"


const MoviesList = () => {

const [allMovies,setAllMovies] = useState([])

  // Fetch data from the backend API
  useEffect(() => {
    // Fetch data from the backend API using Axios
    const fetchMovies = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/getmovies"); // Replace with your actual backend endpoint
        setAllMovies(response.data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);
  

  return (
    <div className="movieList-container">
      <h1>Movies List</h1>
      <h1>Now</h1>
      <hr />
      <div className="cards-container">
       {/* <Link to={"/movieslist/desc"}> <Card/></Link> */}
       {allMovies.map((movie,index)=>{
        console.log(movie,"movieeee")
        if(new Date(movie.releaseDate) <= new Date()){
        return(
          <Link to={`/movieslist/${movie._id}`} key={index}> <Card key={index} name={movie.movieName} img={movie.imageMainUrl} genre={movie.genre} 
          certification={movie.certification} videoDimension={movie.videoDimension} language={movie.language}/></Link>
        )}
       })}
       
      </div>
      <h1>coming Soon</h1>
      <div className="cards-container">
      {allMovies.map((movie,index)=>{
        console.log(movie,"movieeee")
        if(new Date(movie.releaseDate) >= new Date()){
        return(
          <Link to={`/movieslist/${movie._id}`} key={index}> <Card key={index} name={movie.movieName} img={movie.imageMainUrl} genre={movie.genre} 
          certification={movie.certification} videoDimension={movie.videoDimension} language={movie.language}/></Link>
        )}
       })}
      </div>
    </div>
  )
}

export default MoviesList

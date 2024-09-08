
import "./MovieDesc.css"
import axios from 'axios'
import { useState,useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import City from "../BuyTickets/City";
import TheaterSlot from "../BuyTickets/TheaterSlot";
import { CinemaContext } from "../../Contex/CinemaContext";

const MovieDesc = () => {
    


  const {slotToggle,cityToggle,cityToggleHandler,ticket,slotToggleHandler} = useContext(CinemaContext)
  let { movieId } = useParams();
  const [movie, setMovie] = useState({});
  console.log(movie)
  
  const fetchMovie = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/movies/${movieId}`);
      setMovie(response.data);
    } catch (err) {
      console.log(err);
    } finally {
      console.log("API called");
    }
  };
  
  useEffect(() => {
    if(ticket.city){
      cityToggleHandler()
      slotToggleHandler()

    }
      fetchMovie();

  },[movieId,ticket.city]);
  
    // if (loading) {
    //   return <div>Loading...</div>;
    // }
  
    // if (error) {
    //   return <div>{error}</div>;
    // }
  
    // if (!movie) {
    //   return <div>Movie not found</div>;
    // }

    
  return (
    <div className="moviedesc-container" style={{backgroundImage:`url(${movie.imageBackgroundUrl})`}}>
        <div className="blur">
            <div className="movie-details">
                    <img src={movie.imageMainUrl} alt="" className="movie-card" />
                    <div className="movie-title">
                      <h3>{movie.movieName}</h3>
                         <h3>{movie.genre}</h3>
                        <h3>{movie.industry}</h3>
                        <h3>Retings:9.5/10</h3>
                        <button onClick={()=>{cityToggleHandler("66c9c0fabeb76af288f23968")}}>Book Ticket</button> 
                       &nbsp; <button>Watch Trailer</button>
                    </div>
            </div>
            <div className="theater-schedule">
                <div className="movie-description">
                    <p>{movie.description}</p>
                    <h3>Director: {movie.directors }</h3>
                    <h4>Cast: {movie.mainCasts}</h4>
                    <h3>Languege: {movie.language}</h3>
                    <h3>ReleaseDate: </h3>
                </div>
                {/* {movie.releaseDate.slice(0,10)} ----------- { movie.lastScreenDate.slice(0,10)}
                {movie.releaseDate.slice(0,10) ||""} */}
            </div>
        </div>
      
        {cityToggle &&(
              <City/>   
        )}
        {slotToggle &&(
             <TheaterSlot/>      
         )}
    </div>
  )
}

export default MovieDesc

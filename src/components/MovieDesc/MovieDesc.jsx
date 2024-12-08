import { useState,useEffect } from "react"
import "./MovieDesc.css"
import AddToScreen from "../AddToScreen/AddToScreen"
import {useParams} from "react-router-dom"
import axios from "axios"
import { useContext } from "react"
import { AdminContext } from "../../Context/AdminContext"
import { Link } from "react-router-dom"

const MovieDesc = () => {
    
    const { setEditMovie,Authorization} = useContext(AdminContext)


    const { mainId } = useParams(); // Get the movie ID from the URL
    const [toggle, setToggle] = useState(false);
    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const Toggle = () => {
      setToggle(!toggle);
    };
  
    useEffect(() => {
      // Fetch the movie data using axios
      const fetchMovie = async () => {
        try {
          const response = await axios.get(`http://localhost:4000/api/movies/${mainId}`);
          setMovie(response.data);
          setLoading(false);
        } catch (err) {
          setError("Error fetching movie data");
          setLoading(false);
        }
      };
  
      fetchMovie();
      console.log(movie,"movie")
    }, [mainId]);
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>{error}</div>;
    }
  
    if (!movie) {
      return <div>Movie not found</div>;
    }

    const deleteMovie = async()=>{
       try {
         await axios.delete(`http://localhost:4000/api/movies/${mainId}`)
         console.log('movie Deleted successfully');
       } catch (error) {
         console.error('Error deleting movie', error);
       }finally {
        console.log('Delete operation completed');
      }
    }
  return (
    <div className="moviedesc-container" style={{backgroundImage: `url(${movie.imageBackgroundUrl})`}}>
        <div className="blur">
            <div className="movie-details">
                    <img src={movie.imageMainUrl} alt="" className="movie-card" />
                    <div className="movie-title">
                        <h2>{movie.movieName}</h2>
                        <h3>{movie.genre}</h3>
                        <h3>{movie.industry}</h3>
                        <h3>Retings:9.5/10</h3>
                       
                        {!Authorization?
                         <div>
                         <Link to={`edit`}><button onClick={()=>{setEditMovie(movie)}}>Edit</button></Link>
                         <button onClick={()=>{deleteMovie(movie._id)}}>Delete</button>
                         </div>: <button onClick={Toggle}>Add to your Screen</button>}
                       
                       
                    </div>
            </div>
            <div className="theater-schedule">
                <div className="movie-description">
                    <p>{movie.description}</p>
                    <h3>Director: {movie.directors}</h3>
                    <h4>Cast: {movie.mainCasts}</h4>
                    <h3>Languege: {movie.language}</h3>
                    <h3>Schedule: </h3>
                    <h3>ReleaseDate: </h3>
                    <h3>No of bookings till now:{movie.numberOfBookings}</h3>
                </div>
                {/* {movie.releaseDate.slice(0,10)} ----------- { movie.lastScreenDate.slice(0,10)}
                {movie.releaseDate.slice(0,10) ||""} */}
            </div>
        </div>
        {toggle &&(
            <div className="toggle-container">
            <button onClick={Toggle}>X</button>
             <AddToScreen/>
        </div>
        )}
        
    </div>
  )
}

export default MovieDesc


import "./MovieDesc.css"
import axios from 'axios'
import { useState,useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import City from "../BuyTickets/City";
import TheaterSlot from "../BuyTickets/TheaterSlot";
import { CinemaContext } from "../../Contex/CinemaContext";
import { RxCross2 } from "react-icons/rx";
import LazyImage from "../LazyImage/LazyImage";
import Loader from "../Loader/Loader";

const MovieDesc = () => {
    


  const {setTicket,url,handleToggle,allMovies} = useContext(CinemaContext)

  let { movieId } = useParams();
  
  const movie = allMovies.find((e) => e._id === movieId);

  if (!movie){
    return <Loader/>
  }
  
  const [city,setCity] = useState('')
  console.log(city,"moviedesc city")
  const handleCity = (e)=>{
    setCity(e.target.value)
    setTicket((prev)=>({...prev,[e.target.name]:e.target.value}))
  }
  
  
  
  useEffect(() => {
    if(city){
      setlocation(false)
      setTheaterToggle(true)
    }

  },[movieId,city]);
  
   const [location,setlocation] = useState(false)

   const locationHandler = ()=>{
    setlocation(!location)
   }

   const [theatertoggle,setTheaterToggle] = useState(false)

   const theaterToggleaHandler = ()=>{
    setTheaterToggle(!theatertoggle)
   }

    
  return (
    <div className="moviedesc-container" >
      <img src={movie.imageBackgroundUrl} alt="Background" className="background-image" />
                    

        <div className="blur">
            <div className="movie-details">
    
                    <LazyImage
                              src={movie.imageMainUrl}
                              alt="Movie Background"
                              className="movie-card"
                              style={{
                                position: 'relative',
                                zIndex: '-1',
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                              }}
                            />
           
                    <div className="movie-title">
                      <h3>{movie.movieName}</h3>
                         <h3>{movie.genre}</h3>
                        <h3>{movie.industry}</h3>
                        <h3>Retings:9.5/10</h3>
                        <div className="btn-div">
                          {localStorage.getItem('auth-token')!==null
                            ? 
                            <button className="buyticketbtn" onClick={locationHandler}>Book Ticket</button>
                            :
                            <button className="buyticketbtn" onClick={handleToggle}>Book Ticket</button>
                          }
                       
                        <Link to={`${movie.trailerLink}` }target="_blank" rel="noopener noreferrer"> <button className="buyticketbtn" >Watch Trailer</button></Link>
                        </div>
                    </div>
            </div>
            <div className="theater-schedule">
                <div className="movie-description">
                    <p>{movie.description}</p>
                    <h3>Director: {movie.directors }</h3>
                    <h4>Cast: {movie.mainCasts}</h4>
                    <h3>Languege: {movie.language}</h3>
                    <h3>ReleaseDate:                                  </h3>
                </div>
                {/* {movie.releaseDate.slice(0,10)} ----------- { movie.lastScreenDate.slice(0,10)}
                {movie.releaseDate.slice(0,10) ||""}  {movie.releaseDate.slice(0,10) ||""}  */}
            </div>
        </div>

        {location==true ?(
          <div className="city-toggle-container">
               <RxCross2 onClick={()=>{setlocation(false)}} id="icon"/>
                <City cityHandler={handleCity}/>   
          </div>
             
        ):''}
        
         {theatertoggle==true ?(
           
           <div className="theater-toggle-containerr">
             <RxCross2 onClick={()=>{setTheaterToggle(false)}} id="icon"/>
             <TheaterSlot/>    
          </div>  
       ):""}
    </div>
  )
}

export default MovieDesc

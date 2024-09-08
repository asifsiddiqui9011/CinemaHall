import Card from "../Cards/Card"
import "./ComingSoon.css"
import { useContext } from "react"
import { CinemaContext } from "../../Contex/CinemaContext"


const ComingSoon = () => {

  const{allMovies} = useContext(CinemaContext)
  return (
    <div className="comingsoon-container">
      <h1>Coming Soon</h1><div className="next_btn">
      </div>
      <hr />
      <div className="cs_cards-container">
        
        {allMovies.map((movie,index)=>{
            if(new Date(movie.releaseDate) >= new Date()){
              return(
                  <div className="cs_cards" key={index}><Card movieName={movie.movieName} genre={movie.genre} language={movie.language} image={movie.imageMainUrl}/></div>
              )
            }
        })}
      
        
        
        
      </div>
    </div>
  )
}

export default ComingSoon

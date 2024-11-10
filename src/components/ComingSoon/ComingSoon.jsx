import Card from "../Cards/Card"
import "./ComingSoon.css"
import { useContext } from "react"
import { CinemaContext } from "../../Contex/CinemaContext"
import Carousel from 'react-multi-carousel';


const ComingSoon = () => {

  const{allMovies} = useContext(CinemaContext)

  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 1,
  
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (
    <section className="comingsoon-container" id="comingsoon">
      <h1>Coming Soon</h1>
      <div className="next_btn">
      </div>
      <hr />
      <div className="cs_cards-container">
       {/* <Carousel responsive={responsive} arrows={true} keyBoardControl={true} showDots={true} removeArrowOnDeviceType={["tablet", "mobile"]}> */}
        {allMovies.map((movie,index)=>{
            if(new Date(movie.releaseDate) >= new Date()){
              return(
                  <div className="cs_cards" key={index}><Card movieName={movie.movieName} genre={movie.genre} language={movie.language} image={movie.imageMainUrl}/></div>
              )
            }
        })}
      {/* </Carousel> 
         */}
        
        
      </div>
    </section>
  )
}

export default ComingSoon

import { Suspense, useContext, useState } from "react"
import "./Banner.css"
import CardImg from "../../../public/card-image.jpg"
import { CinemaContext } from "../../Contex/CinemaContext"
import { Link } from "react-router-dom"
// import Carousel from 'react-multi-carousel';
import { Carousel } from 'react-responsive-carousel';
import Bann from "./Bann"
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import Loader from "../Loader/Loader"


const Banner = () => {

  const [banner,setBanner] = useState('')
 
  const{allMovies} = useContext(CinemaContext)
  console.log(allMovies[0])



  return (
    <Carousel autoPlay={true} infiniteLoop={true} autoFocus={true} useKeyboardArrows={true} swipeable={false}>
      {allMovies.map((movie,index)=>{
        return(
            <Bann key={index} movie={movie}/>
        )
      })}
    </Carousel>
  )
    
}

export default Banner


{/* <div className="banner-container">
      <div className="banner-flow">
        <div className="flow-img">

        </div>
        <div className="flow-description">
            <h1>
               Iron Man 3
            </h1>
            <p>
             Lorem ipsum dolor, sit amet consectetur adipisicing elit. Optio maiores hic blanditiis a, rem voluptates dignissimos qui fugit suscipit quas quaerat.
            </p>
            <p><b>Action * (U/A) * Eng</b></p>
            <b>Ratings *  * * *</b>
            <div className="flow-btns">
           <Link to={`/${movieId}`}><button className="buyticket_btn"  onClick={()=>{cityToggleHandler("66c9c0fabeb76af288f23968")}} >Buy Tickets</button></Link>   
              <button className="buyticket_btn">Trailer</button>
            </div>
        </div>
        <div className="flow-dots">
           <h1>* * * * * * * </h1>
        </div>

      </div>

      
    </div> */}
    

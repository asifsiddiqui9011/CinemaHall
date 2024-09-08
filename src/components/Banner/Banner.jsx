import { useContext, useState } from "react"
import "./Banner.css"
import CardImg from "../../../public/card-image.jpg"
import { CinemaContext } from "../../Contex/CinemaContext"
import { Link } from "react-router-dom"


const Banner = () => {

  const [banner,setBanner] = useState('')
  const {cityToggleHandler,TicketHandler,ticket,setTicket} = useContext(CinemaContext)
  
  const movieId = "Movie0001"

  return (
    <div className="banner-container">
      {/* <img src="" alt="" className="banner-img"/> */}
      <div className="banner-flow">
        <div className="flow-img">
          {/* <img src={CardImg} alt=""  className="flow_img"/> */}
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

      
    </div>
  )
}

export default Banner

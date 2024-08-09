import { useState } from "react"
import "./Banner.css"
import CardImg from "../../../public/card-image.jpg"
const Banner = () => {

  const [banner,setBanner] = useState('')


  return (
    <div className="banner-container">
      {/* <img src="" alt="" className="banner-img"/> */}
      <div className="banner-flow">
        <div className="flow-img">
          {/* <img src={CardImg} alt=""  className="flow_img"/> */}
        </div>
        <div className="flow-description">
            <h1>
               Title of the movie
            </h1>
            <p>
             Lorem ipsum dolor, sit amet consectetur adipisicing elit. Optio maiores hic blanditiis a, rem voluptates dignissimos qui fugit suscipit quas quaerat.
            </p>
            <p><b>Action * (U/A) * Eng</b></p>
            <b>Ratings *  * * *</b>
            <div className="flow-btns">
              <button>Buy Tickets</button>
              <button>Trailer</button>
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

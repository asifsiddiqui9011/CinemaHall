import { useState } from "react"
import "./MovieDesc.css"
import AddToScreen from "../AddToScreen/AddToScreen"
 let cardimg = "https://w0.peakpx.com/wallpaper/1020/783/HD-wallpaper-avengers-endgame-end-war.jpg"

const MovieDesc = (props) => {

    const [toggle,setToggle] = useState(false)

    const Toggle =()=>{
        setToggle(!toggle)
    }
  return (
    <div className="moviedesc-container">
        <div className="blur">
            <div className="movie-details">
                    <img src={cardimg} alt="" className="movie-card" />
                    <div className="movie-title">
                        <h2>Avengers End Game</h2>
                        <h3>Action/Sci-Fi</h3>
                        <h3>Eng/Hin</h3>
                        <h3>Retings:9.5/10</h3>
                        <button onClick={Toggle}>Add to your Screen</button>
                    </div>
            </div>
            <div className="theater-schedule">
                <div className="movie-description">
                    <p>Description Lorem Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor ducimus reprehenderit blanditiis quia adipisci aut ut officia vero iusto quaerat? Ducimus labore voluptate enim impedit placeat iure assumenda dicta sit? ipsum dolor sit amet, consectetur adipisicing elit. Repudiandae est autem dolor numquam incidunt dolore aliquam debitis quo, tenetur quia architecto facilis facere voluptates veniam exercitationem libero tempore consequuntur atque?</p>
                    <h3>Director: Anthony Russo, Joe Russo</h3>
                    <h4>Cast: Robert Downey Jr., Chris Evans</h4>
                    <h3>Language</h3>
                    <h3>Schedule:</h3>
                    <h3>ReleaseDate: 26 April 2019 (India)</h3>
                    <h3>No of bookings till now:</h3>
                </div>
                {/* <div>
                    <button>Add to your Screen</button>
                </div> */}

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

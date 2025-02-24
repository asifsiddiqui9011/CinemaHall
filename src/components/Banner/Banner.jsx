import { Suspense, useContext, useState } from "react"
import "./Banner.css"
import CardImg from "../../../public/card-image.jpg"
import { CinemaContext } from "../../Contex/CinemaContext"
import { Link } from "react-router-dom"
// import Carousel from 'react-multi-carousel';
import { Carousel } from 'react-responsive-carousel';
import Bann from "./Bann"
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useEffect } from "react"
import { RxCross2 } from "react-icons/rx";
import TheaterSlot from "../BuyTickets/TheaterSlot"
import City from "../BuyTickets/City"

import Loader from "../Loader/Loader"


const Banner = () => {

  const{setTicket} = useContext(CinemaContext)

  const [banner,setBanner] = useState('')
 

  const[city,setCity]=useState('')
  const{allMovies} = useContext(CinemaContext)
  console.log(allMovies[0])


  const[cityselector,setCitySelector] = useState(false);
    const[slotSelector,setSlotSelector] = useState(false);

    const cityToggleHandle = ()=>{
      setCitySelector(!cityselector)
    }

    const slotTogglegHandle =()=>{
      setSlotSelector(!slotSelector)
    }

    const cityHandler = (e)=>{
      setCity(e.target.value)
      setTicket((prev)=>({...prev,[e.target.name]:e.target.value}))
    }

    useEffect(()=>{
      if(city){
        slotTogglegHandle();
        cityToggleHandle();
        
      }
    },[city])

  return (
    <>
   
    <Carousel autoPlay={true} infiniteLoop={true} autoFocus={true} useKeyboardArrows={true} swipeable={false}>
      {allMovies.map((movie,index)=>{
        return(
            <Bann key={index} movie={movie} cityToggleHandle={cityToggleHandle}/>
        )
      })}
    </Carousel>

      {cityselector &&(
        <div className="theater-toggle-container" >
          <RxCross2 onClick={cityToggleHandle} id="icon"/>
          <City  cityHandler={cityHandler} />
        </div>   
      )}
      { slotSelector&&(
        <div className="theater-toggle-containerr">
          <RxCross2 onClick={slotTogglegHandle} id="icon" style={{marginRight:"-1120px"}}/>
          <TheaterSlot/>   
          </div>  
      )}
 
  </>
   )
}

export default Banner



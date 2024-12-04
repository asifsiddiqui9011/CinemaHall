import React, { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { CinemaContext } from '../../Contex/CinemaContext'
import { useContext } from 'react'
import { RxCross2 } from "react-icons/rx";
import TheaterSlot from "../BuyTickets/TheaterSlot"
import City from "../BuyTickets/City"
import { useState } from 'react';

const Bann = ({movie}) => {
    const {setTicket,handleToggle} = useContext(CinemaContext)

    


    const[city,setCity]=useState('')
    // console.log(city,"banner city ")

    
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
    <div className="banner-container" style={{backgroundImage:`url(${movie.imageBackgroundUrl})`}} >
        <div style={{height:"inherit",width:"100vw",backdropFilter:"blur(2px)"}}>

       
      <div className="banner-flow">
        <div className="flow-img" style={{backgroundImage:`url(${movie.imageMainUrl})`}}>

        </div>
        <div className="flow-description">
            <h1>
             {movie.movieName}
            </h1>
            <p className='description'>
              {movie.description}
            </p>
            <p><b>{movie.genre} {movie.certification} {movie.videoDimension}</b></p>
            <b>{movie.language}</b>
            <div className="flow-btns">
              {localStorage.getItem('auth-token')!==null?
           <Link to={`/${movie._id}`}><button className="buyticket_btn"  onClick={cityToggleHandle} >Buy Tickets</button></Link> :
           <button className="buyticket_btn"  onClick={handleToggle} >Buy Tickets</button> }  
             <Link to={`${movie.trailerLink}` }target="_blank" rel="noopener noreferrer"> <button className="buyticket_btn">Trailer</button></Link>
            </div>
        </div>
      </div>
      </div>
    </div>
    {cityselector &&(
          <div className="theater-toggle-containerr">
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

export default Bann

import React from 'react'
import { Link } from 'react-router-dom'
import { CinemaContext } from '../../Contex/CinemaContext'
import { useContext } from 'react'
import { RxCross2 } from "react-icons/rx";
import TheaterSlot from "../BuyTickets/TheaterSlot"
import City from "../BuyTickets/City"
import { useState } from 'react';
import CustomDropdown from '../BuyTickets/CityDropdown';

const Bann = ({movie}) => {
    const {TicketHandler,ticket,setTicket,handleToggle} = useContext(CinemaContext)

    const style = {
      backgroundColor:"blue"
    }
    const[cityToggle,setCityToggle]= useState(false)  


    const[slotToggle,setSlotToggle]= useState(false)  

    const thr = ()=>{
      setCityToggle(false)
      setSlotToggle(true)
      console.log("thr clicked")
    }
    const slotToggleHandler = ()=>{
        setSlotToggle(!slotToggle)

    }

    const cityToggleHandler = (e)=>{
      setCityToggle(!cityToggle)
    if(e){
      setTicket((prev)=>({...prev,movieId:e}))
    }
    }


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
           <Link to={`/${movie._id}`}><button className="buyticket_btn"  onClick={()=>{cityToggleHandler(`${movie._id}`)}} >Buy Tickets</button></Link> :
           <button className="buyticket_btn"  onClick={handleToggle} >Buy Tickets</button> }  
             <Link to={`${movie.trailerLink}` }target="_blank" rel="noopener noreferrer"> <button className="buyticket_btn">Trailer</button></Link>
            </div>
        </div>
      </div>
      </div>
    </div>
    {cityToggle &&(
          <div className="theater-toggle-containerr">
             <RxCross2 onClick={()=>{setCityToggle(false)}} id="icon"/>
              {/* <City style={style} pop={thr}/>  */}
              <CustomDropdown pop={thr}/>
          </div>   
        )}
        {slotToggle &&(
          <div className="theater-toggle-containerr">
            <RxCross2 onClick={()=>{setSlotToggle(false)}} id="icon" style={{marginRight:"-1120px"}}/>
             <TheaterSlot style={style}/>   
             </div>  
         )}
    </>
  )
}

export default Bann

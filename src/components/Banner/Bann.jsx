import React, { Suspense, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { CinemaContext } from '../../Contex/CinemaContext'
import { useContext } from 'react'
import { lazy } from 'react'

import { useState } from 'react';
//import LazyImage from '../LazyImage/LazyImage';
const LazyImage = lazy(()=>import('../LazyImage/LazyImage'))

const Bann = ({movie,cityToggleHandle}) => {


    const {setTicket,handleToggle} = useContext(CinemaContext)

    
    // style={{backgroundImage:`url(${movie.imageBackgroundUrl})`}} 
  return (
    <div className="banner-container" >

{/* <img src={movie.imageBackgroundUrl} alt="Movie Background" className="background-image" loading='lazy' /> */}

<Suspense fallback={<h1>loading.....</h1>}>
    <LazyImage
      src={movie.imageBackgroundUrl}
      alt="Movie Background"
      className="background-image"
      style={{
        position: 'absolute',
        zIndex: '-1',
        width: '100%',
        height: '100%',
        objectFit: 'cover',
      }}
    />
</Suspense>

<div style={{minHeight:"88vh",width:"100vw",backdropFilter:"blur(2px)", zIndex:"5"}}>

       
      <div className="banner-flow">
        <div className="flow-img" >

        <Suspense fallback={<h1>loading.....</h1>}>
            <LazyImage
                src={movie.imageMainUrl}
                alt="movie image"
                style={{
                  position: 'absolute',
                  zIndex: '-1',
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
          </Suspense>
             {/* <img src={movie.imageMainUrl} alt="movie image" loading='lazy'/> */}
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
  )
}

export default Bann

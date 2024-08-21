import React from 'react'
import './New_release.css'
const movies = [
    {
      title: 'Ant-Man and The Wasp Quantumania',
      genre: 'Action • UA • English',
      image: 'https://via.placeholder.com/300x400.png?text=Ant-Man+and+The+Wasp+Quantumania',
      newRelease: true,
    },
    {
      title: 'Haowa',
      genre: 'Action • UA • Assamese',
      image: 'https://via.placeholder.com/300x400.png?text=Haowa',
    },
    {
      title: 'Avatar: The Way of Water',
      genre: 'Action • UA • English',
      image: 'https://via.placeholder.com/300x400.png?text=Avatar+The+Way+of+Water',
    },
    {
      title: 'Poran',
      genre: 'Action • UA • Bengali',
      image: 'https://via.placeholder.com/300x400.png?text=Poran',
    },
    {
      title: 'Creed 3',
      genre: 'Action • UA • English',
      image: 'https://via.placeholder.com/300x400.png?text=Creed+3',
    },
  ];
function New_release() {
  return (
    <div className='main'>
         <div className="container">
      <h1>Now Showing</h1>
      <div className="movie-grid">
        {movies.map((movie, index) => (
          <div key={index} className="movie-card">
            {movie.newRelease && (
              <span className="new-release">New Release</span>
            )}
            <img src={movie.image} alt={movie.title} />
            <div className="movie-info">
              <h2>{movie.title}</h2>
              <p>{movie.genre}</p>
              <div className="buttons">
                <button className="get-tickets">Get Tickets</button>
                <button className="trailer">Trailer</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
    </div>
  )
}

export default New_release
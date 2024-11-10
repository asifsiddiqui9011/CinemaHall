import './Recent.css'
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";
import Card2 from '../Cards/Card2'
import Card3 from '../Cards/Card3'
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { CinemaContext } from '../../Contex/CinemaContext';


const  Recent=()=>{
    
    const{allMovies} = useContext(CinemaContext)
    const movieId = "66c9d349d764708725d7ee9c";
    return(
        <section className="main_container" id='newRelease'>
          
            <h2>Now Showing</h2><div className="next_btn"><a href="#" className="previous round"><GrPrevious />
            </a>
             <a href="#" className="next round"><GrNext /></a></div>
            <hr></hr>
            <div style={{display:"flex", flexWrap:"wrap"}}>

           
          {allMovies[0] &&( 
            <div className="left_div">
             <Link to={`/description/${movieId}`}> <Card2 movieName={allMovies[0].movieName} genre={allMovies[0].genre} language={allMovies[0].language}  image={allMovies[0].imageMainUrl} bgimg={allMovies[0].imageBackgroundUrl}/></Link>
            </div>  )}

          
           {allMovies[0] &&(
            <div className="right_div">
    
                {allMovies.slice(1).map((movie,index)=>{
                    if(new Date(movie.releaseDate) <= new Date()){
                    return(

                        <div className='right_div1' key={index}>
                           <Link to={`/description/${movie._id}`}> <Card3 movieName={movie.movieName} genre={movie.genre} language={movie.language} image={movie.imageMainUrl}/></Link>
                        </div>
                       
                    )}
             })}
              
            </div>

           )} 
            </div>
        
        </section>
    )
}
export default Recent
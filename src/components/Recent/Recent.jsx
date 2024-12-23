import './Recent.css'
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";
import { Link } from 'react-router-dom';
import { Suspense, useContext } from 'react';
import { CinemaContext } from '../../Contex/CinemaContext';
import { lazy } from 'react';
import Loader from '../Loader/Loader'


const Card2 = lazy(() => import('../Cards/Card2'));
const Card3 = lazy(() => import('../Cards/Card3'));
// const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// const Card2 = lazy(() => delay(500).then(() => import('../Cards/Card2')));
// const Card3 = lazy(() => delay(500).then(() => import('../Cards/Card3')));

const  Recent=()=>{
    
    const{allMovies} = useContext(CinemaContext)
   

    return(
        <section className="main_container" id='newRelease'>

          
            <h2>Now Showing</h2><div className="next_btn"><a href="#" className="previous round"><GrPrevious />
            </a>
             <a href="#" className="next round"><GrNext /></a></div>
            <hr></hr>
            
            <div className='newrelease-cards-conatiner'>

                        {allMovies[0] &&( 
                            
                        <div className="left_div">
                            <Link to={`/description/${allMovies[0]._id}`}> 
                            <Suspense fallback={<Loader/>}>
                                <Card2 
                                    movieName={allMovies[0].movieName} 
                                    genre={allMovies[0].genre} 
                                    language={allMovies[0].language}  
                                    image={allMovies[0].imageMainUrl} 
                                    bgimg={allMovies[0].imageBackgroundUrl}
                                />
                            </Suspense>
                            </Link>
                        </div>  )}

                        
                        {allMovies[0] &&(
                        <div className="right_div">

                            {allMovies.slice(1).map((movie,index)=>{
                                if(new Date(movie.releaseDate) <= new Date()){
                                return(

                                    <div className='right_div1' key={index}>
                                        <Link to={`/description/${movie._id}`}> 
                                        <Suspense fallback={<Loader/>}>
                                            <Card3 
                                                movieName={movie.movieName} 
                                                genre={movie.genre} 
                                                language={movie.language} 
                                                image={movie.imageMainUrl}
                                            />
                                        </Suspense>
                                        </Link>
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
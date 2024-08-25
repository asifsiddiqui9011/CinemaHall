
import './App.css'
import AddMovies from './Components/AddMovies/AddMovies'
import AddTheater from './Components/AddTheater/AddTheater'
// import AddToScreen from './Components/AddToScreen/AddToScreen'
import MovieDesc from './Components/MovieDesc/MovieDesc'
import MoviesList from './Components/MoviesList/MoviesList'
import Navbar from './Components/Navbar/Navbar'
import Sidebar from './Components/Sidebar/Sidebar'
import { Routes,Route } from 'react-router-dom'
import TheaterList from './Components/TheaterList/TheaterList'


function App() {
 

  return (
    <>
    <Navbar/>
    <div className='display-container'>
       <Sidebar/>
       {/* <AddToScreen/> */}
       <Routes>
        <Route
          path='/addmovies'
          element={<AddMovies/>}
        />
        <Route
          path='/addtheater'
          element={<AddTheater/>}
        />
        <Route
          path='/movieslist'
          element={<MoviesList/>}
        />
        <Route
          path='/movieslist/desc'
          element={<MovieDesc/>}
        />
         <Route path={"/movielist"} element={<MovieDesc/>}>
                  <Route path=':mainId' element={<MovieDesc/>}/>
             </Route>
        <Route
          path='/theaterlist'
          element={<TheaterList/>}
        />
       </Routes>
    </div>
    
     
    </>
  )
}

export default App

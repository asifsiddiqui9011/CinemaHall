
import './App.css'
import AddMovies from './Components/AddMovies/AddMovies'
import AddTheater from './Components/AddTheater/AddTheater'
import MovieDesc from './Components/MovieDesc/MovieDesc'
import MoviesList from './Components/MoviesList/MoviesList'
import Navbar from './Components/Navbar/Navbar'
import Sidebar from './Components/Sidebar/Sidebar'
import { Routes,Route } from 'react-router-dom'
import TheaterList from './Components/TheaterList/TheaterList'
import EditMovie from './Components/AddMovies/Edit/EditMovie'
import EditTheater from './Components/AddTheater/Edit/EditThater'
import TheaterDesc from './Components/ThaterDesc/TheaterDesc'
import AllThaterList from './Components/AllTheaterList/AllThaterList'


function App() {
 

  return (
    <>
    <Navbar/>
    
    <Sidebar/>
    {localStorage.getItem('auth-token') == null ?<div style={{textAlign:"center",alignContent:"center", height:"90vh", width:"auto"}}><h1 style={{paddingTop:"100px"}}>Please authenticate to access the admin panel........</h1></div>:
    <div className='display-container'>   
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
      <Route path="/movieslist">
        <Route path=":mainId" element={<MovieDesc />} />
        <Route path=":mainId/edit" element={<EditMovie />} />
      </Route>

        <Route
          path='/theaterlist'
          element={<TheaterList/>}
        />
        <Route
          path='/alltheaterlist'
          element={<AllThaterList/>}
        />
         <Route path="/theaterlist" element={<TheaterList />}>
         <Route path=":id" element={<TheaterDesc />} />
         </Route>
         <Route path="/theaterlist/:id/edit" element={<EditTheater />} />

         </Routes>
    </div>
    }
     
    </>
  )
}

export default App

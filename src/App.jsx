
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
import ProtectedRoute from './Components/ProtectedRoutes/ProtectedRoutes'
import TheaterOwners from './Components/TheaterOwners/TheaterOwners'
import Admins from './Components/Admins/Admins'


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
          element={<ProtectedRoute element={<AddMovies/>} roles={["admin","superadmin"]} /> }
        />
        <Route
          path='/addtheater'
          element={<ProtectedRoute element={<AddTheater/>} roles={["theater_owner"]}/>}
        />
        <Route
          path='/movieslist'
          element={<MoviesList/>}
        />
      <Route path="/movieslist">
        <Route path=":mainId" element={<MovieDesc />} />
        <Route path=":mainId/edit" element={<ProtectedRoute element={<EditMovie />} roles={['admin',"superadmin"]}/>} />
      </Route>

        <Route
          path='/theaterlist'
          element={<TheaterList/>}
        />
        <Route
          path='/alltheaterlist'
          element={<ProtectedRoute element={<AllThaterList/>} roles={['admin','superadmin']}/>}
        />
        <Route path='/home' element={<ProtectedRoute element={<TheaterList />} roles={["theater_owner"]} />} />
         <Route path="/theaterlist" element={<TheaterList />}>
         <Route path=":id" element={<TheaterDesc />} />
         </Route>
         <Route path="/theaterlist/:id/edit" element={<EditTheater />} />
         <Route path="/thaterowners" element={<ProtectedRoute element={<TheaterOwners/>} roles={['admin','superadmin']}/>} />
         <Route path='/admins' element={<ProtectedRoute element={<Admins/>} roles={['superadmin']}/>} />
         </Routes>
    </div>
    }
     
    </>
  )
}

export default App

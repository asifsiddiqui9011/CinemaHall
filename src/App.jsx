
import './App.css'
import Banner from './components/Banner/Banner';
import Navbar from "./components/Navbar/Navbar";
import Footer from './components/Footer/Footer'
import Description from './components/Description/description'
import {Routes,Route} from "react-router-dom"
import Home from './Pages/Home/Home';
import Payment from './components/Payment/Payment'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
const stripePromise = loadStripe('your-publishable-key-here');

function App() 
{
  
  return (
    <>
     <Navbar />
     
     <Routes> 
     <Route
        path='/'
        element={<Home/>}
      />
      <Route
        path='/seatbooking'
        element={<Description/>}
      />
     </Routes>
     <Elements stripe={stripePromise}>
      {/* <Payment /> */}
    </Elements>
     <Footer/>
    </>
  )
}

export default App

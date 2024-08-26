import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import CinemaContextProvider from './Contex/CinemaContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CinemaContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CinemaContextProvider>
  </React.StrictMode>,
)

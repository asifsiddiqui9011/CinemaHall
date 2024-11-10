import "./Footer.css"
import React from 'react'
import fb from '../../assets/facebook.png'
import twitter from '../../assets/twitter.png'
import LinkedIn from '../../assets/linkedin.png'
import inst from '../../assets/instagram.png'
const Footer = () => {
  return (
    <footer className='footer' id="contact">
        <div className="sb-footer-section-padding">
            <div className="sb-footer-links">
                <div className="sb-footer-links-div">
                    <h4>For Booking</h4>
                    <a href="/employer">
                        <p>Status</p>
                    </a>
                    <a href="/healthplan">
                        <p>Offers</p>
                    </a>
                    <a href="/individual">
                        <p>Cinemas</p>
                    </a>
                </div>
               
                <div className="sb-footer-links-div">
                    <h4>Partners</h4>
                    <a href="/employer">
                        <p>PVR</p>
                    </a>
                </div>
                <div className="sb-footer-links-div">
                    <h4>Company</h4>
                    <a href="/about">
                        <p>About</p>
                    </a>
                  
                    <a href="/career">
                        <p>career</p>
                    </a>
                    <a href="/contact">
                        <p>Contact</p>
                    </a>
                </div>
                <div className="sb-footer-links-div">
                    <h4>Socail Media Handles</h4>
                    <div className="socialmedia">
                        <p><img src={fb} alt=''/></p>
                        <p><img src={twitter} alt=''/></p>
                        <p><img src={LinkedIn} alt=''/></p>
                        <p><img src={inst} alt=''/></p>
                    </div>
                </div>
            </div>
            <hr></hr>

                <div className="sb-footer-below">
                    <div className="sb-footer-copyright">
                        <p>@{new Date().getFullYear()} CinemaHall All right reserved</p>
                    </div>
                    <div className="sb-footer-below-links">
                        <a href="/term">
                            <div>
                                <p>Term & Conditions</p>
                            </div>
                        </a>
                        <a href="/privacy">
                            <div>
                                <p>Privacy</p>
                            </div>
                        </a>
                        <a href="/security">
                            <div>
                                <p>Security</p>
                            </div>
                        </a>
                        <a href="/cookie">
                            <div>
                                <p>Cookie Declaration</p>
                            </div>
                        </a>
                    </div>
                </div>
        </div>
    </footer>
  
  )
}

export default Footer

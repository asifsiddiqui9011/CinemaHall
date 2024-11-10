import { useContext, useEffect, useState } from "react"
import "./Profile.css"
import { CgProfile } from "react-icons/cg";
import { CinemaContext } from "../../Contex/CinemaContext";
import Ticket from "../Tickets/Ticket";

const Profile = (props) => {

  const{fetchedUserData,fetchUser} = useContext(CinemaContext)

  

  // const getAllTicket = async()=>{

  //   try {
  //     const response = await fetch('http://localhost:4000/api/getUserTickets', {
  //       method: "GET", // Changed to GET request
  //       headers: {
  //         'Accept': 'application/json', // Correct content type
  //         'auth-token': `${localStorage.getItem('auth-token')}`, // Add token from localStorage
  //       },
  //     });
  
  //     const data = await response.json();
  //     setAllTicket(data); // Set the user data
  //     console.log(data, "fetched users Tictes");
  //   } catch (error) {
  //     console.log("Error fetching user Tickets:", error);
  //   }

  // }

  // useEffect(()=>{
  //   if(localStorage.getItem('auth-token')){
  //     getAllTicket()
  //   } 
  // },[])
 

  const logout = ()=>{
    localStorage.removeItem('auth-token')
    props.toggle()
    fetchUser()
  }
  return (
    <>
    <div className="profile-container">
      <CgProfile id="icon-profile"/>
      <h2></h2>
      <span><h3>Name:</h3>&nbsp;&nbsp;&nbsp;<p>{fetchedUserData.name}</p></span>
      <span><h3>Age:</h3>&nbsp;&nbsp;&nbsp;<p>{fetchedUserData.age}</p></span>
      <span><h3>Phone:</h3> &nbsp;  &nbsp; <p>{fetchedUserData.phone}</p></span>
      <span><h3>Email:</h3>&nbsp;&nbsp;&nbsp;<p>{fetchedUserData.email}</p></span>
      <span><h3>Location:</h3> &nbsp;  &nbsp; <p>{fetchedUserData.location}</p></span>
      <div style={{display:"flex",alignItems:"center", justifyContent:"center", width:"100%"}}>
        <button className="cancel-tkt-btn">Edit</button>
        <button onClick={logout} className="cancel-tkt-btn">SignOut</button>
      </div>
    </div>
    <div>
      <h3>Tickets</h3>
      <div>
      </div>
    </div>
    </>
  )
}

export default Profile

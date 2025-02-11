import { createContext, useEffect } from "react";
import { useState } from "react";
import axios from 'axios'
export const AdminContext = createContext(null);





 
const AdminContextProvider = (props) => {
    
const [allTheater,setAllTheater] = useState([]) 
const [ownerTheater,setOwnerTheater] = useState([]) 

const [userData,setUserData] = useState({})
const [allTheaterOwners,setAllTheaterOwners] = useState([])
const [adminUser,setAdminUser] = useState([])



const getTheaterOwners = async()=>{
  try {
    const response = await axios.get('http://localhost:4000/api/alltheaterUser', {
      headers: {
        'auth-token': localStorage.getItem('auth-token') // Get the token from local storage
      }
    });

    console.log('Theater owners data fetched:', response.data.thaterOwners);
    
    // Check if the response indicates success
    if (response.data.success) {
      setAllTheaterOwners(response.data.thaterOwners); // Update state with user data
      // console.log(allTheaterOwners,"allTheaterOwners",response.data.thaterOwners)
    } else {
      console.log("Failed to fetch all Theater Owners.");
    }

  } catch (error) {
    console.error("Error fetching all Theater Owners:", error);
  }
}
; 


//get all admin users
const getAdminUser = async()=>{ 
  try {
    const response = await axios.get('http://localhost:4000/api/allAdmins', {
      headers: {
        'auth-token': localStorage.getItem('auth-token') // Get the token from local storage
      }
    });

    console.log('Theater owners data fetched:', response.data.thaterOwners);
    
    // Check if the response indicates success
    if (response.data.success) {
      setAdminUser(response.data.data); // Update state with user data
      console.log("all admin users",response.data.data)
    } else {
      console.log("Failed to fetch admin users.");
    }

  } catch (error) {
    console.error("Error fetching admin users :", error);
  } 
};

 
const getAllScreen = async()=>{
    axios.get("http://localhost:4000/api/screens")
    .then((response) => {
        setAllTheater(response.data);
    })
    .catch((error) => {
        console.error("There was an error fetching the Thater", error);
    }); 
}

const getOwnerScreen= async()=>{
  axios.get("http://localhost:4000/api/ownerscreens",{
    headers: {
      'auth-token': localStorage.getItem('auth-token') // Get the token from local storage
    }
  })
  .then((response) => {
    setOwnerTheater(response.data);
  })
  .catch((error) => {
      console.error("There was an error fetching the owner Thaters", error);
  }); 
}

const fetchUserData = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/adminUser', {
        headers: {
          'auth-token': localStorage.getItem('auth-token') // Get the token from local storage
        }
      });
  
      console.log('User data fetched:', response.data);
      
      // Check if the response indicates success
      if (response.data.success) {
        setUserData({ ...response.data.user }); // Update state with user data
      } else {
        console.log("Failed to fetch user data.");
      }
  
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  
useEffect(()=>{
   const token = localStorage.getItem('auth-token');
    getAllScreen();
    getOwnerScreen();
    getTheaterOwners();
    getAdminUser();

    if(token && !userData.role){
      fetchUserData()
    }    
      
},[userData.role])


//slectedthater handler and state
const[selectedTheater,setSlectedTheater] = useState({})
const handleSelectTheater = (e)=>{
    setSlectedTheater({...e})
 }



const[editModel,setEditModel] = useState(false)
const editModelToggler =()=>{
    setEditModel(!editModel)
}

const [editMovie, setEditMovie] = useState({});
 

   const contextValue = {adminUser,allTheaterOwners,ownerTheater,userData,setUserData,editModel,editModelToggler,allTheater,getAllScreen,editMovie, setEditMovie,selectedTheater,handleSelectTheater}
    return (
        <AdminContext.Provider value={contextValue}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider;
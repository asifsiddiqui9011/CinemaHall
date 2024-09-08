import { createContext, useEffect } from "react";
import { useState } from "react";
import axios from 'axios'

export const AdminContext = createContext(null);





 
const AdminContextProvider = (props) => {
    
const [allTheater,setAllTheater] = useState([]) 
const [userData,setUserData] = useState({})



 
const getAllScreen = async()=>{
    axios.get("http://localhost:4000/api/screens")
    .then((response) => {
        setAllTheater(response.data);
    })
    .catch((error) => {
        console.error("There was an error fetching the Thater", error);
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
    getAllScreen()
   
    fetchUserData()
    
     
      
},[])

function Authorization(email={...userData.email}) {
    const parts = email.split("@");
    if (parts.length === 2) {
      const domain = parts[1];
      return domain === "admin.com";
    }
    return false; // Invalid email format
  }


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
 

   const contextValue = {Authorization,userData,setUserData,editModel,editModelToggler,allTheater,getAllScreen,editMovie, setEditMovie,selectedTheater,handleSelectTheater}
    return (
        <AdminContext.Provider value={contextValue}>
            {props.children}
        </AdminContext.Provider>
    )
}

export default AdminContextProvider;
import { useState } from "react"
import axios from 'axios'
import { useContext } from "react"
import { AdminContext } from "../../Context/AdminContext"

const Signup = () => {

  const {allTheaterOwners,userData} = useContext(AdminContext)
  const [signupData,setSignupData] = useState ({
    
    username:"",
    email:"",
    phoneNumber:"",
    password:"",
    location:"",
    role:""

  })

  const changeHandler=(e)=>{
    setSignupData((prev)=>({...prev,[e.target.name]:e.target.value}))
  }

  const sign= async(event)=>{
    event.preventDefault()
    console.log(signupData,"signupdata")
    try {
      const response = await axios.post('http://localhost:4000/api/adminsignup', signupData);
      console.log('Signup successful:', response.data.success);
      if(response.data.success){
        allTheaterOwners.push(response.data.user);
        alert("User Registered Successfully")
      }
    
    } catch (error) {
      console.error('Signup error:', error);
    }
    
  }

  
  return (
    
      <div className="login-form-container signupform">
          <form  onSubmit={sign} className="login-form">
          <h2>Register Users<hr /></h2>
          <span>
              <p>Role: </p>
              <select name="role" id="role" className="login-input" value={signupData.role} onChange={changeHandler} required>
                <option value="">Select role</option>
                <option value="theater_owner">Theater owner</option>
                {userData.role === "superadmin" &&  <option value="admin">Admin</option>}
                {userData.role === "superadmin" && <option value="superadmin">superadmin</option>}
              </select>
            </span>
          <span>
              <p>FullName: </p>
              <input type="text" placeholder="Enter email" className="login-input" name="username" id="username" value={signupData.name} onChange={changeHandler} required />
            </span>
            <span>
              <p>Email: </p>
              <input type="email" placeholder="Enter email" className="login-input" name="email" id="email" value={signupData.email} onChange={changeHandler} required />
            </span>
           
            <span>
              <p>Mobile: </p>
              <input type="text" placeholder="Enter email" className="login-input" name="phoneNumber" id="phoneNumber" value={signupData.phone} onChange={changeHandler} required />
            </span>
            <span>
              <p>Location: </p>
              <input type="text" placeholder="enter location" className="login-input" name="location" id="location" value={signupData.location} onChange={changeHandler} required />
            </span>
            <span>
              <label >Password: </label>
              <input type="password" placeholder="enter password" className="login-input" name="password" id="password" value={signupData.password} onChange={changeHandler} required/>
            </span>
            <button type="submit">Register</button> 
          </form>
      </div>
  )
}

export default Signup

import { useState } from "react"
import axios from 'axios'

const Signup = (props) => {

  const [signupData,setSignupData] = useState ({
    
    username:"",
    email:"",
    phoneNumber:"",
    password:"",
    location:""

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
        localStorage.setItem('auth-token',response.data.token)
        props.toggle()
      }
    
    } catch (error) {
      console.error('Signup error:', error);
    }
    
  }

  
  return (
    <div className="login-container">
     
      <div className="login-img-container">
            <p>Already! have an account Click to <b onClick={props.login}>Login</b></p>
      </div>
      <div className="login-form-container">
        <h2>SignUp<hr /></h2>
          <form  onSubmit={sign} className="login-form">
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
            <button type="submit">Signup</button>
           
          </form>
      </div>
      
    </div>
  )
}

export default Signup

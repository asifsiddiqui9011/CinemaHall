import { useCallback, useContext, useState } from "react"
import "./Login.css"
import axios from "axios"
import { AdminContext } from "../../Context/AdminContext"

const Login = (props) => {
  
  const{userData,setUserData} = useContext(AdminContext)
  const [authData,setAuthData] = useState ({
   
    email:"",
    password:""
  })

  const changeHandler=(e)=>{
    setAuthData((prev)=>({...prev,[e.target.name]:e.target.value}))
  }

  


  const login=async (event)=>{
    event.preventDefault()
    try {
      const response = await axios.post('http://localhost:4000/api/adminlogin', authData);
      // console.log('Signup successful:', response.data);
      if(response.data.success){
        localStorage.setItem('auth-token',response.data.token)
        setUserData({...response.data.user})
        props.toggle()
      }
    } catch (error) {
      console.error('login error:', error);
    }
  }

  return (

    <div className="login-container">
     
      <div className="login-img-container">
          <p>Does not have an account <b>Contact to Admin</b></p>
      </div>
      <div className="login-form-container">
        <h2>Login  <hr /></h2>
          <form  onSubmit={login} className="login-form">
            <span>
              <p>Email: </p>
              <input type="text" placeholder="enter email" className="login-input" name="email" id="email" value={authData.email} onChange={changeHandler} required />
            </span>
            <span>
              <label >Password: </label>
              <input type="password" placeholder="enter password" className="login-input" name="password" id="password" value={authData.password} onChange={changeHandler} required/>
            </span>
            <span>
              <p>Forgot Password</p>
              <p>Signup</p>
            </span>
            <button type="submit">Login</button>
           
          </form>
      </div>
      
    </div>
  )
}

export default Login

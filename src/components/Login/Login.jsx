import { useState } from "react"
import "./Login.css"


const Login = (props) => {

  const [userData,setUserData] = useState ({
   
    email:"",
    password:""
  })

  const changeHandler=(e)=>{
    setUserData((prev)=>({...prev,[e.target.name]:e.target.value}))
  }

  


  const login=(event)=>{
    event.preventDefault()
    console.log(userData,"logindetails")
  }

  return (

    <div className="login-container">
     
      <div className="login-img-container">
          <img src={""} alt="" className="login-img" />
      </div>
      <div className="login-form-container">
        <h2>Login  <hr /></h2>
          <form  onSubmit={login} className="login-form">
            <span>
              <p>Email: </p>
              <input type="text" placeholder="enter email" name="email" id="email" value={userData.email} onChange={changeHandler} required />
            </span>
            <span>
              <label >Password: </label>
              <input type="password" placeholder="enter password" name="password" id="password" value={userData.password} onChange={changeHandler} required/>
            </span>
            <span>
              <p>Forgot Password</p>
              <p>Signup</p>
            </span>
            <button type="submit">Login</button>
            <p>Doesn't have an account Click to <b onClick={props.signup}>SignUp</b></p>
          </form>
      </div>
      
    </div>
  )
}

export default Login

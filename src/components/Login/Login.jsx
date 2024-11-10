import { useContext, useState } from "react"
import "./Login.css"
import { CinemaContext } from "../../Contex/CinemaContext"


const Login = (props) => {


  const{fetchUser,getAllTicket}=useContext(CinemaContext)

  const [userData,setUserdata] = useState ({
   
    email:"",
    password:""
  })

  const changeHandler=(e)=>{
    setUserdata((prev)=>({...prev,[e.target.name]:e.target.value}))
  }

  

  // Login function
  const login = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:4000/api/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData), // Convert the user data into a JSON string
      });

      const responseData = await response.json();
      console.log(responseData.success, "success");

      if (responseData.success) {
        localStorage.setItem('auth-token', responseData.token); // Save token in localStorage
        props.toggle(); // Assuming this toggles a modal or changes UI state
        fetchUser();
        getAllTicket();
      }
    } catch (error) {
      console.log(error, "error");
      alert(error.message || "Login failed");
    }
  };



  // const login= async (event)=>{
  //   event.preventDefault()
  //   try {
  //     let responseData;
	// 	await fetch('http://localhost:4000/api/login',{
	// 		method:'POST',
	// 		headers:{
	// 			Accept:'application/form-data',
	// 			'Content-Type':'application/json',
	// 		},
	// 		body:JSON.stringify(userData),
	// 	}).then((response)=>response.json()).then((data)=>responseData=data)
  //    console.log(responseData.success,"success")
	// 	if(responseData.success){
	// 		localStorage.setItem('auth-token',responseData.token);
  //     fecthUser();
	// 		props.toggle()
  //   }
  //   } catch (error) {
  //     console.log(error,"error")
  //     alert(error)
  //   }
		
  // }

  
    // fecthUser()
  

  return (

    <div className="login-container">
     
      <div className="login-img-container">
      <h2>Login  <hr /></h2>
      <p>Doesn't have an account Click to <b onClick={props.signup}>SignUp</b></p>      </div>
      <div className="login-form-container">
        {/* <h2>Login  <hr /></h2> */}
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
           
          </form>
      </div>
      
    </div>
  )
}

export default Login

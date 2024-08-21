import { useState } from "react"
import "./Login.css"

const Login = () => {

//   const [userData,setUserData] = useState ({
   
//     email:"",
//     password:""
//   })

//   const changeHandler=(e)=>{
//     setUserData((prev)=>({...prev,[e.target.name]:e.target.value}))
//   }

//   const login=(event)=>{
//     event.preventDefault()
//     console.log(userData,"logindetails")
//   }

  return (
    <div className="main_box">
      {/* <dialog className="dialog_box"> */}<h2>SignUp</h2>
        <form className="form-container">
          <input type="text"></input>
        </form>
      {/* </dialog> */}
    </div>

   );
}

export default Login
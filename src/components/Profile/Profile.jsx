import { useContext } from "react"
import "./Profile.css"
import { CgProfile } from "react-icons/cg";

const Profile = (props) => {

  // const{userData} = useContext(FinanceContext)
  // console.log(userData,"userdata")

  const logout = ()=>{
    localStorage.removeItem('auth-token')
    props.toggle()
  }
  return (
    <div className="profile-container">
      <CgProfile id="icon-profile"/>
      <h2></h2>
      <span><h3>Email:</h3>&nbsp;&nbsp;&nbsp;<p></p></span>
      <span><h3>Phone:</h3> &nbsp;  &nbsp; <p></p></span>
      <div>
        <button>Edit</button>
        <button onClick={logout}>SignOut</button>
      </div>
    </div>
  )
}

export default Profile

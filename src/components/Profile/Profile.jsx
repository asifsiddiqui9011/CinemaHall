import { useContext } from "react"
import "./Profile.css"
import { CgProfile } from "react-icons/cg";
import { AdminContext } from "../../Context/AdminContext";

const Profile = (props) => {

  const{userData} = useContext(AdminContext)


  const logout = ()=>{
    localStorage.removeItem('auth-token')
    props.toggle()
  }
  return (
    <div className="profile-container">
      <CgProfile id="icon-profile"/>
      <h2></h2>
      <span><h3>Email:</h3>&nbsp;&nbsp;&nbsp;<p>{userData.email}</p></span>
      <span><h3>Phone:</h3> &nbsp;  &nbsp; <p></p></span>
      <div>
        <button>Edit</button>
        <button onClick={logout}>SignOut</button>
      </div>
    </div>
  )
}

export default Profile

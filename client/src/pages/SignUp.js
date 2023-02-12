import './SignUp.css'
import NavBar from "../components/NavBar";

function SignUp() {
  // set the props for the NavBar
  let pages = ["Chat", "Login"];
  let settings = ["Profile", "Account", "Dashboard", "Logout"];

  return ( <div>
    <NavBar pages={pages} settings={settings}/>
<div class="container">
  <div class="registration-wrapper"></div>
  <div class="image-wrapper"></div>
</div>

  </div> );
}

export default SignUp;
// import axios from 'axios';
import NavBar from "../components/NavBar";
import { useState, useNavigate} from "react";
import { Grid, Box, Typography, Button } from "@mui/material";
import {
  TextField,
  FormControl,
  InputLabel,
  FilledInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff, PhotoCamera } from "@mui/icons-material";
import SignUpButton from "../components/RegisterButton";

function SignUp() {
  // set the props for the NavBar
  let pages = ["Chat", "Login"];
  let settings = ["Profile", "Account", "Dashboard", "Logout"];

  //  Handle show/hide password in the password form field
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

//   //variables for sign up functionality
//   const [email, setEmail] = useState("");
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   function  signUp() {
//   axios
//   .post("http://localhost:5000/auth/register", {username, email, password})
//   .then(({data}) => {
//     if (data.message === true) {
//       navigate("/auth/login");
//     } else {
//       alert(data.message);
//     }
//   })
// }

  return (
    <div>
      <NavBar pages={pages} settings={settings} />
      {/* SignUp Page Container */}
      <Grid container spacing={2}>
        {/* SignUp Form */}
        <Grid
          item
          xs={12}
          sm={6}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Heading and upload profile picture section */}
          <Typography variant="h5" component="h1" mt={2}>
            Create Account
          </Typography>
          <Box
            sx={{
              position: "relative",
              width: "8rem",
              height: "8rem",
              borderRadius: "50%",
              // "&:hover": {
              //   backgroundColor: "primary.main",
              //   opacity: [0.9, 0.8, 0.7],
              // },
            }}
          >
            <img src="https://pub-static.fotor.com/assets/projects/pages/d5bdd0513a0740a8a38752dbc32586d0/fotor-03d1a91a0cec4542927f53c87e0599f6.jpg" alt="upload a profile pic for your account"
            style={{ borderRadius: "50%" }}
            />
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="label"
              style={{ position: "absolute", bottom: "0", right: "0" }}
            >
              <input hidden accept="image/*" type="file" />
              <PhotoCamera />
            </IconButton>
          </Box>

          {/* Username and email fields */}
          <TextField
            sx={{ m: 1, width: "38ch" }}
            required
            variant="filled"
            id="filled-required"
            label="Username"
            defaultValue=""
          />
          <TextField
            sx={{ m: 1, width: "38ch" }}
            required
            variant="filled"
            id="filled-required"
            label="Email"
            defaultValue=""
          />
          {/* Password field */}
          <FormControl sx={{ m: 1, width: "38ch" }} variant="filled" required>
            <InputLabel htmlFor="filled-adornment-password">
              Password
            </InputLabel>
            <FilledInput
              id="filled-adornment-password"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          {/* Form Submit Button  */}
         <SignUpButton
         value="Sign Up"
         onClick= {()=> {alert("clicked")}} 
         />
        </Grid>
        {/* SignUp Page Background Image */}
        <Grid
          item
          xs={12}
          sm={6}
          mt={3}
          style={{
            height: "85vh",
            backgroundImage:
              'url("https://images.unsplash.com/photo-1491438590914-bc09fcaaf77a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fGNoYXR0aW5nfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=1400&q=60")',
            backgroundSize: "cover",
          }}
        ></Grid>
      </Grid>
    </div>
  );
}

export default SignUp;

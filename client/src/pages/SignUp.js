import axios from "axios";
import NavBar from "../components/NavBar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import profileImg from "../assets/sample.webp";

function SignUp() {
  // set the props for the NavBar
  let pages = [
    { text: 'Chat', href: '/chat' },
    { text: 'Login', href: '/login' }
  ];
  let settings = ["Profile", "Account", "Dashboard", "Logout"];

  //  Handle show/hide password in the password form field
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // Functionality and states of  the profile image the user uploads
  const [image, setImage] = useState("");
  const [upLoadingImage, setUpLoadingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);

  // Check if image to be uploaded is less than 1mb
  function validateImg(e) {
    const file = e.target.files[0];
    if (file.size >= 1048576) {
      alert("The max file size is 1mb");
    } else {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  }

  // Functionality for user sign up
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function signup() {
    axios
      .post("http://localhost:5000/auth/register", {
        username,
        email,
        password,
      })
      .then(({ data }) => {
        if (data.message === true) {
          navigate("/");
        } else {
          alert(data.message);
        }
      });
  }

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
            <img
              src={imagePreview || profileImg}
              alt="upload a profile pic for your account"
              style={{
                borderRadius: "50%",
                width: "8rem",
                height: "8rem",
                objectFit: "cover",
              }}
            />
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="label"
              style={{ position: "absolute", bottom: "0", right: "0" }}
            >
              <input
                hidden
                accept="image/*"
                type="file"
                onChange={validateImg}
              />
              <PhotoCamera />
            </IconButton>
          </Box>

          {/* Username field */}
          <TextField
            sx={{ m: 1, width: "38ch" }}
            required
            variant="filled"
            id="filled-required"
            label="Username"
            defaultValue=""
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />

          {/* Email field */}
          <TextField
            sx={{ m: 1, width: "38ch" }}
            required
            variant="filled"
            id="filled-required"
            label="Email"
            defaultValue=""
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />

          {/* Password field */}
          <FormControl sx={{ m: 1, width: "38ch" }} variant="filled" required>
            <InputLabel htmlFor="filled-adornment-password">
              Password
            </InputLabel>
            <FilledInput
              id="filled-adornment-password"
              type={showPassword ? "text" : "password"}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
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

          {/* Submit Button  */}
          <SignUpButton
            value="Sign Up"
            onClick={() => {
              signup();
            }}
          />
          <Typography variant="body1" mt={2}>
            Already have an account?
            <Button
              variant="text"
              color="secondary"
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </Button>
          </Typography>
        </Grid>

        {/* Background Image Section */}
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

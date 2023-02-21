import axios from "axios";
import NavBar from "../components/NavBar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Grid, Typography, Button } from "@mui/material";
import {
  TextField,
  FormControl,
  InputLabel,
  FilledInput,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import SignUpButton from "../components/RegisterButton";

function LogIn() {
  // set the props for the NavBar
  let pages = [
    { text: "Chat", href: "/chat" },
    { text: "Login", href: "/login" },
  ];
  let settings = ["Profile", "Account", "Dashboard", "Logout"];

  //  Handle show/hide password in the password form field
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // Functionality for user login
  const [username, setUsername] = useState("");
  // const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function login() {
    axios
      .post("http://localhost:5000/auth/login", {
        username,
        password,
      })
      .then(({ data }) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          navigate("/chat");
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
          {/* Username field */}
          <TextField
            sx={{ m: 1, width: "38ch" }}
            required
            variant="filled"
            id="username-login"
            label="Username"
            defaultValue=""
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />

          {/* Password field */}
          <FormControl sx={{ m: 1, width: "38ch" }} variant="filled" required>
            <InputLabel htmlFor="password-login">
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
            value="Log in"
            onClick={() => {
              login();
            }}
          />
          <Typography variant="body1" mt={2}>
            Don't have an account?
            <Button
              variant="text"
              color="secondary"
              onClick={() => {
                navigate("/register");
              }}
            >
              Register
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

export default LogIn;

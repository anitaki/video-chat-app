import NavBar from "../components/NavBar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import SendIcon from "@mui/icons-material/Send";
import { Grid, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();
  // Set the props values for the NavBar
  let pages = [
    { text: "Register", href: "/register" },
    { text: "Login", href: "/login" },
  ];
  let settings = [
    { text: "Profile", href: "#" },
    { text: "Chat", href: "/login" },
  ];

  return (
    <div>
      <NavBar pages={pages} settings={settings} />

      {/* Home Page  */}
      <Box
        sx={{
          flexGrow: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Home Page Heading, Text and Button */}
        <Grid container spacing={2}>
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
            <Typography
              variant="h3"
              component="h1"
              px={2}
              my={2}
              align="center"
              style={{ color: "#1b5e20" }}
            >
              Chatvine
            </Typography>
            <Typography
              variant="h4"
              component="h2"
              px={2}
              mb={2}
              align="center"
            >
              Your New Go-To Chat App!
            </Typography>
            <Typography variant="subtitle1" mb={3} px={2}>
              Stay connected with your loved ones anytime, anywhere{" "}
            </Typography>
            <Button
              onClick={() => {
                navigate("/register");
              }}
              variant="contained"
              color="warning"
              size="large"
              endIcon={<SendIcon />}
              style={{ width: "12rem", height: "3rem" }}
            >
              Get Started
            </Button>
          </Grid>

          {/* Home page photo section */}
          <Grid
            item
            xs={12}
            sm={6}
            mt={3}
            style={{
              height: "85vh",
              backgroundImage:
                'url("https://images.unsplash.com/photo-1633354931133-27ac1ee5d853?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8NTJ8fGNoYXR8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60")',
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default Landing;

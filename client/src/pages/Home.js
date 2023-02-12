import NavBar from "../components/NavBar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import SendIcon from "@mui/icons-material/Send";
import {Grid, Box} from "@mui/material";
import { useNavigate } from "react-router-dom";

function Landing() {
  const navigate = useNavigate();
  // Set the props values for the NavBar
  let pages = ["Chat", "Login"];
  let settings = ["Profile", "Account", "Dashboard", "Logout"];

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
          <Grid item
            xs={12}
            sm={6}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant="h2" component="h1" mb={2}>
              Heading
            </Typography>
            <Typography variant="subtitle1" mb={2}>
              Some text about the app{" "}
            </Typography>
            <Button
              onClick={() => {
                navigate("/register");
              }}
              variant="contained"
              color="success"
              size="medium"
              endIcon={<SendIcon />}
              style={{ width: "10rem" }}
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
                'url("https://images.unsplash.com/photo-1616587896649-79b16d8b173d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80")',
            }}
          ></Grid>
        </Grid>
      </Box>
    </div>
  );
}

export default Landing;

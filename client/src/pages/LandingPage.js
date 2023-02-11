import ResponsiveAppBar from "../components/AppBar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import SendIcon from '@mui/icons-material/Send';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

function Landing() {
  let pages = ["Chat", "Login"];
  let settings = ["Profile", "Account", "Dashboard", "Logout"];

  return (
    <div>
      <ResponsiveAppBar pages={pages} settings={settings} />
      <Box sx={{ flexGrow: 1, justifyContent: 'center' , alignItems: 'center' , color: "blue"}}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center"}}>
        <Typography variant="h2" mb={2}>
            Heading
          </Typography>
          <Typography variant="subtitle1" mb={2}>
            Some text about the app{" "}
          </Typography>
          <Button
            onClick={() => {
              alert("clicked");
            }}
            variant="contained"
            color="success"
            size="medium"
            endIcon={<SendIcon />}
            style={{width: "10rem"}}
          >
            Get Started
          </Button>
        </Grid>
        <Grid item xs={12} sm={6} style={{display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "90vh"}}>
        <img
            src="https://images.unsplash.com/photo-1616587896649-79b16d8b173d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
            alt=""
          />
        </Grid>
      </Grid>
    </Box>
          
    
          
        </div>
     
  );
}

export default Landing;

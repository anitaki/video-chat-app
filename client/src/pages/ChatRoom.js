import { io } from "socket.io-client";
import { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Sidebar from "../components/Sidebar";
import MessageBoard from "../components/MessageForm";
import { Grid, Container, Box } from "@mui/material";
import Typography from "@mui/material/Typography";

// create a socket and connect react with socket.io
const socket = io.connect("http://localhost:5000");

function App() {
  // Set the props values for the NavBar
  let pages = ["Chat", "Login"];
  let settings = ["Profile", "Account", "Dashboard", "Logout"];

  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");
  const [room, setRoom] = useState("");

  // listen to any changes coming from the socket
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message);
    });
  },[]);

  // send a message throught the socket to the back end with the room number the user entered
  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };

  // send a message through the socket, once the user clicks the send button
  const sendMessage = () => {
    socket.emit("send_message", { message, 
      // room 
    });
  };

  return (
    <div>
      <NavBar pages={pages} settings={settings} />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Sidebar />
        </Grid>
        <Grid item xs={12} sm={8}>
          <MessageBoard 
          onClick={()=> sendMessage()}
          children={<Typography>{messageReceived}</Typography>}
          onChange={(event) => {setMessage(event.target.value)}}
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default App;

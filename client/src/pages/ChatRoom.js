import * as React from 'react';
import { io, Socket } from "socket.io-client";
import axios from 'axios';
import { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Sidebar from "../components/Sidebar";
import MessageBoard from "../components/MessageForm";
import { Grid, Container, Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import { socketID, socket } from "../Socket";

function App() {
  socket.on("connect", () => {
    setMessageReceived(`You connected with id ${socketID}`);
  });

  // NavBar Variables
  let pages = [
    { text: "Chat", href: "/chat" },
    { text: "Login", href: "/login" },
  ];
  
  let settings = ["Profile", "Account", "Dashboard", "Logout"];

  // Room Variables
  const [room, setRoom] = useState("");

  const handleListItemClick = (event, idx, chatroom) => {
    setRoom(room)
    console.log(room);
  };


  // Chat Variables
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");
  // const [room, setRoom] = useState("");
  const [connectedUser, setConnectedUser] = useState({
    username: "",
    imageUrl: "",
  });

  // log authenticated users
  // useEffect(()=>{
  //   if (localStorage.getItem("token")) {
  //     axios
  //       .post("http://localhost:5000/auth/verify", {
  //         token: localStorage.getItem("token"),
  //       })
  //       .then(({ data }) => {
  //         setConnectedUser(data);
  //         console.log(connectedUser)
  //       });
  //   }
  // }, []);

  // listen to any changes coming from the socket
  useEffect(() => { 
  socket.on(
    "receive_message",
    (data) => {
      setMessageReceived(data.message);
    },
    [socket]
  );
  });



  // send a message throught the socket to the back end with the room number the user entered
  const joinRoom = () => {
    if (room !== "") {
      // socket.emit("join_room", room);
      alert(room)
    }
  };

  // send a message through the socket, once the user clicks the send button
  const sendMessage = () => {
    axios.post('http://localhost:5000/post', {
      message:"hi", 
      sender: socketID,
    })
    .then(
      socket.emit("send_message", {
        message,
        // room
      })
    )  
  };

  
  return (
    <div>
      <NavBar pages={pages} settings={settings} />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Sidebar         
             />
        </Grid>
        <Grid item xs={12} sm={8}>
          <MessageBoard
            onClick={() => sendMessage()}
            children={<Typography>{messageReceived}</Typography>}
            onChange={(event) => {
            setMessage(event.target.value); 
            }}
          />
          {/* <div>{messageReceived}</div>
          <input onChange={(event) => {
              setMessage(event.target.value);
            }}></input>
            <button onClick={() => sendMessage()}>Send</button> */}
        </Grid>
      </Grid>
    </div>
  );
}

export default App;

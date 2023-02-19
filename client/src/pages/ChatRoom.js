import * as React from "react";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import Sidebar from "../components/Sidebar";
import MessageBoard from "../components/MessageForm";
import Message from "../components/Message"
import { Grid } from "@mui/material";
import Typography from "@mui/material/Typography";
import { socketID, socket } from "../Socket";

function App() {
  socket.on("connect", () => {
    setMessageReceived(`You connected with id ${socketID}`);
  });

  // -------- VARIABLES -------

  const navigate = useNavigate();

  // -- NavBar Variables --
  let pages = [
    { text: "Chat", href: "/chat" },
    { text: "Login", href: "/login" },
  ];
  let settings = ["Profile", "Account", "Dashboard", "Logout"];

  // -- Room Variables --
  const [room, setRoom] = useState("");

  const handleListItemClick = (event, idx, chatroom) => {
    setRoom(room);
    console.log(room);
  };

  // -- Chat Variables --
  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");
  // const [room, setRoom] = useState("");
  const [connectedUser, setConnectedUser] = useState({
    id: "",
    username: "",
    // picture: "",
  });
  const chatEndRef = useRef(null);

  // -------- HOOKS  -------

  // Show chat only to authenticated users
  useEffect(() => {
    // authenticate the user and get the token from localstorage
    if (localStorage.getItem("token")) {
      axios
        .post("http://localhost:5000/auth/verify", {
          token: localStorage.getItem("token"),
        })
        .then(({ data }) => {
          console.log(data);
          setConnectedUser({ id: data._id, username: data.username });
        })
        // get the messages for the authenticated user to display the chat
        .then(
          axios.get("http://localhost:5000/chat/")
          .then(({data}) => {
            setChat(data)
          }))
    // if the user is not authenticated redirect to home page
    } else {
     navigate('/');
    }
  }, []);

  // listen to any changes coming from the socket
  useEffect(() => {
    socket.on(
      "receive_message",
      (data) => {
        setMessageReceived(data.message);
        scrollToBottom();
      },
      [socket]
    );
  });

  // -------- FUNCTIONS  -------

  // send a message throught the socket to the back end with the room number the user entered
  const joinRoom = () => {
    if (room !== "") {
      // socket.emit("join_room", room);
      alert(room);
    }
  };

  // send a message through the socket, once the user clicks the send button
  const sendMessage = () => {
    axios
      .post("http://localhost:5000/chat/post", {
        message,
        sender: connectedUser.id,
      })
      .then(
        socket.emit("send_message", {
          message,
          // room
        })
      );
  };

  // To be used to scroll to bottom of the page when new messages arrive
  function scrollToBottom() {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  // -------- RETURN STATEMENT  -------

  return (
    <div>
      <NavBar pages={pages} settings={settings} />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Sidebar />
        </Grid>
        <Grid item xs={12} sm={8}>
          <MessageBoard
            onClick={() => sendMessage()}
            children={
             < Message 
             chat={chat}
             messageReceived = {messageReceived}
             connectedUser = {connectedUser}
             />
              }
            onChange={(event) => {
              setMessage(event.target.value);
            }}
          />
          {/* <div>{messageReceived}</div>
          <input onChange={(event) => {
              setMessage(event.target.value);
            }}></input>
            <button onClick={() => sendMessage()}>Send</button> */}
          <button
            onClick={() => {
              console.log(connectedUser, message);
              console.log(chat);
            }}
          >
            User
          </button>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;

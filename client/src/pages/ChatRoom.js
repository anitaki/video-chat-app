import * as React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import Sidebar from "../components/Sidebar";
import MessageBoard from "../components/MessageForm";
import Message from "../components/Message";
import { Grid } from "@mui/material";
import { socketID, socket } from "../Socket";

function App() {
  // -------- VARIABLES -------

  const navigate = useNavigate();

  // -- NavBar Variables --
  let pages = [
    { text: "Chat", href: "/chat" },
    { text: "Logout", href: "/logout" },
  ];
  let settings = ["Profile", "Account", "Dashboard", "Logout"];

  // // -- Room Variables --
  // const [room, setRoom] = useState("");

  // const handleListItemClick = (event, idx, chatroom) => {
  //   setRoom(room);
  //   console.log(room);
  // };

  // -- Chat Variables --
  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");
  const [users, setUsers] = useState([]);
  const [connectedUser, setConnectedUser] = useState({
    id: "",
    username: "",
    picture: "",
  });

  socket.on("connect", () => {
    setMessageReceived(`You are connected with id ${socketID}`);
  });



  // -------- HOOKS  -------

  // get the list of online users from socket.io

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
          setConnectedUser({
            id: data._id,
            username: data.username,
            picture: data.picture,
          });
        })
        // get the messages for the authenticated user to display the chat
        .then(getChat());
      // if the user is not authenticated redirect to home page
    } else {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    socket.on("newUserResponse", (users) => setUsers(users));
  }, [messageReceived]);

  // listen to any changes coming from the socket
  useEffect(() => {
    socket.on(
      "receive_message",
      (data) => {
        setMessageReceived(data.message);
      },
      [socket]
    );
    getChat();
  }, [messageReceived]);

  // -------- FUNCTIONS  -------

  // // send a message throught the socket to the back end with the room number the user entered
  // const joinRoom = () => {
  //   if (room !== "") {
  //     socket.emit("join_room", room);
  //     alert(room);
  //   }
  // };

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

  // Function to get the chat from the db
  const getChat = () => {
    axios.get("http://localhost:5000/chat/").then(({ data }) => {
      setChat(data);
    });
  };

    // Handle the click of a user to a connected user  
    function handleUserClick(userId) {
      socket.emit("start_private_room", userId)
    }

  // -------- RETURN STATEMENT  -------

  return (
    <div>
      <NavBar
        pages={pages}
        settings={settings}
        picture={connectedUser.picture}
      />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Sidebar users={users} handleUserClick={handleUserClick} />
        </Grid>
        <Grid item xs={12} sm={8}>
          <MessageBoard
            onClick={() => sendMessage()}
            children={
              <Message
                chat={chat}
                messageReceived={messageReceived}
                connectedUser={connectedUser}
                picture={connectedUser.picture}
              />
            }
            picture={connectedUser.picture}
            onChange={(event) => {
              setMessage(event.target.value);
            }}
            connectedUser={connectedUser}
          />
          {users.map((user) => {
            return <p>{user.username}</p>;
          })}
          <button
            onClick={() => {
              console.log(connectedUser, message);
              console.table(users[0][0]);
              console.table(users[0][1]);
              // console.log(users[0][0].username);
            }}
          >
            user
          </button>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;

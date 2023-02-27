import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import Sidebar from "../components/Sidebar";
import MessageBoard from "../components/MessageForm";
import Message from "../components/Message";
import PrivateMessage from "../components/PrivateMessage";
import PrivateChatRoom from "../components/PrivateChatRoom";
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
  let settings = ["Profile",  "Logout"];

  // -- Room Variables --
  const [room, setRoom] = useState(null);

  // -- Chat Variables --
  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");
  const [privateMessageReceived, setPrivateMessageReceived] = useState("");
  const [users, setUsers] = useState([]);
  const [connectedUser, setConnectedUser] = useState({
    id: "",
    username: "",
    picture: "",
  });
  const [selectedUser, setSelectedUser] = useState(null);

  socket.on("connect", () => {
    setMessageReceived(`You are connected with id ${socketID}`);
  });

  // -------- HOOKS  -------



  // *** Show chat only to authenticated users
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
      // if the user is not authenticated redirect to home page
    } else {
      navigate("/login");
    }
    // get the messages for the authenticated user to display the chat
    getChat();
  }, []);


   // *** get the list of online users from socket.io
  useEffect(() => {
    socket.on("newUserResponse", (users) => setUsers(users));
  }, [messageReceived]);

  // *** listen to general and private messages coming from the socket
  useEffect(() => {
    socket.on(
      "receive_message",
      (data) => {
        setMessageReceived(data.message);
      }
    );
    socket.on(
          "receive_private_message",
          (data) => {
            setMessageReceived(data.message);
          }
          );
    getChat();
  }, [messageReceived]);

  // useEffect(() => {
  //   socket.on(
  //     "receive_private_message",
  //     (data) => {
  //       setPrivateMessageReceived(data);
  //     },
  //     [socket]
  //   );
  //   getChat();
  // },[socket]);

  // listen for message to join private chat room
  useEffect(() => {
    socket.on("join_room", (roomName) => {
      setRoom(roomName);
    });
  }, [room]);

  // useEffect(( )=> {
  //  getChat()

  // }, [selectedUser, room])

  // -------- FUNCTIONS  -------

  const handleLeaveRoom = (event) => {
    socket.emit("leave_room", room);
    setRoom(null);
    setSelectedUser(null)
  };

  // send a message through the socket, once the user clicks the send button
  const sendMessage = () => {
    axios
      .post("http://localhost:5000/chat/post", {
        message,
        sender: connectedUser.id,
      })
      .then(() =>
        socket.emit("send_message", {
          message,
        })
      );
    setMessage("");
  };

  // send a message through the socket, once the user clicks the send button
  const sendPrivateMessage = () => {
    // console.log("connected user id: " + connectedUser.id);
    // console.log("selectedUser: " + selectedUser);
    // console.log("message " + message);
    // console.log("room " + room);
    axios
      .post("http://localhost:5000/chat/post", {
        message,
        sender: connectedUser.id,
        receiver: selectedUser,
        room,
      })
      .then(() => {
        socket.emit("send_private_message", {
          message,
          sender: connectedUser.id,
          room,
        })
      });
    setMessage("");
  };

  // Function to get the chat from the db
  const getChat = () => {
    axios.get("http://localhost:5000/chat/").then(({ data }) => {
      setChat(data);
    });
  };

  // At the sidebar, handle the click of a user to another online user to send private message
  function handleUserClick(userId) {
    setSelectedUser(userId);
    socket.emit("start_private_room", userId, connectedUser);
  }
  

  // -------- RETURN STATEMENT  -------

  return (
    <div>
      {/* NavBar component */}
      <NavBar
        pages={pages}
        settings={settings}
        picture={connectedUser.picture}
      />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Sidebar users={users} handleUserClick={handleUserClick} handleLeaveRoom={handleLeaveRoom} />
        </Grid>
        <Grid item xs={12} sm={8}>
          {/* Display the private chat if a user is selected */}
          {selectedUser && (
            <PrivateChatRoom
              picture={connectedUser.picture}
              selectedUser={selectedUser}
              onChange={(event) => {
                setMessage(event.target.value);
              }}
              onClick={() => sendPrivateMessage()}
              children={
                <PrivateMessage
                  chat={chat}
                  messageReceived={messageReceived}
                  connectedUser={connectedUser}
                  selectedUser={selectedUser}
                  picture={connectedUser.picture}
                />
              }
            />
          )}
          {/* Display the general chat if a user is not selected */}
          {!selectedUser && (
            <MessageBoard
              onClick={() => sendMessage()}
              picture={connectedUser.picture}
              onChange={(event) => {
                setMessage(event.target.value);
              }}
              connectedUser={connectedUser}
            >
              <Message
                chat={chat}
                messageReceived={messageReceived}
                connectedUser={connectedUser}
                picture={connectedUser.picture}
              />
            </MessageBoard>
          )}
          <button
            onClick={() => {
              console.log(connectedUser, messageReceived);
              console.log("selected User: " + selectedUser);
              console.log("private message" + privateMessageReceived);


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

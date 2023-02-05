import "./App.css";
import io from "socket.io-client";
import { useState, useEffect } from "react";
import Message from "./components/Message";
import Rooms from "./components/Rooms";

// create a socket and connect react with socket.io
const socket = io.connect("http://localhost:5000");

function App() {
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");
  const [room, setRoom] = useState("");

  // listen to any changes coming from the socket
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message);
    });
  }, [socket]);

  // send a message throught the socket to the back end with the room number the user entered
  const joinRoom = () => {
    if(room !== ""){
    socket.emit("join_room", room );
    }
  };

  // send a message through the socket, once the user clicks the send button
  const sendMessage = () => {
    socket.emit("send_message", { message, room });
  };

  return (
    <div style={{ width: "50%", margin: "3rem auto" }}>
      <Rooms
        onChange={(event) => {
          setRoom(event.target.value);
        }}
        onClick={() => {
          joinRoom();
        }}
      />
      <Message
        onChange={(event) => {
          setMessage(event.target.value);
        }}
        onClick={() => {
          sendMessage();
        }}
        children={<p>{messageReceived}</p>}
      />
    </div>
  );
}

export default App;

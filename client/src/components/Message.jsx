import React from "react";
import Moment from "react-moment";
import { Typography, Box } from "@mui/material";

function Message({ chat, messageReceived, connectedUser }) {


  return (
      <Typography>
              {chat.map((message) => {         
            return (
              <Box sx={{
                display:"flex",
                flexDirection: "column",
                flexWrap: "wrap",
                width: "20vw",
                my:1,
                ml:2,
                p:1,
                backgroundColor: 'lightblue',
                borderRadius: "10px",
              }}>
              <p>{message?.sender?._id === connectedUser.id ? "You" : message?.sender?.username }</p>
              <p>{message.message}</p>      
              <p>{<Moment format="DD/MM/YYYY HH:mm">{message.createdAt}</Moment>}</p>
             </Box >
                )
              })}
              {messageReceived}
              </Typography>
  );
}

export default Message;

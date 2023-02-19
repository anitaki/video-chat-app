import React from "react";
import { Typography, Box } from "@mui/material";

function Message({ chat, messageReceived }) {
  
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
              <p>{message?.sender?.username}</p>
              <p>{message.message}</p>      
              <p>{message.createdAt}</p>   
             </Box >
                )
              })}
              {messageReceived}
              </Typography>
  );
}

export default Message;

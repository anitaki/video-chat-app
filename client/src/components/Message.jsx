import React from "react";
import Moment from "react-moment";
import { Typography, Container, Box } from "@mui/material";

function Message({ chat, messageReceived, connectedUser }) {
  return (
    <Typography>
      <Container sx={{ display: "flex", flexDirection: "column" }}>
        {chat.map((message) => {
          if (message?.sender?._id === connectedUser.id) {
            return (
              <Box
                key={message._id}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  flexWrap: "wrap",
                  width: "23vw",
                  my: 1,
                  p: 1,
                  backgroundColor: "lightblue",
                  borderRadius: "10px",
                }}
              >
                <p>You:</p>
                <p>{message.message}</p>
                <p>
                  {
                    <Moment format="DD/MM/YYYY HH:mm">
                      {message.createdAt}
                    </Moment>
                  }
                </p>
              </Box>
            );
          } else {
            return (
              <Box
              key={message._id}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  flexWrap: "wrap",
                  alignSelf: "flex-end",
                  width: "23vw",
                  my: 1,
                  p: 1,
                  backgroundColor: "lightpink",
                  borderRadius: "10px",
                }}
              >
                <p>{message?.sender?.username}:</p>
                <p>{message.message}</p>
                <p>
                  {
                    <Moment format="DD/MM/YYYY HH:mm">
                      {message.createdAt}
                    </Moment>
                  }
                </p>
              </Box>
            );
          }
        })}
      </Container>
      {/* {messageReceived} */}
    </Typography>
  );
}

export default Message;

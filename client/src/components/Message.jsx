import React from "react";
import axios from "axios";
import Moment from "react-moment";
import { Typography, Container, Box, IconButton } from "@mui/material";
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';

function Message({ chat, connectedUser, onClick}) {

   // Function to delete one of your chat messages from the db
   const deleteMessage = (id) => {
    axios.delete("http://localhost:5000/chat/" + id)
    window.location.reload(true);
  };

  return (
    <Typography>
      <Container sx={{ display: "flex", flexDirection: "column" }}>
        {chat.map((chatmessage) => {
          if (chatmessage?.sender?._id === connectedUser.id) {
            return (
              <Box
                key={chatmessage._id}
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  width: "23vw",
                  my: 1,
                  p: 1,
                  backgroundColor: "lightblue",
                  borderRadius: "10px",
                }}
              >
                 <Box>
                <p>You:</p>
                <p>{chatmessage.message}</p>
                <p>
                  {
                    <Moment format="DD/MM/YYYY HH:mm">
                      {chatmessage.createdAt}
                    </Moment>
                  }
                </p>
                </Box>
                <IconButton onClick={()=>{deleteMessage(chatmessage._id)}} aria-label="Delete message">
                <DeleteOutlineOutlinedIcon style={{alignSelf: "center"}} />
                </IconButton>
              </Box>
            );
          } else {
            return (
              <Box
              key={chatmessage._id}
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
                <p>{chatmessage?.sender?.username}:</p>
                <p>{chatmessage.message}</p>
                <p>
                  {
                    <Moment format="DD/MM/YYYY HH:mm">
                      {chatmessage.createdAt}
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

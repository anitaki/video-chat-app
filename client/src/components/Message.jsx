import React from "react";
import axios from "axios";
import Moment from "react-moment";
import {
  Typography,
  Container,
  Box,
  IconButton,
  Paper,
  Avatar,
} from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import "../pages/test.css";
import profileImg from "../assets/sample.webp";

function Message({ chat, connectedUser, onClick, picture }) {
  // Function to delete one of your chat messages from the db
  const deleteMessage = (id) => {
    axios.delete("http://localhost:5000/chat/" + id);
    window.location.reload(true);
  };

  return (
    <Typography>
      <Container sx={{ display: "flex", flexDirection: "column" }}>
        {chat.map((chatmessage) => {
          if (chatmessage?.sender?._id === connectedUser.id) {
            return (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Avatar
                  alt="Profile picture with menu"
                  src={picture || profileImg}
                  style={{ width: "3.5rem", height: "3.5rem" }}
                />
                <Paper
                  key={chatmessage._id}
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    width: "55%",
                    ml: 1,
                    my: 1,
                    p: 1,
                    backgroundColor: "#F5F6F7",
                    borderRadius: "30px",
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      height: "2rem",
                      px: 2,
                    }}
                  >
                    <Typography style={{ fontWeight: "bold" }}>You</Typography>
                    <Box
                      sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                      }}
                    >
                      <AccessTimeIcon
                        style={{ width: "1rem", marginRight: ".2rem" }}
                      />
                      <Typography>
                        {<Moment fromNow>{chatmessage.createdAt}</Moment>}
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      px: 1,
                      py: 2,
                    }}
                    style={{ borderTop: ".5px solid lightgrey" }}
                  >
                    <Typography>{chatmessage.message}</Typography>

                    <IconButton
                      onClick={() => {
                        deleteMessage(chatmessage._id);
                      }}
                      aria-label="Delete message"
                    >
                      <DeleteOutlineOutlinedIcon
                        style={{ alignSelf: "center" }}
                      />
                    </IconButton>
                  </Box>
                </Paper>
              </Box>
            );
          } else {
            return (
              // <Paper
              //   key={chatmessage._id}
              //   sx={{
              //     display: "flex",
              //     flexDirection: "column",
              //     flexWrap: "wrap",
              //     alignSelf: "flex-end",
              //     width: "23vw",
              //     my: 1,
              //     p: 1,
              //     // backgroundColor: "#E4A11B",
              //     backgroundColor: "#8bc34a",
              //     borderRadius: "10px",
              //   }}
              // >
              //   <p>{chatmessage?.sender?.username}:</p>
              //   <p>{chatmessage.message}</p>
              //   <p>
              //     {
              //       <Moment format="DD/MM/YYYY HH:mm">
              //         {chatmessage.createdAt}
              //       </Moment>
              //     }
              //   </p>
              // </Paper>


<Box sx={{ display: "flex", alignItems: "center", justifyContent: "flex-end" }}>

              <Paper
                  key={chatmessage._id}
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    alignSelf: "flex-end",
                    flexWrap: "wrap",
                    width: "55%",
                    mr: 1,
                    my: 1,
                    p: 1,
                    backgroundColor: "#8bc34a",
                    borderRadius: "30px",
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      height: "2rem",
                      px: 2,
                    }}
                  >
                    <Typography style={{ fontWeight: "bold" }}>{chatmessage?.sender?.username}</Typography>
                    <Box
                      sx={{
                        width: "100%",
                        display: "flex",
                        justifyContent: "flex-end",
                        alignItems: "center",
                      }}
                    >
                      <AccessTimeIcon
                        style={{ width: "1rem", marginRight: ".2rem" }}
                      />
                      <Typography>
                        {<Moment fromNow>{chatmessage.createdAt}</Moment>}
                      </Typography>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      width: "100%",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      px: 1,
                      py: 2,
                    }}
                    style={{ borderTop: ".5px solid lightgrey" }}
                  >
                    <Typography>{chatmessage.message}</Typography>

                    <IconButton
                      onClick={() => {
                        deleteMessage(chatmessage._id);
                      }}
                      aria-label="Delete message"
                    >
                      <DeleteOutlineOutlinedIcon
                        style={{ alignSelf: "center" }}
                      />
                    </IconButton>
                  </Box>
                </Paper>
                <Avatar
                  alt="Profile picture with menu"
                  src={ picture || profileImg}
                  style={{ width: "3.5rem", height: "3.5rem" }}
                />
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

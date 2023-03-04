// import * as React from 'react';
import {
  Box,
  Container,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemButton,
  Divider,
} from "@mui/material";
import "../pages/test.css";
import { socket } from "../Socket";
import BadgeOnlineAvatars from "./AvatarOnlineBadge";
import BadgeOfflineAvatars from "./AvatarOfflineBadge";

// Sidebar will display available rooms and online users

function Sidebar({ users, allUsers, handleUserClick, handleLeaveRoom, chat }) {
  let rooms = ["General Chat"];
  const offlineUsers = getOfflineUsers(users, allUsers);
  
  const filteredMessages = chat
  .filter((chatmessage) => !chatmessage?.receiver?._id)
 



  function getOfflineUsers(users, allUsers) {
    const onlineUserIds = users.map((user) => user[0]._id);
    const offlineUsers = allUsers.filter(
      (user) => !onlineUserIds.includes(user._id)
    );
    return offlineUsers;
  }

  function getOfflineUsersLastMessage(offlineUsers, chat, user_id) {
  console.log(offlineUsers)
  const offlineUsersIds = offlineUsers.map((user) => user._id)
  console.log(offlineUsersIds)
  const filteredMessages = chat
  .filter((chatmessage) => !chatmessage?.receiver?._id)
  .filter((message)=> offlineUsersIds.includes(user_id))
  .sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt))
  console.log(filteredMessages)
  const lastOfflineMessage = filteredMessages[0]
  console.log(lastOfflineMessage)
  return lastOfflineMessage;

  }

 



  return (
    <Container pl={5}>
      <Box mt={3}>
        {/* Available Rooms section */}
        <Typography variant="h5" component="h2" mb={0}>
          Available Rooms
        </Typography>
        {/* <Rooms/> */}
        <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
          <List component="nav" aria-label="secondary mailbox folder">
            {rooms.map((room) => {
              return (
                <ListItemButton
                  key={room}
                  onClick={(event) => handleLeaveRoom(event)}
                >
                  <ListItemText primary={room} />
                </ListItemButton>
              );
            })}
          </List>
          <Divider />
        </Box>
      </Box>
      {/* Online members section */}
      <Box
        sx={{
          overflowY: "scroll",
          overflowX: "none",
          maxHeight: "70vh",
        }}
      >
        <List mt={0}>
          {users.map((user) => {
            return (
              <ListItem key={user[0]._id}>
                <ListItemAvatar>
                  <BadgeOnlineAvatars
                    src={user[0].picture}
                    alt={user[0].username}
                  />
                </ListItemAvatar>
                <ListItemButton onClick={() => handleUserClick(user[0])}>
                  <ListItemText
                    primary={user[0].username}
                    secondary={"hi"}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
          {/* Offline members section */}
          {offlineUsers.map((user) => {
          const lastUserMessage = filteredMessages
         .sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt) )
         .find((message) => message.sender && message.sender._id === user._id)
           console.log(lastUserMessage);
    

         
            return (
              <ListItem key={user._id}>
                <ListItemAvatar>
                  <BadgeOfflineAvatars src={user.picture} alt={user.username} />
                </ListItemAvatar>
                <ListItemButton onClick={() => handleUserClick(user)}>
                  <ListItemText
                    primary={user.username}
                    secondary={ lastUserMessage ? lastUserMessage.message : "" }
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
        {/* <Typography variant="h5" component="h2" mb={2}>
          Members
        </Typography>
        {users.map((user) => {
          return <Typography key={user}>{user[0].username}</Typography>;
        })} */}
      </Box>
    </Container>
  );
}

export default Sidebar;

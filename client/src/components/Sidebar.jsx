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

function Sidebar({ users, allUsers, handleUserClick, handleLeaveRoom }) {
  let rooms = ["General Chat"];
  const offlineUsers = getOfflineUsers(users, allUsers);
 
  function getOfflineUsers(users, allUsers) {
    const onlineUserIds = users.map(user => user[0]._id);
    const offlineUsers = allUsers.filter(user => !onlineUserIds.includes(user._id));
    return offlineUsers;
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
                  <BadgeOnlineAvatars src={user[0].picture} alt={user[0].username}/>
                </ListItemAvatar>
                <ListItemButton onClick={() => handleUserClick(user[0])}>
                  <ListItemText
                    primary={user[0].username}
                    // secondary={secondary ? 'Secondary text' : null}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}  
        {/* Offline members section */}     
          {offlineUsers.map((user) => {
            return (
              <ListItem key={user._id}>
                <ListItemAvatar>
                  <BadgeOfflineAvatars src={user.picture} alt={user.username}/>
                </ListItemAvatar>
                <ListItemButton onClick={() => handleUserClick(user)}>
                  <ListItemText
                    primary={user.username}
                    // secondary={secondary ? 'Secondary text' : null}
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

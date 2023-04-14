// import * as React from 'react';
import {
  Box,
  Container,
  Typography,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemButton,
  Divider,
} from "@mui/material";
import "../pages/test.css";
import { socket } from "../Socket";
import BadgeOnlineAvatars from "./AvatarOnlineBadge";
import BadgeOfflineAvatars from "./AvatarOfflineBadge";
import Moment from "moment";

// Sidebar will display available rooms and online users
function Sidebar({ users, allUsers, handleUserClick, handleLeaveRoom, chat }) {
  let rooms = ["General Chat"];
  const offlineUsers = getOfflineUsers(users, allUsers);

  // Get the user messages that appear only in the general chat. There is no receiver id in db
  const filteredMessages = chat.filter(
    (chatmessage) => !chatmessage?.receiver?._id
  );

  // filter the online users id in the users array from all users in the allUsers array to get only the offline users
  function getOfflineUsers(users, allUsers) {
    const onlineUserIds = users.map((user) => user[0]._id);
    const offlineUsers = allUsers.filter(
      (user) => !onlineUserIds.includes(user._id)
    );
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
            // sort the online users messages in the general chat and get the last one chronologically
            const lastOnlineUserMessage = function () {
              if (filteredMessages) {
                filteredMessages
                  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                  .find(
                    (message) =>
                      message.sender._id && message.sender._id === user[0]._id
                  );
              }
            };
            // return the list of online users
            return (
              <ListItem key={user[0]._id}>
                {/* Online users Avatar */}
                <ListItemAvatar>
                  <BadgeOnlineAvatars
                    src={user[0].picture}
                    alt={user[0].username}
                  />
                </ListItemAvatar>
                {/* Online users text */}
                <ListItemButton onClick={() => handleUserClick(user[0])}>
                  <ListItemText
                    primary={
                      <Box display="flex" justifyContent="space-between">
                        <span>{user[0].username}</span>
                        {/* <span style={{ color: "darkgrey", fontSize: ".9rem" }}>
                          {lastOnlineUserMessage &&
                            Moment(lastOnlineUserMessage.createdAt).fromNow()}
                        </span> */}
                      </Box>
                    }
                    secondary={
                      lastOnlineUserMessage ? lastOnlineUserMessage.message : ""
                    }
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
          {/* Offline members section */}
          {offlineUsers.map((user) => {
            // sort the online users messages in the general chat and get the last one chronologically
            const lastOfflineUserMessage = filteredMessages
              .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
              .find(
                (message) => message.sender && message.sender._id === user._id
              );
            console.log(lastOfflineUserMessage);
            return (
              <ListItem key={user._id}>
                {/* Offline users Avatar */}
                <ListItemAvatar>
                  <BadgeOfflineAvatars src={user.picture} alt={user.username} />
                </ListItemAvatar>
                {/* Online users text */}
                <ListItemButton onClick={() => handleUserClick(user)}>
                  <ListItemText
                    primary={
                      <Box display="flex" justifyContent="space-between">
                        <span>{user.username}</span>
                        <span style={{ color: "darkgrey", fontSize: ".9rem" }}>
                          {lastOfflineUserMessage &&
                            Moment(lastOfflineUserMessage.createdAt).fromNow()}
                        </span>
                      </Box>
                    }
                    secondary={
                      lastOfflineUserMessage
                        ? lastOfflineUserMessage.message
                        : ""
                    }
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Box>
    </Container>
  );
}

export default Sidebar;

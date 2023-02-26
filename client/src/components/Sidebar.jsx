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
} from "@mui/material";
import Rooms from "./Rooms";
import "../pages/test.css";
import { socket } from "../Socket";

// Sidebar will display available rooms and online users

function Sidebar({ room, users, handleUserClick }) {
  // let rooms = ["first room", "second room", "third room"];
  // const [selectedIndex, setSelectedIndex] = React.useState(1);
  // const handleListItemClick = (event, index) => {
  //   setSelectedIndex(index);
  // };

  return (
    <Container pl={5}>
      <Box mt={5}>
        {/* Available Rooms section */}
        <Typography variant="h5" component="h2" mb={2}>
          Available Rooms
        </Typography>
        <Rooms />
      </Box>

      {/* Online members section */}
      <Box mt={5}>
        <List>
          {users.map((user) => {
            return (
              <ListItem key={user[0]._id}>
                <ListItemAvatar>
                  <Avatar src={user[0].picture} />
                </ListItemAvatar>
                <ListItemButton onClick={() => handleUserClick(user[0]._id)}>
                  <ListItemText
                    primary={user[0].username}

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

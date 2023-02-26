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
} from "@mui/material";
import Rooms from "./Rooms";
import "../pages/test.css";

// Sidebar will display available rooms and online users

function Sidebar({ room, users }) {
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
        {/* <List>   
      {rooms.map((room, idx) => {
        return <ListItem key={idx}>{room}</ListItem>;
      })}
      </List> */}
      </Box>

      {/* Online members section */}
      <Box mt={5}>
        <List>
          {users.map((user) => {
            return (
              <ListItem key={user}>
                <ListItemAvatar>
                  <Avatar src={user[0].picture} />
                </ListItemAvatar>
                <ListItemText
                  primary={user[0].username}
                  // secondary={secondary ? 'Secondary text' : null}
                />
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

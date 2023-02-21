// import * as React from 'react';
import { List, ListItem, Typography, Box, Container } from "@mui/material";
import Rooms from "./Rooms";

// Sidebar will display available rooms and online users

function Sidebar({ room }) {
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
        <Typography variant="h5" component="h2" mb={2}>
          Members
        </Typography>
      </Box>
    </Container>
  );
}

export default Sidebar;

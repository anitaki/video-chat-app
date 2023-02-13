
import { List, ListItem, Typography, Box, Container } from "@mui/material";

// Sidebar will display available rooms and online users

function Sidebar() {
  let rooms = ["first room", "second room", "third room"];

  return (
    <Container pl={5} >
    <Box mt={5}>
    <Typography variant="h5"component="h2" mb={2}>
              Available Rooms
            </Typography>
      <List>   
      {rooms.map((room, idx) => {
        return <ListItem key={idx}>{room}</ListItem>;
      })}
      </List>
      </Box>
      <Box mt={5}>
      <Typography variant="h5"component="h2" mb={2}>
              Members
            </Typography>
      </Box>
    </Container>
  );
}

export default Sidebar;
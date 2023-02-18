import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

function Rooms() {
  const [selectedIndex, setSelectedIndex] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");

  const handleListItemClick = (event, idx, room) => {
    setSelectedIndex(idx);
    setSelectedRoom(room);
    console.log(selectedIndex);
    console.log(selectedRoom);
  };

  let rooms = ["first room", "second room", "third room"];

  return (
    <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <List component="nav" aria-label="secondary mailbox folder">
        {rooms.map((room, idx) => {
          return (
            <ListItemButton
              key={room}
              selected={selectedIndex}
              onClick={(event) => handleListItemClick(event, { idx }, { room })}
            >
              <ListItemText primary={room} />
            </ListItemButton>
          );
        })}
      </List>
      <Divider />
    </Box>
  );
}

export default Rooms;

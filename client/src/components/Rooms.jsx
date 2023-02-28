import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

function Rooms({handleLeaveRoom}) {
 
  

  let rooms = ["General"];

  return (
    <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <List component="nav" aria-label="secondary mailbox folder">
        {rooms.map((room, idx) => {
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
  );
}

export default Rooms;

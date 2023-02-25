import { TextField, Box, Button, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import DivRef from "./DivRef";
import * as mdb from "mdb-ui-kit";

// Create the input field and Submit button where user will type and send his/her new message

function MessageForm({ children, onChange, onClick, picture }) {
  return (
    <div>
      {/* Area to display chat messages */}
      <Box
        sx={{
          m: 1,
          width: "90%",
          height: "70vh",
          border: "1px solid lightgrey",
          borderRadius: "5px",
          overflowY: "scroll",
          overflowX: "none",
        }}
      >
        {children}
        <DivRef />
      </Box>

      {/* Input field for new message */}
      <Box sx={{ display: "flex", alignItems: "center", pl: 5 }}>
        <img
          src={picture}
          alt="avatar"
          style={{
            borderRadius: "50%",
            width: "2rem",
            height: "2rem",
            objectFit: "cover",
          }}
        />
        <TextField
          id="outlined-basic"
          placeholder="Type here"
          variant="outlined"
          multiline
          maxRows={4}
          color="secondary"
          sx={{ ml: 2, my: 1, width: "60%" }}
          onChange={onChange}
        />

        {/* Submit button for new message */}

        {/* <Button
          variant="contained"
          color="warning"
          size="large"
          sx={{ m: 0, width: "10%", height: "3.5rem" }}
          onClick={onClick}
        >
         Send
        </Button> */}
        <IconButton aria-label="send message">
          <SendIcon color="warning" onClick={onClick} />
        </IconButton>
      </Box>
    </div>
  );
}

export default MessageForm;

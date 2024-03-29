import { TextField, Box, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import DivRef from "./DivRef";
import profileImg from "../assets/sample.webp";

// Create the input field and Submit button where user will type and send his/her new message

function MessageForm({ children, onChange, onClick, picture, message }) {
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
          src={picture || profileImg}
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
          color="success"
          sx={{ ml: 2, mb: 1, width: "60%" }}
          onChange={onChange}
          value={message}
        />
        {/* Submit button for new message */}
        <IconButton aria-label="send message" onClick={onClick}>
          <SendIcon
            sx={{ ml: 1, width: "2rem", height: "3.5rem", color: "#8BC34A" }}
          />
        </IconButton>
      </Box>
    </div>
  );
}

export default MessageForm;

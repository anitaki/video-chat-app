import { TextField, Box, Typography, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import DivRef from "./DivRef";

// Create the input field and Submit button where user will type and send his/her new message

function MessageForm({
  children,
  onChange,
  onClick,
  picture,
  selectedUser,
  privateMessage,
}) {
  return (
    <div>
      <Typography
        ml={1}
        mt={1}
        align="center"
        style={{ backgroundColor: "lightgrey", width: "90%" }}
      >
        Your{" "}
        <span style={{ fontWeight: "bold", color: "green" }}>Chatvine</span>{" "}
        conversation with{" "}
        <span style={{ fontWeight: "bold", color: "black" }}>
          {selectedUser.username}
        </span>
      </Typography>
      {/* Area to display chat messages */}
      <Box
        sx={{
          m: 1,
          mt: 0,
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
          color="warning"
          sx={{ ml: 2, mb: 1, width: "60%" }}
          onChange={onChange}
          value={privateMessage}
        />
        {/* Submit button for new private message */}
        <IconButton aria-label="send message" onClick={onClick}>
          <SendIcon
            sx={{ ml: 1, width: "2rem", height: "3.5rem", color: "#ED6C02" }}
          />
        </IconButton>
      </Box>
    </div>
  );
}

export default MessageForm;

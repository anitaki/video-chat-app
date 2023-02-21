import { TextField, Box, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import DivRef from "./DivRef";

// Create the input field and Submit button where user will type and send his/her new message

function MessageForm({ children, onChange, onClick, connectedUser}) {
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
          overflowX: "none"
        }}
      >
        {children}
        <DivRef />
      </Box>

      {/* Input field for new message */}
      <Box sx={{ display: "flex" }}>
        <TextField
          id="outlined-basic"
          label="Your message here"
          variant="outlined"
          multiline
          maxRows={2}
          color="secondary"
          sx={{ m: 1, width: "80%" }}
          onChange={onChange}
        />

        {/* Submit button for new message */}
        <Button
          variant="contained"
          color="warning"
          
          sx={{ m: 1, width: "8%" }}
          onClick={onClick}
        >
          {" "}
          <SendIcon />{" "}
        </Button>
      </Box>
    </div>
  );
}

export default MessageForm;

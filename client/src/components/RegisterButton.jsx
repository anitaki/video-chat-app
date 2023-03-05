import React from "react";
import { Button } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { purple, orange } from "@mui/material/colors";
import { styled } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: orange[400],
    },
  },
});

const ColorButton = styled(Button)({
  color: theme.palette.getContrastText(orange[400]),
  backgroundColor: orange[500],
  "&:hover": {
    backgroundColor: orange[700],
  },
  marginTop: "1rem",
  width: "6rem",
});

function SignUpButton({ onClick, value }) {
  return (
    <div>
      <ColorButton onClick={onClick}>{value}</ColorButton>
    </div>
  );
}

export default SignUpButton;

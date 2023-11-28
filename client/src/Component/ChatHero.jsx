import { Avatar, Box, Button, darken } from "@mui/material";
import { orange } from "@mui/material/colors";
import React from "react";
import VideoChatIcon from "@mui/icons-material/VideoChat";

const ChatHero = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        alignItems: "center",
      }}
    >
      <Box sx={{ fontSize: "80px" }}>
        <VideoChatIcon fontSize="inherit" />
      </Box>
      <Button
        sx={{
          bgcolor: orange[800],
          "&:hover": { backgroundColor: darken(orange[800], 0.3) },
          "&:disabled" : { backgroundColor: darken(orange[800], 0.4) },
        }}
        // disabled
        variant="contained"
      >
        Start a Video Call
      </Button>
    </Box>
  );
};

export default ChatHero;

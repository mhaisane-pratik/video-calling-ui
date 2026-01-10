import { Box, IconButton } from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import VideocamIcon from "@mui/icons-material/Videocam";
import ScreenShareIcon from "@mui/icons-material/ScreenShare";
import CallEndIcon from "@mui/icons-material/CallEnd";

export default function ControlBar() {
  return (
    <Box sx={{ p: 2, bgcolor: "#020617", display: "flex", justifyContent: "center", gap: 2 }}>
      <IconButton><MicIcon /></IconButton>
      <IconButton><VideocamIcon /></IconButton>
      <IconButton><ScreenShareIcon /></IconButton>
      <IconButton color="error"><CallEndIcon /></IconButton>
    </Box>
  );
}

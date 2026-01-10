import { Box, Button, Typography, IconButton, Card } from "@mui/material";
import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import NetworkIndicator from "../../components/common/NetworkIndicator";
import useNetworkQuality from "../../hooks/useNetworkQuality";

export default function Lobby() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [mic, setMic] = useState(true);
  const [cam, setCam] = useState(true);

  const network = useNetworkQuality();

  return (
    <Box
      sx={{
        height: "100vh",
        bgcolor: "#0f172a",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card sx={{ width: 420, p: 3, bgcolor: "#020617" }}>
        <Typography variant="h6">Ready to join?</Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
          Meeting ID: {id}
        </Typography>

        {/* CAMERA PREVIEW */}
        <Box
          sx={{
            height: 200,
            bgcolor: "#1e293b",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography>
            {cam ? "Camera Preview" : "Camera Off"}
          </Typography>
        </Box>

        {/* CONTROLS */}
        <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
          <IconButton onClick={() => setMic(!mic)}>
            {mic ? <MicIcon /> : <MicOffIcon />}
          </IconButton>
          <IconButton onClick={() => setCam(!cam)}>
            {cam ? <VideocamIcon /> : <VideocamOffIcon />}
          </IconButton>
        </Box>

        {/* NETWORK HEALTH */}
        <Box sx={{ mt: 2 }}>
          <NetworkIndicator quality={network} />
        </Box>

        {/* JOIN BUTTON */}
        <Button
          fullWidth
          variant="contained"
          sx={{ mt: 3 }}
          onClick={() => navigate(`/meeting/${id}`)}
        >
          Join Meeting
        </Button>
      </Card>
    </Box>
  );
}

import { Box, Typography, Avatar } from "@mui/material";
import MicOffIcon from "@mui/icons-material/MicOff";

export default function ParticipantTile({ user }) {
  return (
    <Box
      sx={{
        bgcolor: "#020617",
        borderRadius: 2,
        p: 1,
        position: "relative",
      }}
    >
      {/* CAMERA PLACEHOLDER */}
      <Avatar sx={{ width: 80, height: 80, mx: "auto", my: 2 }}>
        {user.name[0]}
      </Avatar>

      {/* NAME */}
      <Typography variant="caption">{user.name}</Typography>

      {/* MIC STATUS */}
      {!user.mic && (
        <MicOffIcon
          sx={{ position: "absolute", top: 8, right: 8, color: "red" }}
        />
      )}
    </Box>
  );
}

import { Box, Typography } from "@mui/material";

export default function MeetingStatusBar({ recording }) {
  return (
    <Box sx={{ p: 1, bgcolor: "#020617", display: "flex", gap: 2 }}>
      <Typography>⏱ 00:18:32</Typography>
      {recording && <Typography color="red">● REC</Typography>}
      <Typography>🔒 Secure</Typography>
      <Typography>🟢 Network Good</Typography>
    </Box>
  );
}

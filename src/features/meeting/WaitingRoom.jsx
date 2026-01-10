import { Box, Button, Typography, Card } from "@mui/material";

export default function WaitingRoom() {
  return (
    <Card sx={{ p: 3, bgcolor: "#020617" }}>
      <Typography variant="h5">Waiting Room</Typography>
      <Typography sx={{ mt: 1 }}>
        John Doe wants to join the meeting
      </Typography>

      <Box sx={{ mt: 2 }}>
        <Button variant="contained" sx={{ mr: 1 }}>
          Admit
        </Button>
        <Button variant="outlined">
          Reject
        </Button>
      </Box>
    </Card>
  );
}

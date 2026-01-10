import { Box, Typography, Card } from "@mui/material";

export default function MeetingAnalytics() {
  return (
    <Box sx={{ p: 4, bgcolor: "#0f172a", minHeight: "100vh", color: "#fff" }}>
      <Typography variant="h4">Meeting Summary</Typography>

      <Card sx={{ p: 2, bgcolor: "#020617", mt: 2 }}>
        <Typography>Total Duration: 42 mins</Typography>
        <Typography>Participants: 6</Typography>
        <Typography>Recording: Saved</Typography>
        <Typography>Avg Engagement: 78%</Typography>
      </Card>
    </Box>
  );
}

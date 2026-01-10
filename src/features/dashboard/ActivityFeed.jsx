import { Card, Typography } from "@mui/material";

const activities = [
  "Sarah joined Design Sync",
  "Recording saved: Sprint Review",
  "New chat message from Michael",
];

export default function ActivityFeed() {
  return (
    <Card sx={{ p: 2, bgcolor: "#020617" }}>
      <Typography variant="h6">Recent Activity</Typography>
      {activities.map((a, i) => (
        <Typography key={i} variant="body2">
          • {a}
        </Typography>
      ))}
    </Card>
  );
}

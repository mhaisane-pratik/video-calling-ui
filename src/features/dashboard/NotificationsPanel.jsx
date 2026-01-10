import { Card, Typography } from "@mui/material";

const notifications = [
  "You were mentioned in Design Team",
  "Meeting recording is ready",
  "New admin policy applied",
];

export default function NotificationsPanel() {
  return (
    <Card sx={{ p: 2, bgcolor: "#020617" }}>
      <Typography variant="h6">Notifications</Typography>
      {notifications.map((n, i) => (
        <Typography key={i} variant="body2">
          • {n}
        </Typography>
      ))}
    </Card>
  );
}

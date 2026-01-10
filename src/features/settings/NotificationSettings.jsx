import { Box, Typography, Switch } from "@mui/material";

export default function NotificationSettings() {
  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Notifications
      </Typography>

      <Typography>
        Email Notifications <Switch defaultChecked />
      </Typography>
      <Typography>
        Chat Mentions <Switch defaultChecked />
      </Typography>
      <Typography>
        Meeting Reminders <Switch />
      </Typography>
    </Box>
  );
}

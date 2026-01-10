import { Box, Typography, Switch } from "@mui/material";

export default function AdminDashboard() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4">Admin Settings</Typography>

      <Typography sx={{ mt: 2 }}>
        Allow Chat <Switch defaultChecked />
      </Typography>

      <Typography>
        Allow Whiteboard <Switch defaultChecked />
      </Typography>

      <Typography>
        Enable Recordings <Switch />
      </Typography>
    </Box>
  );
}

import { Box, Typography, TextField, Button, Avatar, MenuItem } from "@mui/material";

export default function ProfileSettings() {
  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Profile
      </Typography>

      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
        <Avatar sx={{ width: 64, height: 64, bgcolor: "#2563eb" }}>VT</Avatar>
        <Box>
          <Typography>Verzat Technologies</Typography>
          <Typography variant="caption">Admin</Typography>
        </Box>
      </Box>

      <Box sx={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
        <TextField label="First Name" defaultValue="Alex" />
        <TextField label="Last Name" defaultValue="Morgan" />
        <TextField label="Email" defaultValue="alex@company.com" />
        <TextField label="Phone" defaultValue="+1 (555) 123-4567" />
        <TextField label="Department" defaultValue="Product" />
        <TextField label="Location" defaultValue="San Francisco, CA" />
      </Box>

      <Button variant="contained" sx={{ mt: 3 }}>
        Save Changes
      </Button>
    </Box>
  );
}

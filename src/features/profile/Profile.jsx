import { Box, Typography, TextField, Button } from "@mui/material";

export default function Profile() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5">Profile Settings</Typography>

      <TextField fullWidth label="Name" sx={{ mt: 2 }} />
      <TextField fullWidth label="Email" sx={{ mt: 2 }} />

      <Button variant="contained" sx={{ mt: 3 }}>
        Save Changes
      </Button>
    </Box>
  );
}

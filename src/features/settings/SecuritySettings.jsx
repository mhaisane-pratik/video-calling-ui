import { Typography } from "@mui/material";

export default function SecuritySettings() {
  return (
    <>
      <Typography variant="h5">Security</Typography>
      <Typography variant="body2" sx={{ mt: 1 }}>
        Change password, manage sessions, MFA (coming soon).
      </Typography>
    </>
  );
}

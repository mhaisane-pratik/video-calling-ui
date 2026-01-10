import { Box, Typography, Switch } from "@mui/material";

export default function FeatureToggles() {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6">Feature Controls</Typography>

      <Typography>Enable Chat <Switch defaultChecked /></Typography>
      <Typography>Enable Whiteboard <Switch defaultChecked /></Typography>
      <Typography>Enable Recording <Switch /></Typography>
    </Box>
  );
}

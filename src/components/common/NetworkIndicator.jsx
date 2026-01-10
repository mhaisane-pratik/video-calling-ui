import { Box, Typography } from "@mui/material";

const colors = {
  good: "#22c55e",     // green
  medium: "#facc15",   // yellow
  poor: "#ef4444",     // red
};

const labels = {
  good: "Good Connection",
  medium: "Average Connection",
  poor: "Poor Connection",
};

export default function NetworkIndicator({ quality }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <Box
        sx={{
          width: 10,
          height: 10,
          borderRadius: "50%",
          bgcolor: colors[quality],
        }}
      />
      <Typography variant="caption">
        {labels[quality]}
      </Typography>
    </Box>
  );
}

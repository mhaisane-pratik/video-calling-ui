import { Box, Typography, LinearProgress } from "@mui/material";

export default function EngagementMeter({ score = 72 }) {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="subtitle1">Engagement Score</Typography>
      <LinearProgress
        variant="determinate"
        value={score}
        sx={{ height: 10, borderRadius: 5, mt: 1 }}
      />
      <Typography variant="caption">{score}% Active</Typography>
    </Box>
  );
}

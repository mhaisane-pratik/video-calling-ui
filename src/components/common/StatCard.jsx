import { Card, Typography } from "@mui/material";

export default function StatCard({ title, value }) {
  return (
    <Card sx={{ p: 2, bgcolor: "#020617" }}>
      <Typography variant="caption">{title}</Typography>
      <Typography variant="h5">{value}</Typography>
    </Card>
  );
}

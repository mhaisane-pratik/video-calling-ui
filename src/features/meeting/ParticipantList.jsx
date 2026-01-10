import { Box, Typography } from "@mui/material";

export default function ParticipantList() {
  const users = [
    { name: "Alex", mic: true, network: "good", host: true },
    { name: "Sarah", mic: false, network: "fair" },
  ];

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6">Participants (2)</Typography>

      {users.map((u) => (
        <Typography key={u.name}>
          {u.network === "good" ? "🟢" : "🟡"} {u.name}{" "}
          {u.host && "(Host)"}
        </Typography>
      ))}
    </Box>
  );
}

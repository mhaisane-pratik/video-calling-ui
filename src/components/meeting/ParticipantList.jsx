import { Box, Typography } from "@mui/material";

export default function ParticipantList() {
  const users = [
    { name: "Alex", hand: false },
    { name: "Sarah", hand: true },
  ];

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6">Participants</Typography>

      {users.map((u) => (
        <Typography key={u.name}>
          {u.hand && "✋ "} {u.name}
        </Typography>
      ))}
    </Box>
  );
}

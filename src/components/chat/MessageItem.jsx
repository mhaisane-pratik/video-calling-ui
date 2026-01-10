import { Box, Avatar, Typography } from "@mui/material";

export default function MessageItem({ message }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: message.mine ? "flex-end" : "flex-start",
        mb: 1,
        gap: 1,
      }}
    >
      {!message.mine && <Avatar sx={{ width: 28, height: 28 }}>SJ</Avatar>}

      <Box
        sx={{
          p: 1.5,
          borderRadius: 2,
          bgcolor: message.mine ? "#2563eb" : "#1e293b",
          maxWidth: "70%",
        }}
      >
        <Typography variant="body2">{message.text}</Typography>
        {message.mine && (
          <Typography variant="caption" sx={{ float: "right" }}>
            {message.read ? "✓✓" : "✓"}
          </Typography>
        )}
      </Box>
    </Box>
  );
}

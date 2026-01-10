import { Box, TextField, Typography, Button } from "@mui/material";
import { useState } from "react";

export default function ChatPanel() {
  const [messages, setMessages] = useState([
    { user: "Sarah", text: "Hello everyone!" },
  ]);
  const [text, setText] = useState("");

  function sendMessage() {
    if (!text) return;
    setMessages((m) => [...m, { user: "You", text }]);
    setText("");
  }

  return (
    <Box sx={{ p: 2, display: "flex", flexDirection: "column", height: "100%" }}>
      <Typography variant="h6">Chat</Typography>

      <Box sx={{ flex: 1, my: 1, overflowY: "auto" }}>
        {messages.map((m, i) => (
          <Typography key={i} variant="body2">
            <b>{m.user}:</b> {m.text}
          </Typography>
        ))}
      </Box>

      <TextField
        size="small"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message"
      />
      <Button sx={{ mt: 1 }} onClick={sendMessage}>
        Send
      </Button>
    </Box>
  );
}

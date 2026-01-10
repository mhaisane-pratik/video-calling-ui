import { Box, TextField, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useDispatch } from "react-redux";
import { sendMessage, setTyping } from "../../store/chat.slice";
import { useState } from "react";

export default function ChatInput() {
  const dispatch = useDispatch();
  const [text, setText] = useState("");

  const send = () => {
    if (!text.trim()) return;
    dispatch(sendMessage(text));
    dispatch(setTyping(false));
    setText("");
  };

  return (
    <Box sx={{ display: "flex", p: 1, bgcolor: "#020617" }}>
      <TextField
        fullWidth
        size="small"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          dispatch(setTyping(true));
        }}
        placeholder="Type a message"
      />
      <IconButton onClick={send}>
        <SendIcon />
      </IconButton>
    </Box>
  );
}

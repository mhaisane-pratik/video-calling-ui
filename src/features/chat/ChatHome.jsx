import { Box, Typography, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { setActiveChat } from "../../store/chat.slice";
import MessageList from "../../components/chat/MessageList";
import ChatInput from "../../components/chat/ChatInput";

export default function ChatHome() {
  const dispatch = useDispatch();
  const { chats, activeChatId, typing } = useSelector((s) => s.chat);
  const activeChat = chats.find((c) => c.id === activeChatId);

  if (!activeChat) {
    return (
      <Box sx={{ bgcolor: "#0f172a", height: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Typography>Select a chat</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", height: "100vh", bgcolor: "#0f172a" }}>
      <Box sx={{ width: 320, bgcolor: "#020617", p: 2 }}>
        <Typography variant="h6">Chats</Typography>
        <TextField size="small" fullWidth placeholder="Search chats" sx={{ my: 1 }} />

        {chats.map((chat) => (
          <Box
            key={chat.id}
            onClick={() => dispatch(setActiveChat(chat.id))}
            sx={{
              p: 1,
              cursor: "pointer",
              borderRadius: 1,
              bgcolor: activeChatId === chat.id ? "#1e293b" : "transparent",
              "&:hover": { bgcolor: "#1e293b" },
              transition: "background-color 0.2s ease",
            }}
          >
            <Typography>{chat.name}</Typography>
            <Typography variant="caption">{chat.messages.at(-1)?.text}</Typography>
          </Box>
        ))}
      </Box>

      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Box sx={{ p: 2, bgcolor: "#020617", borderBottom: "1px solid #1e293b" }}>
          <Typography variant="h6">{activeChat.name}</Typography>

          {activeChat.isGroup && activeChat.admin && (
            <Typography variant="caption" color="primary">
              You are Group Admin • Add / Remove members
            </Typography>
          )}

          {typing && <Typography variant="caption">Typing…</Typography>}
        </Box>

        <MessageList />
        <ChatInput />
      </Box>
    </Box>
  );
}

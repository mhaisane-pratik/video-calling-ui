import { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  TextField,
  Avatar,
  AvatarGroup,
  Badge,
  IconButton,
  InputAdornment,
  Divider,
  Chip,
  Menu,
  MenuItem,
  Fade,
  Slide,
  Tooltip,
  Paper,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
} from "@mui/material";
import {
  Search,
  MoreVert,
  FilterList,
  Archive,
  Delete,
  PinDrop,
  Groups,
  Add,
  CheckCircle,
  DoneAll,
  Schedule,
  VolumeOff,
  Block,
  Report,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setActiveChat, markAsRead } from "../../store/chat.slice";
import MessageList from "../../components/chat/MessageList";
import ChatInput from "../../components/chat/ChatInput";
import StatusIndicator from "../../components/chat/StatusIndicator";

export default function ChatHome() {
  const dispatch = useDispatch();
  const { chats, activeChatId, typing, onlineUsers } = useSelector((s) => s.chat);
  const activeChat = chats.find((c) => c.id === activeChatId);
  const [searchQuery, setSearchQuery] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const chatListRef = useRef(null);
  const [filteredChats, setFilteredChats] = useState(chats);

  // Search filter
  useEffect(() => {
    const filtered = chats.filter(chat =>
      chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.messages.some(msg => 
        msg.text.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
    setFilteredChats(filtered);
  }, [searchQuery, chats]);

  if (!activeChat) {
    return (
      <Slide direction="up" in={true} mountOnEnter unmountOnExit>
        <Box
          sx={{
            bgcolor: "background.default",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: 2,
            background: "radial-gradient(circle at 50% 50%, #1e293b 0%, #0f172a 100%)",
          }}
        >
          <Box
            sx={{
              width: 120,
              height: 120,
              borderRadius: "50%",
              bgcolor: "rgba(59, 130, 246, 0.1)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              animation: "pulse 2s infinite",
              "@keyframes pulse": {
                "0%": { transform: "scale(1)", opacity: 0.7 },
                "50%": { transform: "scale(1.05)", opacity: 1 },
                "100%": { transform: "scale(1)", opacity: 0.7 },
              },
            }}
          >
            <Groups sx={{ fontSize: 48, color: "primary.main" }} />
          </Box>
          <Typography variant="h5" fontWeight={600}>
            Welcome to Zat Chat
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 400, textAlign: "center" }}>
            Select a conversation from the sidebar to start chatting
          </Typography>
        </Box>
      </Slide>
    );
  }

  // Format time
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  // Get last message preview
  const getLastMessage = (chat) => {
    const lastMsg = chat.messages.at(-1);
    if (!lastMsg) return "No messages yet";
    
    const prefix = lastMsg.mine ? "You: " : "";
    const text = lastMsg.text.length > 30 
      ? lastMsg.text.substring(0, 30) + "..." 
      : lastMsg.text;
    return prefix + text;
  };

  return (
    <Box sx={{ display: "flex", height: "100vh", bgcolor: "background.default", overflow: "hidden" }}>
      {/* Left Sidebar - Chat List */}
      <Box
        sx={{
          width: { xs: "100%", md: 400 },
          bgcolor: "background.paper",
          display: "flex",
          flexDirection: "column",
          borderRight: "1px solid",
          borderColor: "divider",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Header */}
        <Box sx={{ p: 2, borderBottom: "1px solid", borderColor: "divider" }}>
          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
            <Typography variant="h5" fontWeight={700} sx={{ color: "primary.main" }}>
              Zat Chat
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Tooltip title="Filter chats">
                <IconButton size="small">
                  <FilterList />
                </IconButton>
              </Tooltip>
              <Tooltip title="New group">
                <IconButton size="small" sx={{ bgcolor: "primary.main", color: "white" }}>
                  <Add />
                </IconButton>
              </Tooltip>
              <IconButton size="small" onClick={(e) => setAnchorEl(e.currentTarget)}>
                <MoreVert />
              </IconButton>
            </Box>
          </Box>

          {/* Search Bar */}
          <TextField
            fullWidth
            size="small"
            placeholder="Search or start new chat"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{
              bgcolor: "action.hover",
              borderRadius: 2,
              "& .MuiOutlinedInput-root": {
                borderRadius: 2,
              },
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search fontSize="small" />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {/* Chat List */}
        <Box sx={{ flex: 1, overflowY: "auto" }} ref={chatListRef}>
          <List sx={{ p: 0 }}>
            {filteredChats.map((chat) => {
              const unreadCount = chat.messages.filter(m => !m.read && !m.mine).length;
              const lastMessage = chat.messages.at(-1);
              const isOnline = onlineUsers?.includes(chat.id);
              
              return (
                <Fade in={true} key={chat.id}>
                  <ListItem
                    button
                    selected={activeChatId === chat.id}
                    onClick={() => {
                      dispatch(setActiveChat(chat.id));
                      if (unreadCount > 0) {
                        dispatch(markAsRead(chat.id));
                      }
                    }}
                    sx={{
                      px: 2,
                      py: 1.5,
                      borderBottom: "1px solid",
                      borderColor: "divider",
                      bgcolor: activeChatId === chat.id ? "action.selected" : "transparent",
                      "&:hover": {
                        bgcolor: activeChatId === chat.id ? "action.selected" : "action.hover",
                      },
                      transition: "all 0.2s ease",
                    }}
                  >
                    <ListItemAvatar>
                      <Badge
                        overlap="circular"
                        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                        variant="dot"
                        color={isOnline ? "success" : "default"}
                        invisible={!isOnline}
                      >
                        <Avatar
                          sx={{
                            bgcolor: chat.isGroup ? "secondary.main" : "primary.main",
                            width: 48,
                            height: 48,
                          }}
                        >
                          {chat.isGroup ? (
                            <AvatarGroup max={2}>
                              <Avatar sx={{ width: 24, height: 24 }}>S</Avatar>
                              <Avatar sx={{ width: 24, height: 24 }}>J</Avatar>
                            </AvatarGroup>
                          ) : (
                            chat.name.charAt(0)
                          )}
                        </Avatar>
                      </Badge>
                    </ListItemAvatar>

                    <ListItemText
                      primary={
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                          <Typography variant="subtitle1" fontWeight={unreadCount > 0 ? 600 : 400}>
                            {chat.name}
                          </Typography>
                          {chat.pinned && (
                            <PinDrop fontSize="small" sx={{ color: "warning.main", fontSize: 14 }} />
                          )}
                        </Box>
                      }
                      secondary={
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                          {lastMessage?.mine && (
                            lastMessage.read ? (
                              <DoneAll fontSize="small" sx={{ fontSize: 14, color: "primary.main" }} />
                            ) : (
                              <CheckCircle fontSize="small" sx={{ fontSize: 14, color: "text.secondary" }} />
                            )
                          )}
                          <Typography
                            variant="body2"
                            sx={{
                              color: unreadCount > 0 ? "text.primary" : "text.secondary",
                              fontWeight: unreadCount > 0 ? 500 : 400,
                            }}
                          >
                            {getLastMessage(chat)}
                          </Typography>
                        </Box>
                      }
                    />

                    <ListItemSecondaryAction>
                      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 0.5 }}>
                        <Typography variant="caption" color="text.secondary">
                          {lastMessage ? formatTime(lastMessage.timestamp) : ""}
                        </Typography>
                        {unreadCount > 0 && (
                          <Chip
                            label={unreadCount}
                            size="small"
                            sx={{
                              bgcolor: "primary.main",
                              color: "white",
                              fontSize: "0.7rem",
                              height: 20,
                              minWidth: 20,
                            }}
                          />
                        )}
                      </Box>
                    </ListItemSecondaryAction>
                  </ListItem>
                </Fade>
              );
            })}
          </List>
        </Box>

        {/* User Profile */}
        <Paper
          sx={{
            p: 1.5,
            m: 2,
            borderRadius: 2,
            bgcolor: "action.hover",
            display: "flex",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            variant="dot"
            color="success"
          >
            <Avatar sx={{ bgcolor: "primary.main", width: 40, height: 40 }}>
              V
            </Avatar>
          </Badge>
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle2" fontWeight={600}>
              Verzat
            </Typography>
            <Typography variant="caption" color="success.main">
              Online
            </Typography>
          </Box>
          <StatusIndicator />
        </Paper>
      </Box>

      {/* Main Chat Area */}
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column", position: "relative" }}>
        {/* Chat Header */}
        <Paper
          elevation={0}
          sx={{
            p: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            borderBottom: "1px solid",
            borderColor: "divider",
            bgcolor: "background.paper",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
              color={onlineUsers?.includes(activeChat.id) ? "success" : "default"}
            >
              <Avatar
                sx={{
                  bgcolor: activeChat.isGroup ? "secondary.main" : "primary.main",
                  width: 44,
                  height: 44,
                }}
              >
                {activeChat.isGroup ? "G" : activeChat.name.charAt(0)}
              </Avatar>
            </Badge>
            <Box>
              <Typography variant="h6" fontWeight={600}>
                {activeChat.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {onlineUsers?.includes(activeChat.id) ? "Online • " : "Last seen today at 2:30 PM • "}
                {activeChat.isGroup ? `${activeChat.members} members` : "Click for contact info"}
              </Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", gap: 1 }}>
            <Tooltip title="Search">
              <IconButton>
                <Search />
              </IconButton>
            </Tooltip>
            <Tooltip title="Mute notifications">
              <IconButton>
                <VolumeOff />
              </IconButton>
            </Tooltip>
            <Tooltip title="More options">
              <IconButton>
                <MoreVert />
              </IconButton>
            </Tooltip>
          </Box>
        </Paper>

        {/* Typing Indicator */}
        {typing && (
          <Slide direction="up" in={typing}>
            <Paper
              sx={{
                mx: 3,
                mt: 1,
                p: 1.5,
                borderRadius: 2,
                bgcolor: "action.hover",
                display: "flex",
                alignItems: "center",
                gap: 1,
                maxWidth: 120,
              }}
            >
              <Box sx={{ display: "flex", gap: 0.5 }}>
                <Box
                  sx={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    bgcolor: "primary.main",
                    animation: "bounce 1.4s infinite",
                    "&:nth-of-type(1)": { animationDelay: "0s" },
                    "&:nth-of-type(2)": { animationDelay: "0.2s" },
                    "&:nth-of-type(3)": { animationDelay: "0.4s" },
                    "@keyframes bounce": {
                      "0%, 60%, 100%": { transform: "translateY(0)" },
                      "30%": { transform: "translateY(-4px)" },
                    },
                  }}
                />
                <Box sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: "primary.main" }} />
                <Box sx={{ width: 6, height: 6, borderRadius: "50%", bgcolor: "primary.main" }} />
              </Box>
              <Typography variant="caption">typing...</Typography>
            </Paper>
          </Slide>
        )}

        {/* Messages Area */}
        <MessageList />

        {/* Chat Input */}
        <ChatInput />
      </Box>

      {/* Context Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        TransitionComponent={Fade}
      >
        <MenuItem>
          <Archive sx={{ mr: 1, fontSize: 20 }} />
          Archived
        </MenuItem>
        <MenuItem>
          <Block sx={{ mr: 1, fontSize: 20 }} />
          Blocked
        </MenuItem>
        <MenuItem>
          <Delete sx={{ mr: 1, fontSize: 20, color: "error.main" }} />
          Delete Chat
        </MenuItem>
        <Divider />
        <MenuItem>
          <Report sx={{ mr: 1, fontSize: 20 }} />
          Report
        </MenuItem>
      </Menu>
    </Box>
  );
}
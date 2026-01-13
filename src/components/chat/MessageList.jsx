import { useEffect, useRef, useState } from "react";
import { Box, Typography, Fade, Zoom, IconButton, Tooltip } from "@mui/material";
import { useSelector } from "react-redux";
import MessageItem from "./MessageItem";
import { KeyboardArrowDown, Today, EmojiEvents } from "@mui/icons-material";
import { format } from "date-fns";

export default function MessageList() {
  const { chats, activeChatId } = useSelector(s => s.chat);
  const chat = chats.find(c => c.id === activeChatId);
  const messagesEndRef = useRef(null);
  const containerRef = useRef(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [groupedMessages, setGroupedMessages] = useState({});

  // Group messages by date
  useEffect(() => {
    if (!chat?.messages) return;
    
    const groups = {};
    chat.messages.forEach(msg => {
      const date = format(new Date(msg.timestamp), 'yyyy-MM-dd');
      if (!groups[date]) groups[date] = [];
      groups[date].push(msg);
    });
    
    setGroupedMessages(groups);
  }, [chat?.messages]);

  // Scroll to bottom on new messages
  useEffect(() => {
    scrollToBottom();
  }, [chat?.messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    setShowScrollButton(false);
  };

  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
      setShowScrollButton(scrollHeight - scrollTop - clientHeight > 100);
    }
  };

  // Format date header
  const formatDateHeader = (dateStr) => {
    const date = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      return format(date, 'MMMM d, yyyy');
    }
  };

  if (!chat) {
    return (
      <Box sx={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <Typography color="text.secondary">Select a chat to start messaging</Typography>
      </Box>
    );
  }

  return (
    <Box
      ref={containerRef}
      onScroll={handleScroll}
      sx={{
        flex: 1,
        overflowY: "auto",
        position: "relative",
        bgcolor: "background.default",
        backgroundImage: "radial-gradient(circle at 25px 25px, rgba(99, 102, 241, 0.1) 2px, transparent 0)",
        backgroundSize: "50px 50px",
        "&::-webkit-scrollbar": {
          width: "8px",
        },
        "&::-webkit-scrollbar-track": {
          bgcolor: "transparent",
        },
        "&::-webkit-scrollbar-thumb": {
          bgcolor: "action.selected",
          borderRadius: "4px",
        },
      }}
    >
      {/* Chat start indicator */}
      <Zoom in={true}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            my: 3,
            px: 2,
          }}
        >
          <Box
            sx={{
              px: 3,
              py: 1,
              borderRadius: 4,
              bgcolor: "action.hover",
              display: "flex",
              alignItems: "center",
              gap: 1,
            }}
          >
            <EmojiEvents fontSize="small" sx={{ color: "warning.main" }} />
            <Typography variant="caption" fontWeight={500}>
              This is the beginning of your chat with {chat.name}
            </Typography>
          </Box>
        </Box>
      </Zoom>

      {/* Messages grouped by date */}
      {Object.entries(groupedMessages).map(([date, messages]) => (
        <Box key={date}>
          {/* Date separator */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              my: 2,
              px: 2,
            }}
          >
            <Box
              sx={{
                px: 2,
                py: 0.5,
                borderRadius: 4,
                bgcolor: "action.selected",
                display: "flex",
                alignItems: "center",
                gap: 0.5,
              }}
            >
              <Today fontSize="small" sx={{ fontSize: 12 }} />
              <Typography variant="caption">
                {formatDateHeader(date)}
              </Typography>
            </Box>
          </Box>

          {/* Messages for this date */}
          {messages.map((msg) => (
            <MessageItem key={msg.id} message={msg} />
          ))}
        </Box>
      ))}

      {/* Scroll to bottom button */}
      {showScrollButton && (
        <Fade in={showScrollButton}>
          <Tooltip title="Scroll to bottom">
            <IconButton
              onClick={scrollToBottom}
              sx={{
                position: "sticky",
                bottom: 16,
                left: "50%",
                transform: "translateX(-50%)",
                bgcolor: "primary.main",
                color: "white",
                "&:hover": {
                  bgcolor: "primary.dark",
                },
                boxShadow: 3,
                zIndex: 10,
              }}
            >
              <KeyboardArrowDown />
            </IconButton>
          </Tooltip>
        </Fade>
      )}

      {/* Empty space for scrolling */}
      <Box ref={messagesEndRef} sx={{ height: 16 }} />
    </Box>
  );
}
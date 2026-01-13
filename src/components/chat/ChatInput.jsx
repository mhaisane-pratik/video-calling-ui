import { useState, useEffect, useRef } from "react";
import {
  Box,
  TextField,
  IconButton,
  Paper,
  Fade,
  Slide,
  Tooltip,
  Menu,
  MenuItem,
  Avatar,
  Typography,
  Divider,
} from "@mui/material";
import {
  Send,
  AttachFile,
  Mood,
  Mic,
  Image,
  Gif,
  LocationOn,
  ContactPhone,
  Close,
  KeyboardVoice,
  StopCircle,
  ScheduleSend,
} from "@mui/icons-material";

import { useDispatch, useSelector } from "react-redux";
import { sendMessage, setTyping, replyToMessage } from "../../store/chat.slice";

export default function ChatInput() {
  const dispatch = useDispatch();
  const { activeChatId, replyingTo } = useSelector(s => s.chat);
  const [text, setText] = useState("");
  const [emojiOpen, setEmojiOpen] = useState(false);
  const [recording, setRecording] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const inputRef = useRef(null);
  const typingTimeoutRef = useRef(null);

  // Handle typing indicator
  const handleTyping = () => {
    dispatch(setTyping(true));
    
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    
    typingTimeoutRef.current = setTimeout(() => {
      dispatch(setTyping(false));
    }, 2000);
  };

  const send = () => {
    if (!text.trim() && !recording) return;
    
    const messageData = {
      text: text.trim(),
      replyTo: replyingTo?.id,
    };
    
    dispatch(sendMessage(messageData));
    dispatch(setTyping(false));
    setText("");
    setEmojiOpen(false);
    
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
  };

  const startRecording = () => {
    setRecording(true);
    // In a real app, you would initialize voice recording here
  };

  const stopRecording = () => {
    setRecording(false);
    // In a real app, you would stop and send the recording here
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };


  const handleEmojiSelect = (emoji) => {
    setText(prev => prev + emoji.native);
    inputRef.current.focus();
  };

  const handleAttachmentClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    };
  }, []);

  return (
    <Box sx={{ position: "relative" }}>
      {/* Reply Preview */}
      {replyingTo && (
        <Slide direction="up" in={true}>
          <Paper
            sx={{
              mx: 2,
              mb: 1,
              p: 1.5,
              borderRadius: 2,
              bgcolor: "action.selected",
              borderLeft: "4px solid",
              borderColor: "primary.main",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Typography variant="caption" fontWeight={600} color="primary.main">
                Replying to {replyingTo.sender}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  mt: 0.5,
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {replyingTo.text}
              </Typography>
            </Box>
            <IconButton
              size="small"
              onClick={() => dispatch(replyToMessage(null))}
              sx={{ ml: 1 }}
            >
              <Close fontSize="small" />
            </IconButton>
          </Paper>
        </Slide>
      )}

      {/* Input Area */}
      <Paper
        elevation={0}
        sx={{
          m: 2,
          p: 1.5,
          borderRadius: 3,
          bgcolor: "background.paper",
          border: "1px solid",
          borderColor: "divider",
          display: "flex",
          alignItems: "flex-end",
          gap: 1,
          transition: "all 0.3s ease",
          "&:focus-within": {
            borderColor: "primary.main",
            boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.1)",
          },
        }}
      >
        {/* Attachment Menu */}
        <Tooltip title="Attach">
          <IconButton
            onClick={handleAttachmentClick}
            sx={{
              color: "primary.main",
              "&:hover": { bgcolor: "action.hover" },
            }}
          >
            <AttachFile />
          </IconButton>
        </Tooltip>

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <MenuItem onClick={handleClose}>
            <Image sx={{ mr: 1 }} /> Photo & Video
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ContactPhone sx={{ mr: 1 }} /> Contact
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <LocationOn sx={{ mr: 1 }} /> Location
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <Gif sx={{ mr: 1 }} /> GIF
          </MenuItem>
        </Menu>

        {/* Emoji Picker */}
        <Tooltip title="Emoji">
          <IconButton
            onClick={() => setEmojiOpen(!emojiOpen)}
            sx={{
              color: emojiOpen ? "primary.main" : "text.secondary",
              "&:hover": { bgcolor: "action.hover" },
            }}
          >
            <Mood />
          </IconButton>
        </Tooltip>

        {/* Message Input */}
        <Box sx={{ flex: 1, position: "relative" }}>
          <TextField
            inputRef={inputRef}
            fullWidth
            multiline
            maxRows={4}
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              handleTyping();
            }}
            onKeyPress={handleKeyPress}
            placeholder="Type a message..."
            variant="standard"
            InputProps={{
              disableUnderline: true,
              sx: {
                fontSize: "0.95rem",
                lineHeight: 1.5,
                "& .MuiInputBase-input": {
                  maxHeight: "80px",
                  overflowY: "auto",
                  "&::-webkit-scrollbar": {
                    width: "6px",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    bgcolor: "action.selected",
                    borderRadius: "3px",
                  },
                },
              },
            }}
            sx={{
              "& .MuiInputBase-root": {
                p: 0,
              },
            }}
          />

          {/* Character counter */}
          {text.length > 0 && (
            <Typography
              variant="caption"
              sx={{
                position: "absolute",
                bottom: -20,
                right: 0,
                color: text.length > 500 ? "error.main" : "text.secondary",
              }}
            >
              {text.length}/1000
            </Typography>
          )}
        </Box>

        {/* Voice/Send Button */}
        {recording ? (
          <Fade in={recording}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Tooltip title="Stop recording">
                <IconButton
                  onClick={stopRecording}
                  sx={{
                    bgcolor: "error.main",
                    color: "white",
                    "&:hover": { bgcolor: "error.dark" },
                  }}
                >
                  <StopCircle />
                </IconButton>
              </Tooltip>
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: "50%",
                  bgcolor: "error.main",
                  animation: "pulse 1s infinite",
                  "@keyframes pulse": {
                    "0%": { opacity: 1, transform: "scale(1)" },
                    "50%": { opacity: 0.5, transform: "scale(1.1)" },
                    "100%": { opacity: 1, transform: "scale(1)" },
                  },
                }}
              />
            </Box>
          </Fade>
        ) : text.trim() ? (
          <Tooltip title="Send">
            <IconButton
              onClick={send}
              sx={{
                bgcolor: "primary.main",
                color: "white",
                "&:hover": { bgcolor: "primary.dark" },
                transition: "transform 0.2s ease",
                "&:active": { transform: "scale(0.95)" },
              }}
            >
              <Send />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Voice message">
            <IconButton
              onClick={startRecording}
              sx={{
                color: "primary.main",
                "&:hover": { bgcolor: "action.hover" },
              }}
            >
              <Mic />
            </IconButton>
          </Tooltip>
        )}

        {/* Schedule send option */}
        <Tooltip title="Schedule message">
          <IconButton
            sx={{
              color: "text.secondary",
              "&:hover": { bgcolor: "action.hover" },
            }}
          >
            <ScheduleSend />
          </IconButton>
        </Tooltip>
      </Paper>

      {/* Emoji Picker Popover */}
      {emojiOpen && (
        <Box
          sx={{
            position: "absolute",
            bottom: "100%",
            right: 16,
            mb: 2,
            zIndex: 9999,
          }}
        >
          <Picker
            data={async () => {
              const response = await fetch(
                "https://cdn.jsdelivr.net/npm/@emoji-mart/data"
              );
              return response.json();
            }}
            onEmojiSelect={handleEmojiSelect}
            theme={document.body.getAttribute('data-theme')}
            previewPosition="none"
            skinTonePosition="none"
          />
        </Box>
      )}
    </Box>
  );
}
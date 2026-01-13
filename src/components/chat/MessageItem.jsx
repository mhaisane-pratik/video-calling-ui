import { useState } from "react";
import {
  Box,
  Avatar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Fade,
  useTheme,
} from "@mui/material";
import {
  MoreVert,
  Reply,
  Forward,
  Star,
  StarBorder,
  Delete,
  Edit,
  Schedule,
  DoneAll,
  CheckCircle,
} from "@mui/icons-material";
import { format } from "date-fns";

export default function MessageItem({ message }) {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const [starred, setStarred] = useState(message.starred || false);
  const isDark = theme.palette.mode === "dark";

  const handleMenuClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const formatTime = (timestamp) => {
    return format(new Date(timestamp), "h:mm a");
  };

  // Different message types styling
  const messageStyles = {
    mine: {
      bgcolor: isDark 
        ? "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)" 
        : "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
      color: "white",
      borderRadius: "18px 4px 18px 18px",
      marginLeft: "auto",
      borderBottomRightRadius: 4,
    },
    theirs: {
      bgcolor: isDark 
        ? "rgba(30, 41, 59, 0.8)" 
        : "rgba(241, 245, 249, 0.8)",
      color: isDark ? "white" : "text.primary",
      borderRadius: "4px 18px 18px 18px",
      marginRight: "auto",
      borderBottomLeftRadius: 4,
      backdropFilter: "blur(10px)",
    },
  };

  const style = message.mine ? messageStyles.mine : messageStyles.theirs;

  return (
    <Fade in={true}>
      <Box
        sx={{
          display: "flex",
          justifyContent: message.mine ? "flex-end" : "flex-start",
          mb: 2,
          px: 2,
          position: "relative",
          "&:hover .message-actions": {
            opacity: 1,
          },
        }}
      >
        {/* Sender Avatar (only for received messages) */}
        {!message.mine && (
          <Avatar
            sx={{
              width: 32,
              height: 32,
              mr: 1.5,
              mt: 0.5,
              bgcolor: "primary.main",
            }}
          >
            {message.sender?.charAt(0) || "U"}
          </Avatar>
        )}

        <Box sx={{ maxWidth: "70%", position: "relative" }}>
          {/* Message Bubble */}
          <Box
            sx={{
              p: 1.5,
              background: style.bgcolor,
              color: style.color,
              borderRadius: style.borderRadius,
              position: "relative",
              boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
              transition: "all 0.2s ease",
              "&:hover": {
                boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
              },
            }}
          >
            {/* Message content */}
            <Typography
              variant="body2"
              sx={{
                wordBreak: "break-word",
                lineHeight: 1.4,
                pr: message.mine ? 3 : 0,
              }}
            >
              {message.text}
            </Typography>

            {/* Message metadata */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end",
                gap: 0.5,
                mt: 0.5,
              }}
            >
              {message.edited && (
                <Typography variant="caption" sx={{ opacity: 0.7, mr: 0.5 }}>
                  (edited)
                </Typography>
              )}
              
              <Typography
                variant="caption"
                sx={{
                  opacity: 0.8,
                  fontSize: "0.7rem",
                }}
              >
                {formatTime(message.timestamp)}
              </Typography>

              {message.mine && (
                <Box sx={{ display: "flex", alignItems: "center", ml: 0.5 }}>
                  {message.read ? (
                    <DoneAll
                      sx={{
                        fontSize: 14,
                        color: "#60a5fa",
                      }}
                    />
                  ) : message.sent ? (
                    <CheckCircle
                      sx={{
                        fontSize: 14,
                        opacity: 0.7,
                      }}
                    />
                  ) : (
                    <Schedule
                      sx={{
                        fontSize: 14,
                        opacity: 0.5,
                      }}
                    />
                  )}
                </Box>
              )}
            </Box>

            {/* Message tail */}
            <Box
              sx={{
                position: "absolute",
                bottom: 0,
                [message.mine ? "right" : "left"]: -6,
                width: 12,
                height: 12,
                bgcolor: "inherit",
                clipPath: "polygon(100% 0, 0 0, 100% 100%)",
                transform: message.mine ? "rotate(90deg)" : "rotate(0deg)",
              }}
            />
          </Box>

          {/* Star indicator */}
          {starred && (
            <Tooltip title="Starred">
              <Star
                sx={{
                  position: "absolute",
                  top: -4,
                  [message.mine ? "left" : "right"]: -4,
                  fontSize: 14,
                  color: "warning.main",
                  bgcolor: "background.paper",
                  borderRadius: "50%",
                  p: 0.5,
                  boxShadow: 1,
                }}
              />
            </Tooltip>
          )}
        </Box>

        {/* Message Actions (hover) */}
        <Box
          className="message-actions"
          sx={{
            position: "absolute",
            top: "50%",
            transform: "translateY(-50%)",
            [message.mine ? "left" : "right"]: message.mine ? "-40px" : "-40px",
            display: "flex",
            gap: 0.5,
            opacity: 0,
            transition: "opacity 0.2s ease",
            bgcolor: "background.paper",
            borderRadius: 2,
            p: 0.5,
            boxShadow: 1,
          }}
        >
          <Tooltip title="Reply">
            <IconButton size="small" onClick={() => console.log("Reply to:", message.id)}>
              <Reply fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title={starred ? "Unstar" : "Star"}>
            <IconButton
              size="small"
              onClick={() => setStarred(!starred)}
              sx={{ color: starred ? "warning.main" : "inherit" }}
            >
              {starred ? <Star fontSize="small" /> : <StarBorder fontSize="small" />}
            </IconButton>
          </Tooltip>
          <Tooltip title="More">
            <IconButton size="small" onClick={handleMenuClick}>
              <MoreVert fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </Fade>
  );
}
import { Box, TextField, IconButton, Avatar } from "@mui/material";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useDispatch } from "react-redux";
import { useState } from "react";

import { toggleTheme } from "../../store/theme.slice";
import NotificationBell from "../common/NotificationBell";
import NotificationsPanel from "../../features/dashboard/NotificationsPanel";

export default function Header() {
  const dispatch = useDispatch();
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <Box
      sx={{
        height: 64,
        display: "flex",
        alignItems: "center",
        px: 2,
        gap: 2,
        bgcolor: "#020617",
        borderBottom: "1px solid #1e293b",
      }}
    >
      {/* SEARCH */}
      <TextField
        size="small"
        placeholder="Search for people, chats, or files..."
        sx={{ flex: 1 }}
      />

      {/* NOTIFICATIONS */}
      <NotificationBell
        count={3}
        onClick={() => setShowNotifications((prev) => !prev)}
      />

      {/* DARK MODE */}
      <IconButton onClick={() => dispatch(toggleTheme())}>
        <DarkModeIcon />
      </IconButton>

      {/* USER AVATAR */}
      <Avatar sx={{ bgcolor: "#2563eb" }}>VT</Avatar>

      {/* NOTIFICATIONS PANEL */}
      {showNotifications && (
        <Box
          sx={{
            position: "absolute",
            top: 64,
            right: 16,
            width: 300,
            zIndex: 1000,
          }}
        >
          <NotificationsPanel />
        </Box>
      )}
    </Box>
  );
}

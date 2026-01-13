import { Box, TextField, IconButton, Avatar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { useDispatch } from "react-redux";
import { useState } from "react";

import { toggleTheme } from "../../store/theme.slice";
import NotificationBell from "../common/NotificationBell";
import NotificationsPanel from "../../features/dashboard/NotificationsPanel";

export default function Header({ onMenuClick }) {
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
        bgcolor: "background.paper",
        borderBottom: "1px solid",
        borderColor: "divider",
        position: "relative",
      }}
    >
      {/* ☰ HAMBURGER */}
      <IconButton onClick={onMenuClick}>
        <MenuIcon />
      </IconButton>

      {/* SEARCH */}
      <TextField
        size="small"
        placeholder="Search for people, chats, or files..."
        sx={{ flex: 1 }}
      />

      {/* NOTIFICATIONS */}
      <NotificationBell
        count={3}
        onClick={() => setShowNotifications((p) => !p)}
      />

      {/* THEME TOGGLE */}
      <IconButton onClick={() => dispatch(toggleTheme())}>
        <DarkModeIcon />
      </IconButton>

      {/* USER */}
      <Avatar sx={{ bgcolor: "primary.main" }}>VT</Avatar>

      {/* NOTIFICATIONS PANEL */}
      {showNotifications && (
        <Box
          sx={{
            position: "absolute",
            top: 64,
            right: 16,
            width: 300,
            bgcolor: "background.paper",
            boxShadow: 3,
            borderRadius: 1,
            zIndex: 1200,
          }}
        >
          <NotificationsPanel />
        </Box>
      )}
    </Box>
  );
}

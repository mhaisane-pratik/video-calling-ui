import { Box, Typography, List, ListItemButton, ListItemText, Avatar } from "@mui/material";
import { useState } from "react";
import ProfileSettings from "./ProfileSettings";
import NotificationSettings from "./NotificationSettings";
import AppearanceSettings from "./AppearanceSettings";
import SecuritySettings from "./SecuritySettings";

export default function Settings() {
  const [tab, setTab] = useState("profile");

  return (
    <Box sx={{ display: "flex", height: "100vh", bgcolor: "#0f172a", color: "#fff" }}>
      
      {/* LEFT SETTINGS MENU */}
      <Box sx={{ width: 280, bgcolor: "#020617", p: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          Settings
        </Typography>

        <List>
          <ListItemButton selected={tab === "profile"} onClick={() => setTab("profile")}>
            <ListItemText primary="Profile" />
          </ListItemButton>
          <ListItemButton selected={tab === "notifications"} onClick={() => setTab("notifications")}>
            <ListItemText primary="Notifications" />
          </ListItemButton>
          <ListItemButton selected={tab === "security"} onClick={() => setTab("security")}>
            <ListItemText primary="Security" />
          </ListItemButton>
          <ListItemButton selected={tab === "appearance"} onClick={() => setTab("appearance")}>
            <ListItemText primary="Appearance" />
          </ListItemButton>
          <ListItemButton>
            <ListItemText primary="Log out" />
          </ListItemButton>
        </List>
      </Box>

      {/* RIGHT CONTENT */}
      <Box sx={{ flex: 1, p: 4 }}>
        {tab === "profile" && <ProfileSettings />}
        {tab === "notifications" && <NotificationSettings />}
        {tab === "security" && <SecuritySettings />}
        {tab === "appearance" && <AppearanceSettings />}
      </Box>
    </Box>
  );
}

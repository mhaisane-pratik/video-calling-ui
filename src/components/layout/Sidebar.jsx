import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Typography,
  Avatar,
  Divider,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ChatIcon from "@mui/icons-material/Chat";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        width: 280,
        height: "100vh",
        bgcolor: "background.paper",
        borderRight: "1px solid",
        borderColor: "divider",
      }}
    >
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" fontWeight={700}>
          Verzat Meet
        </Typography>
      </Box>

      <Divider />

      <List>
        {[
          { label: "Home", path: "/dashboard", icon: <HomeIcon /> },
          { label: "Chat", path: "/chat", icon: <ChatIcon /> },
          { label: "Calendar", path: "/calendar", icon: <CalendarTodayIcon /> },
          { label: "Recordings", path: "/recordings", icon: <VideoLibraryIcon /> },
          { label: "Settings", path: "/settings", icon: <SettingsIcon /> },
        ].map((item) => (
          <ListItemButton key={item.label} onClick={() => navigate(item.path)}>
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText primary={item.label} />
          </ListItemButton>
        ))}
      </List>

      <Divider />

      <Box sx={{ p: 2, display: "flex", alignItems: "center", gap: 2 }}>
        <Avatar>V</Avatar>
        <Typography>Verzat</Typography>
      </Box>
    </Box>
  );
}

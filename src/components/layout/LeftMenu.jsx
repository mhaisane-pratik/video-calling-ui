import {
  Drawer,
  Box,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ChatIcon from "@mui/icons-material/Chat";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import SettingsIcon from "@mui/icons-material/Settings";
import { useNavigate } from "react-router-dom";

export default function Sidebar({ open, onClose }) {
  const navigate = useNavigate();

  return (
    <Drawer
      open={open}
      onClose={onClose}
      variant="temporary"
      PaperProps={{
        sx: {
          width: 280,
          bgcolor: "background.paper",
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        <List>
          {[
            { label: "Home", path: "/dashboard", icon: <HomeIcon /> },
            { label: "Chat", path: "/chat", icon: <ChatIcon /> },
            { label: "Calendar", path: "/calendar", icon: <CalendarTodayIcon /> },
            { label: "Settings", path: "/settings", icon: <SettingsIcon /> },
          ].map((item) => (
            <ListItemButton
              key={item.label}
              onClick={() => {
                navigate(item.path);
                onClose();
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}
        </List>
      </Box>
    </Drawer>
  );
}

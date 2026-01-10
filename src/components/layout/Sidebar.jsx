import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Typography,
  Avatar,
  Divider,
  Chip,
  Tooltip,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import ChatIcon from "@mui/icons-material/Chat";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import VideoLibraryIcon from "@mui/icons-material/VideoLibrary";
import SettingsIcon from "@mui/icons-material/Settings";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Sidebar() {
  const navigate = useNavigate();
  const role = useSelector((s) => s?.auth?.user?.role);

  const menuItems = [
    { path: "/dashboard", icon: <HomeIcon />, label: "Home", active: true },
    { path: "/chat", icon: <ChatIcon />, label: "Chat" },
    { path: "/calendar", icon: <CalendarTodayIcon />, label: "Calendar" },
    { path: "/recordings", icon: <VideoLibraryIcon />, label: "Recordings" },
    { path: "/settings", icon: <SettingsIcon />, label: "Settings" },
  ];

  return (
    <Box sx={{ 
      width: 280, 
      height: "100vh", 
      bgcolor: "#020617", 
      borderRight: "1px solid #1e293b",
      display: "flex",
      flexDirection: "column",
      background: "linear-gradient(180deg, #020617 0%, #0f172a 100%)",
      position: "relative",
      overflow: "hidden",
      "&::before": {
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "1px",
        background: "linear-gradient(90deg, transparent, #334155, transparent)",
      }
    }}>
      {/* Logo/Header Section */}
      <Box sx={{ 
        p: 3, 
        display: "flex", 
        alignItems: "center", 
        gap: 2,
        position: "relative",
        overflow: "hidden",
      }}>
        <Box
          sx={{
            width: 40,
            height: 40,
            borderRadius: "12px",
            background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#ffffff",
            fontSize: "1.2rem",
            fontWeight: "bold",
            boxShadow: "0 4px 15px rgba(59, 130, 246, 0.3)",
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "scale(1.05)",
              boxShadow: "0 6px 20px rgba(59, 130, 246, 0.4)",
            }
          }}
        >
          V
        </Box>
        <Box>
          <Typography variant="h6" sx={{ 
            color: "#f1f5f9",
            fontWeight: 700,
            background: "linear-gradient(90deg, #e2e8f0, #94a3b8)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            Verzat Meet
          </Typography>
          <Typography variant="caption" sx={{ color: "#64748b", fontSize: "0.75rem" }}>
            Professional Meetings
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ borderColor: "#1e293b", mx: 2 }} />

      {/* User Profile Section */}
      <Box sx={{ p: 3, display: "flex", alignItems: "center", gap: 2, position: "relative" }}>
        <Avatar
          sx={{
            width: 44,
            height: 44,
            bgcolor: "transparent",
            border: "2px solid transparent",
            background: "linear-gradient(#0f172a, #0f172a) padding-box, linear-gradient(135deg, #3b82f6, #8b5cf6) border-box",
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "rotate(5deg) scale(1.05)",
            }
          }}
        >
          <Typography sx={{ 
            fontWeight: 600,
            background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}>
            V
          </Typography>
        </Avatar>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography variant="subtitle1" sx={{ 
            color: "#f1f5f9", 
            fontWeight: 600,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis"
          }}>
            Verzat
          </Typography>
          <Chip
            label={role === "admin" ? "Administrator" : "User"}
            size="small"
            sx={{
              height: 20,
              fontSize: "0.7rem",
              fontWeight: 500,
              bgcolor: role === "admin" ? "rgba(239, 68, 68, 0.2)" : "rgba(59, 130, 246, 0.2)",
              color: role === "admin" ? "#f87171" : "#60a5fa",
              border: role === "admin" ? "1px solid rgba(239, 68, 68, 0.3)" : "1px solid rgba(59, 130, 246, 0.3)",
              '& .MuiChip-label': {
                px: 1,
              }
            }}
          />
        </Box>
      </Box>

      <Divider sx={{ borderColor: "#1e293b", mx: 2 }} />

      {/* Navigation Menu */}
      <List sx={{ 
        p: 2, 
        flex: 1,
        "& .MuiListItemButton-root": {
          borderRadius: "10px",
          my: 0.5,
          mx: 1,
          px: 2,
          py: 1,
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
          border: "1px solid transparent",
          "&:hover": {
            bgcolor: "rgba(59, 130, 246, 0.1)",
            borderColor: "rgba(59, 130, 246, 0.3)",
            transform: "translateX(4px)",
            "& .MuiListItemIcon-root": {
              transform: "scale(1.1)",
            }
          },
          "&.active": {
            bgcolor: "rgba(59, 130, 246, 0.15)",
            borderColor: "rgba(59, 130, 246, 0.5)",
            "& .MuiListItemIcon-root": {
              color: "#60a5fa",
            },
            "& .MuiListItemText-primary": {
              color: "#f1f5f9",
              fontWeight: 600,
            }
          }
        },
        "& .MuiListItemIcon-root": {
          minWidth: 40,
          color: "#94a3b8",
          transition: "all 0.3s ease",
        },
        "& .MuiListItemText-primary": {
          color: "#cbd5e1",
          fontSize: "0.95rem",
          fontWeight: 500,
          transition: "color 0.3s ease",
        }
      }}>
        {menuItems.map((item) => (
          <Tooltip title={item.label} placement="right" key={item.path}>
            <ListItemButton 
              className={item.active ? "active" : ""}
              onClick={() => navigate(item.path)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </Tooltip>
        ))}

        {role === "admin" && (
          <Tooltip title="Admin Panel" placement="right">
            <ListItemButton onClick={() => navigate("/admin")}>
              <ListItemIcon>
                <AdminPanelSettingsIcon />
              </ListItemIcon>
              <ListItemText primary="Admin" />
              <Chip
                label="New"
                size="small"
                sx={{
                  height: 18,
                  fontSize: "0.65rem",
                  bgcolor: "rgba(16, 185, 129, 0.2)",
                  color: "#34d399",
                  ml: 1,
                }}
              />
            </ListItemButton>
          </Tooltip>
        )}
      </List>

      <Divider sx={{ borderColor: "#1e293b", mx: 2 }} />

      {/* Footer Section */}
      <Box sx={{ p: 2 }}>
        <Tooltip title="Logout" placement="right">
          <ListItemButton 
            onClick={() => {}}
            sx={{
              borderRadius: "10px",
              px: 2,
              py: 1.5,
              "&:hover": {
                bgcolor: "rgba(239, 68, 68, 0.1)",
                borderColor: "rgba(239, 68, 68, 0.3)",
                "& .MuiListItemIcon-root": {
                  color: "#f87171",
                },
                "& .MuiListItemText-primary": {
                  color: "#f87171",
                }
              }
            }}
          >
            <ListItemIcon sx={{ color: "#94a3b8" }}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText 
              primary="Logout" 
              sx={{
                "& .MuiTypography-root": {
                  color: "#cbd5e1",
                  fontSize: "0.95rem",
                  fontWeight: 500,
                }
              }}
            />
          </ListItemButton>
        </Tooltip>
      </Box>

      {/* Decorative Elements */}
      <Box
        sx={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "1px",
          background: "linear-gradient(90deg, transparent, #334155, transparent)",
        }}
      />
    </Box>
  );
}
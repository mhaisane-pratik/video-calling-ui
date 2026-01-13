import { useState } from "react";
import {
  Box,
  Typography,
  Menu,
  MenuItem,
  IconButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Fade,
} from "@mui/material";
import {
  Circle,
  Brightness1,
  DoNotDisturb,
  RemoveCircle,
  HourglassEmpty,
  WbSunny,
  NightsStay,
} from "@mui/icons-material";

const statusOptions = [
  { value: "online", label: "Online", color: "success.main", icon: <Circle fontSize="small" /> },
  { value: "away", label: "Away", color: "warning.main", icon: <WbSunny fontSize="small" /> },
  { value: "busy", label: "Busy", color: "error.main", icon: <DoNotDisturb fontSize="small" /> },
  { value: "offline", label: "Offline", color: "text.disabled", icon: <RemoveCircle fontSize="small" /> },
  { value: "invisible", label: "Invisible", color: "text.secondary", icon: <NightsStay fontSize="small" /> },
];

export default function StatusIndicator() {
  const [status, setStatus] = useState("online");
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    handleClose();
  };

  const currentStatus = statusOptions.find(s => s.value === status);

  return (
    <>
      <Tooltip title="Change status">
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{
            p: 0.5,
            "&:hover": { bgcolor: "transparent" },
          }}
        >
          <Brightness1
            sx={{
              fontSize: 12,
              color: currentStatus.color,
              filter: "drop-shadow(0 0 4px currentColor)",
            }}
          />
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        TransitionComponent={Fade}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
      >
        <Box sx={{ px: 2, py: 1 }}>
          <Typography variant="caption" color="text.secondary">
            SET YOUR STATUS
          </Typography>
        </Box>
        {statusOptions.map((option) => (
          <MenuItem
            key={option.value}
            onClick={() => handleStatusChange(option.value)}
            selected={status === option.value}
            sx={{
              minWidth: 180,
              "&.Mui-selected": {
                bgcolor: "action.selected",
              },
            }}
          >
            <ListItemIcon sx={{ color: option.color }}>
              {option.icon}
            </ListItemIcon>
            <ListItemText primary={option.label} />
            {status === option.value && (
              <Circle sx={{ fontSize: 8, color: option.color }} />
            )}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
import { IconButton, Badge } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";

export default function NotificationBell({ count, onClick }) {
  return (
    <IconButton onClick={onClick}>
      <Badge badgeContent={count} color="error">
        <NotificationsIcon />
      </Badge>
    </IconButton>
  );
}

import { Typography } from "@mui/material";

export default function PermissionBanner({ canEdit }) {
  return (
    <Typography variant="caption" color={canEdit ? "green" : "red"}>
      {canEdit ? "Edit Enabled" : "View Only"}
    </Typography>
  );
}

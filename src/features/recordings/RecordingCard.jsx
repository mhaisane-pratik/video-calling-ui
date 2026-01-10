import {
  Card,
  Typography,
  Box,
  IconButton,
  Chip,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

export default function RecordingCard({ recording }) {
  return (
    <Card
      sx={{
        p: 2,
        bgcolor: "#020617",
        mb: 2,
        display: "flex",
        alignItems: "center",
        gap: 2,
        "&:hover": { bgcolor: "#1e293b" },
      }}
    >
      {/* THUMBNAIL */}
      <Box
        sx={{
          width: 120,
          height: 70,
          bgcolor: "#0f172a",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 1,
          position: "relative",
        }}
      >
        <PlayArrowIcon fontSize="large" />
        <Chip
          label={recording.duration}
          size="small"
          sx={{
            position: "absolute",
            bottom: 4,
            right: 4,
            bgcolor: "#020617",
          }}
        />
      </Box>

      {/* INFO */}
      <Box sx={{ flex: 1 }}>
        <Typography variant="h6">{recording.title}</Typography>
        <Typography variant="caption">{recording.date}</Typography>
      </Box>

      {/* ACTIONS */}
      <Box>
        <IconButton><PlayArrowIcon /></IconButton>
        <IconButton><EditIcon /></IconButton>
        <IconButton><DeleteIcon color="error" /></IconButton>
      </Box>
    </Card>
  );
}

import { Box, IconButton } from "@mui/material";
import BrushIcon from "@mui/icons-material/Brush";
import CropSquareIcon from "@mui/icons-material/CropSquare";
import CircleIcon from "@mui/icons-material/Circle";

const colors = ["#000000", "#ef4444", "#22c55e", "#3b82f6", "#facc15"];

export default function WhiteboardToolbar({
  tool,
  setTool,
  color,
  setColor,
}) {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 1,
        p: 1,
        bgcolor: "#020617",
        borderBottom: "1px solid #1e293b",
      }}
    >
      {/* PEN */}
      <IconButton onClick={() => setTool("pen")}>
        <BrushIcon color={tool === "pen" ? "primary" : "inherit"} />
      </IconButton>

      {/* RECTANGLE */}
      <IconButton onClick={() => setTool("rect")}>
        <CropSquareIcon color={tool === "rect" ? "primary" : "inherit"} />
      </IconButton>

      {/* CIRCLE */}
      <IconButton onClick={() => setTool("circle")}>
        <CircleIcon color={tool === "circle" ? "primary" : "inherit"} />
      </IconButton>

      {/* COLORS */}
      {colors.map((c) => (
        <Box
          key={c}
          onClick={() => setColor(c)}
          sx={{
            width: 20,
            height: 20,
            bgcolor: c,
            borderRadius: "50%",
            cursor: "pointer",
            border: color === c ? "2px solid #fff" : "none",
          }}
        />
      ))}
    </Box>
  );
}

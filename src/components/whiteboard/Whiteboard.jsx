import { Box, Typography } from "@mui/material";
import { useRef, useState } from "react";
import WhiteboardToolbar from "./WhiteboardToolbar";

export default function Whiteboard() {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);

  const [drawing, setDrawing] = useState(false);
  const [tool, setTool] = useState("pen");
  const [color, setColor] = useState("#000000");

  // demo participant
  const participant = "Alex Morgan";

  function startDraw(e) {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.lineCap = "round";

    ctxRef.current = {
      ctx,
      startX: e.nativeEvent.offsetX,
      startY: e.nativeEvent.offsetY,
    };

    setDrawing(true);
  }

  function draw(e) {
    if (!drawing) return;
    const { ctx, startX, startY } = ctxRef.current;

    if (tool === "pen") {
      ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    }
  }

  function stopDraw(e) {
    if (!drawing) return;
    const { ctx, startX, startY } = ctxRef.current;
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;

    if (tool === "rect") {
      ctx.strokeRect(startX, startY, x - startX, y - startY);
    }

    if (tool === "circle") {
      const r = Math.hypot(x - startX, y - startY);
      ctx.beginPath();
      ctx.arc(startX, startY, r, 0, Math.PI * 2);
      ctx.stroke();
    }

    setDrawing(false);
    ctx.beginPath();
  }

  return (
    <Box sx={{ height: "100%", bgcolor: "#0f172a" }}>
      <WhiteboardToolbar
        tool={tool}
        setTool={setTool}
        color={color}
        setColor={setColor}
      />

      <Typography variant="caption" sx={{ p: 1 }}>
        {participant} is drawing
      </Typography>

      <canvas
        ref={canvasRef}
        width={320}
        height={300}
        style={{ background: "#fff", margin: 8 }}
        onMouseDown={startDraw}
        onMouseMove={draw}
        onMouseUp={stopDraw}
      />
    </Box>
  );
}

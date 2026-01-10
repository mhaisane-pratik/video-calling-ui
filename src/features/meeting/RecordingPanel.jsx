import { Box, Typography, Button } from "@mui/material";
import { useState, useRef } from "react";

export default function RecordingPanel({ streamRef }) {
  const recorder = useRef(null);
  const chunks = useRef([]);
  const [recording, setRecording] = useState(false);

  function start() {
    recorder.current = new MediaRecorder(streamRef.current);
    recorder.current.ondataavailable = (e) =>
      chunks.current.push(e.data);
    recorder.current.start();
    setRecording(true);
  }

  function stop() {
    recorder.current.stop();
    setRecording(false);

    const blob = new Blob(chunks.current, { type: "video/webm" });
    const url = URL.createObjectURL(blob);
    window.open(url);
    chunks.current = [];
  }

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h6">Recording</Typography>

      <Button onClick={recording ? stop : start} variant="contained">
        {recording ? "Stop Recording" : "Start Recording"}
      </Button>
    </Box>
  );
}

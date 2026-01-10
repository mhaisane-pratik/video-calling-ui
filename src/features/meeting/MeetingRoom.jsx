import { useState, useRef } from "react";
import { Box } from "@mui/material";

import VideoGrid from "../../components/meeting/VideoGrid";
import ControlBar from "../../components/meeting/ControlBar";
import ParticipantList from "../../components/meeting/ParticipantList";
import ChatPanel from "../../components/chat/ChatPanel";
import Whiteboard from "../../components/whiteboard/Whiteboard";
import EngagementMeter from "../../components/meeting/EngagementMeter";
import RecordingPanel from "./RecordingPanel";

export default function MeetingRoom() {
  const [panel, setPanel] = useState("participants");
  // participants | chat | whiteboard | engagement | recording

  const [mic, setMic] = useState(true);
  const [cam, setCam] = useState(true);

  // ✅ SHARED MEDIA STREAM (camera / screen)
  const streamRef = useRef(null);

  return (
    <Box sx={{ display: "flex", height: "100vh", bgcolor: "#0f172a" }}>
      {/* VIDEO AREA */}
      <Box sx={{ flex: 3, p: 1 }}>
        <VideoGrid camOn={cam} streamRef={streamRef} />
      </Box>

      {/* RIGHT SIDE PANEL */}
      <Box
        sx={{
          width: 360,
          bgcolor: "#020617",
          borderLeft: "1px solid #1e293b",
          overflowY: "auto",
        }}
      >
        {panel === "participants" && <ParticipantList />}
        {panel === "chat" && <ChatPanel />}
        {panel === "whiteboard" && <Whiteboard />}
        {panel === "engagement" && <EngagementMeter score={78} />}
        {panel === "recording" && <RecordingPanel streamRef={streamRef} />}
      </Box>

      {/* CONTROL BAR */}
      <ControlBar
        micOn={mic}
        camOn={cam}
        toggleMic={() => setMic((p) => !p)}
        toggleCam={() => setCam((p) => !p)}
        setPanel={setPanel}
        streamRef={streamRef}   // ✅ REQUIRED FOR SCREEN SHARE
      />
    </Box>
  );
}

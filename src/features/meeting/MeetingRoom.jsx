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
  const [mic, setMic] = useState(true);
  const [cam, setCam] = useState(true);

  const streamRef = useRef(null);

  return (
    <Box sx={{ display: "flex", height: "100vh", bgcolor: "background.default" }}>
      <Box sx={{ flex: 3, p: 1 }}>
        <VideoGrid camOn={cam} streamRef={streamRef} />
      </Box>

      <Box
        sx={{
          width: 360,
          bgcolor: "background.paper",
          borderLeft: "1px solid",
          borderColor: "divider",
        }}
      >
        {panel === "participants" && <ParticipantList />}
        {panel === "chat" && <ChatPanel />}
        {panel === "whiteboard" && <Whiteboard />}
        {panel === "engagement" && <EngagementMeter score={78} />}
        {panel === "recording" && <RecordingPanel streamRef={streamRef} />}
      </Box>

      <ControlBar
        micOn={mic}
        camOn={cam}
        toggleMic={() => setMic((p) => !p)}
        toggleCam={() => setCam((p) => !p)}
        setPanel={setPanel}
        streamRef={streamRef}
      />
    </Box>
  );
}

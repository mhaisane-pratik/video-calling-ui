import { Box, Typography } from "@mui/material";
import Sidebar from "../../components/layout/Sidebar";
import Header from "../../components/layout/Header";
import RecordingCard from "./RecordingCard";

const recordings = [
  {
    id: 1,
    title: "Sprint Planning",
    date: "Jan 8, 2026",
    duration: "45 min",
  },
  {
    id: 2,
    title: "Design Review",
    date: "Jan 7, 2026",
    duration: "30 min",
  },
  {
    id: 3,
    title: "Client Demo",
    date: "Jan 5, 2026",
    duration: "1h 10m",
  },
];

export default function Recordings() {
  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#0f172a" }}>
      <Sidebar />

      <Box sx={{ flex: 1 }}>
        <Header />

        <Box sx={{ p: 3 }}>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Recordings
          </Typography>

          {recordings.map((rec) => (
            <RecordingCard key={rec.id} recording={rec} />
          ))}
        </Box>
      </Box>
    </Box>
  );
}

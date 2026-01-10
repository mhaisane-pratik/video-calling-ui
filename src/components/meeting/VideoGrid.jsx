import { Box } from "@mui/material";
import ParticipantTile from "./ParticipantTile";
import { useEffect, useRef, useState } from "react";

const NAMES = [
  "Alex Morgan",
  "Sarah Jenkins",
  "Michael Chen",
  "Emily Davis",
  "John Wilson",
];

// ==================== NEW COMPONENTS ====================

// Video Grid Controls Component
const VideoGridControls = () => (
  <Box sx={{
    position: "absolute",
    top: 20,
    right: 20,
    zIndex: 10,
    display: "flex",
    gap: 1,
    bgcolor: "rgba(15, 23, 42, 0.8)",
    backdropFilter: "blur(10px)",
    borderRadius: "12px",
    p: 1.5,
    border: "1px solid rgba(59, 130, 246, 0.3)",
  }}>
    <Box sx={{
      display: "flex",
      alignItems: "center",
      gap: 1,
      px: 1.5,
      py: 0.5,
      borderRadius: "8px",
      bgcolor: "rgba(59, 130, 246, 0.1)",
      border: "1px solid rgba(59, 130, 246, 0.2)",
    }}>
      <Box sx={{
        width: 8,
        height: 8,
        borderRadius: "50%",
        bgcolor: "#10b981",
        animation: "pulse 2s infinite"
      }} />
      <Box sx={{ fontSize: "0.75rem", color: "#94a3b8", fontWeight: 500 }}>
        5 Participants
      </Box>
    </Box>
    <Box sx={{
      display: "flex",
      alignItems: "center",
      px: 1.5,
      py: 0.5,
      borderRadius: "8px",
      bgcolor: "rgba(139, 92, 246, 0.1)",
      border: "1px solid rgba(139, 92, 246, 0.2)",
      cursor: "pointer",
      "&:hover": { bgcolor: "rgba(139, 92, 246, 0.2)" }
    }}>
      <Box sx={{ fontSize: "0.75rem", color: "#c084fc", fontWeight: 500 }}>
        🖼️ Grid
      </Box>
    </Box>
  </Box>
);

// Active Speaker Highlight
const ActiveSpeakerHighlight = ({ activeCount }) => (
  <Box sx={{
    position: "absolute",
    top: 20,
    left: 20,
    zIndex: 10,
    display: "flex",
    alignItems: "center",
    gap: 1,
    bgcolor: "rgba(59, 130, 246, 0.1)",
    backdropFilter: "blur(10px)",
    borderRadius: "12px",
    p: 1.5,
    border: "1px solid rgba(59, 130, 246, 0.3)",
  }}>
    <Box sx={{
      width: 12,
      height: 12,
      borderRadius: "50%",
      bgcolor: "#3b82f6",
      animation: "pulse 1.5s infinite",
      "@keyframes pulse": {
        "0%, 100%": { opacity: 1, transform: "scale(1)" },
        "50%": { opacity: 0.5, transform: "scale(1.2)" }
      }
    }} />
    <Box sx={{ fontSize: "0.875rem", color: "#e2e8f0", fontWeight: 600 }}>
      {activeCount} Active Speaker{activeCount !== 1 ? 's' : ''}
    </Box>
  </Box>
);

// Video Quality Indicator
const VideoQualityIndicator = () => {
  const [quality, setQuality] = useState('HD');
  
  useEffect(() => {
    const qualities = ['HD', 'Full HD', '4K'];
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % qualities.length;
      setQuality(qualities[index]);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <Box sx={{
      position: "absolute",
      bottom: 20,
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: 10,
      display: "flex",
      alignItems: "center",
      gap: 1,
      bgcolor: "rgba(15, 23, 42, 0.8)",
      backdropFilter: "blur(10px)",
      borderRadius: "12px",
      p: 1.5,
      border: "1px solid rgba(59, 130, 246, 0.3)",
    }}>
      <Box sx={{
        width: 8,
        height: 8,
        borderRadius: "50%",
        bgcolor: "#10b981",
      }} />
      <Box sx={{ fontSize: "0.875rem", color: "#e2e8f0", fontWeight: 500 }}>
        {quality} • 60 FPS
      </Box>
    </Box>
  );
};

// Floating Audio Visualizer
const AudioVisualizer = () => {
  const [bars, setBars] = useState([1, 2, 3, 4, 5, 4, 3, 2, 1]);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setBars(prev => prev.map(() => Math.floor(Math.random() * 5) + 1));
    }, 300);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <Box sx={{
      position: "absolute",
      bottom: 80,
      right: 20,
      zIndex: 10,
      display: "flex",
      alignItems: "center",
      gap: 1,
      bgcolor: "rgba(15, 23, 42, 0.8)",
      backdropFilter: "blur(10px)",
      borderRadius: "12px",
      p: 2,
      border: "1px solid rgba(59, 130, 246, 0.3)",
    }}>
      {bars.map((height, index) => (
        <Box
          key={index}
          sx={{
            width: 3,
            height: `${height * 4}px`,
            bgcolor: index === 4 ? "#3b82f6" : "#60a5fa",
            borderRadius: "2px",
            transition: "height 0.3s ease",
          }}
        />
      ))}
    </Box>
  );
};

// Network Status Indicator
const NetworkStatus = () => {
  const [latency, setLatency] = useState(28);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setLatency(Math.floor(Math.random() * 20) + 20);
    }, 3000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <Box sx={{
      position: "absolute",
      top: 80,
      left: 20,
      zIndex: 10,
      display: "flex",
      alignItems: "center",
      gap: 1.5,
      bgcolor: "rgba(15, 23, 42, 0.8)",
      backdropFilter: "blur(10px)",
      borderRadius: "12px",
      p: 1.5,
      border: "1px solid rgba(16, 185, 129, 0.3)",
    }}>
      <Box sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 24,
        height: 24,
        borderRadius: "6px",
        bgcolor: latency < 30 ? "rgba(16, 185, 129, 0.2)" : "rgba(245, 158, 11, 0.2)",
        border: `1px solid ${latency < 30 ? "rgba(16, 185, 129, 0.3)" : "rgba(245, 158, 11, 0.3)"}`,
      }}>
        <Box sx={{ 
          fontSize: "0.75rem", 
          color: latency < 30 ? "#34d399" : "#fbbf24",
          fontWeight: 600 
        }}>
          {latency}ms
        </Box>
      </Box>
      <Box sx={{ 
        fontSize: "0.75rem", 
        color: "#94a3b8",
        fontWeight: 500 
      }}>
        Network Latency
      </Box>
    </Box>
  );
};

// Recording Indicator
const RecordingIndicator = () => (
  <Box sx={{
    position: "absolute",
    bottom: 20,
    right: 20,
    zIndex: 10,
    display: "flex",
    alignItems: "center",
    gap: 1,
    bgcolor: "rgba(239, 68, 68, 0.1)",
    backdropFilter: "blur(10px)",
    borderRadius: "12px",
    p: 1.5,
    border: "1px solid rgba(239, 68, 68, 0.3)",
    animation: "pulse 2s infinite",
  }}>
    <Box sx={{
      width: 8,
      height: 8,
      borderRadius: "50%",
      bgcolor: "#ef4444",
    }} />
    <Box sx={{ 
      fontSize: "0.875rem", 
      color: "#f87171",
      fontWeight: 500 
    }}>
      ● Recording
    </Box>
  </Box>
);

// Grid Background Effects
const GridEffects = () => (
  <>
    <Box sx={{
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "radial-gradient(circle at 50% 50%, rgba(59, 130, 246, 0.03), transparent 70%)",
      pointerEvents: "none",
      zIndex: 0,
    }} />
    <Box sx={{
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "linear-gradient(45deg, transparent 49.5%, rgba(59, 130, 246, 0.02) 49.5%, rgba(59, 130, 246, 0.02) 50.5%, transparent 50.5%)",
      backgroundSize: "20px 20px",
      pointerEvents: "none",
      zIndex: 0,
      opacity: 0.3,
    }} />
  </>
);

// ==================== ORIGINAL COMPONENT ====================

export default function VideoGrid({ camOn, streamRef }) {
  const videoRef = useRef(null);

  const [participants] = useState(
    NAMES.map((name, i) => ({
      id: i,
      name,
      mic: Math.random() > 0.3,
      speaking: Math.random() > 0.7,
      local: i === 0,
    }))
  );

  // Calculate active speakers
  const activeSpeakers = participants.filter(p => p.speaking).length;

  // Local camera only for YOU
  useEffect(() => {
    async function startCamera() {
      if (!streamRef.current) {
        streamRef.current =
          await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
          });
      }
      videoRef.current.srcObject = streamRef.current;
    }
    startCamera();
  }, []);

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: 2,
        position: "relative", // Added for positioning new elements
        minHeight: "500px",
        p: 1,
      }}
    >
      {/* New: Grid Background Effects */}
      <GridEffects />
      
      {/* New: Video Grid Controls */}
      <VideoGridControls />
      
      {/* New: Active Speaker Highlight */}
      <ActiveSpeakerHighlight activeCount={activeSpeakers} />
      
      {/* New: Network Status */}
      <NetworkStatus />
      
      {/* Original Video Grid Items */}
      {participants.map((p) =>
        p.local ? (
          <Box
            key={p.id}
            sx={{ 
              bgcolor: "#000", 
              borderRadius: 2, 
              overflow: "hidden",
              position: "relative",
              border: "2px solid rgba(59, 130, 246, 0.3)",
              transition: "border-color 0.3s ease",
              "&:hover": { borderColor: "rgba(59, 130, 246, 0.6)" }
            }}
          >
            {/* "You" indicator */}
            <Box sx={{
              position: "absolute",
              top: 10,
              left: 10,
              bgcolor: "rgba(59, 130, 246, 0.8)",
              color: "#ffffff",
              px: 1.5,
              py: 0.5,
              borderRadius: "12px",
              fontSize: "0.75rem",
              fontWeight: 600,
              zIndex: 2,
              backdropFilter: "blur(4px)",
            }}>
              YOU
            </Box>
            
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              style={{ 
                width: "100%", 
                height: "100%", 
                objectFit: "cover",
                minHeight: "220px"
              }}
            />
          </Box>
        ) : (
          <ParticipantTile key={p.id} user={p} isActive={p.speaking} />
        )
      )}
      
      {/* New: Audio Visualizer */}
      <AudioVisualizer />
      
      {/* New: Video Quality Indicator */}
      <VideoQualityIndicator />
      
      {/* New: Recording Indicator */}
      <RecordingIndicator />
      
      {/* New: Zoom Controls (Minimal) */}
      <Box sx={{
        position: "absolute",
        bottom: 80,
        left: 20,
        display: "flex",
        alignItems: "center",
        gap: 1,
        bgcolor: "rgba(15, 23, 42, 0.8)",
        backdropFilter: "blur(10px)",
        borderRadius: "12px",
        p: 1,
        border: "1px solid rgba(59, 130, 246, 0.3)",
      }}>
        <Box sx={{
          px: 1.5,
          py: 0.5,
          borderRadius: "8px",
          bgcolor: "rgba(59, 130, 246, 0.1)",
          border: "1px solid rgba(59, 130, 246, 0.2)",
          cursor: "pointer",
          fontSize: "0.875rem",
          color: "#94a3b8",
          "&:hover": { bgcolor: "rgba(59, 130, 246, 0.2)" }
        }}>
          +
        </Box>
        <Box sx={{
          px: 1.5,
          py: 0.5,
          borderRadius: "8px",
          bgcolor: "rgba(59, 130, 246, 0.1)",
          border: "1px solid rgba(59, 130, 246, 0.2)",
          cursor: "pointer",
          fontSize: "0.875rem",
          color: "#94a3b8",
          "&:hover": { bgcolor: "rgba(59, 130, 246, 0.2)" }
        }}>
          -
        </Box>
      </Box>
    </Box>
  );
}
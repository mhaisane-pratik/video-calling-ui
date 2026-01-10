import { Box, Typography, Avatar } from "@mui/material";
import MicOffIcon from "@mui/icons-material/MicOff";

// ==================== NEW COMPONENTS ====================

// Speaking Indicator Component
const SpeakingIndicator = () => (
  <Box sx={{
    position: "absolute",
    top: -5,
    left: -5,
    width: 10,
    height: 10,
    borderRadius: "50%",
    bgcolor: "#10b981",
    border: "2px solid #020617",
    animation: "pulse 2s infinite",
    zIndex: 2,
    "@keyframes pulse": {
      "0%, 100%": { opacity: 1, transform: "scale(1)" },
      "50%": { opacity: 0.7, transform: "scale(1.2)" }
    }
  }} />
);

// Connection Quality Indicator
const ConnectionQuality = ({ quality = Math.floor(Math.random() * 3) }) => {
  const colors = ["#ef4444", "#f59e0b", "#10b981"];
  const labels = ["Poor", "Fair", "Excellent"];
  
  return (
    <Box sx={{
      position: "absolute",
      bottom: 35,
      right: 8,
      display: "flex",
      alignItems: "center",
      gap: 0.5,
      bgcolor: "rgba(15, 23, 42, 0.8)",
      backdropFilter: "blur(4px)",
      borderRadius: "10px",
      px: 1,
      py: 0.5,
      border: `1px solid ${colors[quality]}30`,
    }}>
      {[0, 1, 2].map((i) => (
        <Box
          key={i}
          sx={{
            width: 2,
            height: i <= quality ? "8px" : "4px",
            bgcolor: i <= quality ? colors[quality] : "#64748b",
            borderRadius: "1px",
            transition: "all 0.3s ease",
          }}
        />
      ))}
    </Box>
  );
};

// Screen Share Indicator
const ScreenShareIndicator = ({ isSharing = Math.random() > 0.7 }) => {
  if (!isSharing) return null;
  
  return (
    <Box sx={{
      position: "absolute",
      top: 8,
      left: 8,
      display: "flex",
      alignItems: "center",
      gap: 0.5,
      bgcolor: "rgba(59, 130, 246, 0.8)",
      color: "#ffffff",
      px: 1.5,
      py: 0.5,
      borderRadius: "12px",
      fontSize: "0.7rem",
      fontWeight: 600,
      zIndex: 2,
      backdropFilter: "blur(4px)",
      animation: "glow 2s infinite",
      "@keyframes glow": {
        "0%, 100%": { boxShadow: "0 0 5px rgba(59, 130, 246, 0.5)" },
        "50%": { boxShadow: "0 0 10px rgba(59, 130, 246, 0.8)" }
      }
    }}>
      <Box component="span">🖥️</Box>
      Screen
    </Box>
  );
};

// Video Status Indicator
const VideoStatusIndicator = ({ isVideoOn = Math.random() > 0.3 }) => (
  <Box sx={{
    position: "absolute",
    bottom: 8,
    left: 8,
    width: 8,
    height: 8,
    borderRadius: "50%",
    bgcolor: isVideoOn ? "#10b981" : "#ef4444",
    border: "2px solid #020617",
    zIndex: 2,
    animation: isVideoOn ? "pulse 3s infinite" : "none",
  }} />
);

// Participant Badge (Role/Priority)
const ParticipantBadge = ({ role = Math.random() > 0.7 ? "Host" : "Guest" }) => {
  if (role === "Guest") return null;
  
  return (
    <Box sx={{
      position: "absolute",
      top: -6,
      right: 30,
      bgcolor: "rgba(245, 158, 11, 0.9)",
      color: "#000000",
      fontSize: "0.6rem",
      fontWeight: 800,
      px: 1,
      py: 0.25,
      borderRadius: "4px",
      zIndex: 3,
      transform: "rotate(-5deg)",
      boxShadow: "0 2px 4px rgba(0,0,0,0.3)",
      letterSpacing: "0.5px",
    }}>
      {role}
    </Box>
  );
};

// Reaction Indicator (Emoji Reactions)
const ReactionIndicator = () => {
  const reactions = ["👍", "👏", "🎉", "🤔", "🔥", "❤️"];
  const [currentReaction, setCurrentReaction] = useState(null);
  
  useEffect(() => {
    if (Math.random() > 0.8) {
      const randomReaction = reactions[Math.floor(Math.random() * reactions.length)];
      setCurrentReaction(randomReaction);
      
      const timer = setTimeout(() => {
        setCurrentReaction(null);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, []);
  
  if (!currentReaction) return null;
  
  return (
    <Box sx={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      fontSize: "2.5rem",
      zIndex: 3,
      animation: "floatUp 2s ease-out forwards",
      "@keyframes floatUp": {
        "0%": { transform: "translate(-50%, -50%) scale(0.8)", opacity: 0 },
        "20%": { transform: "translate(-50%, -80%) scale(1.2)", opacity: 1 },
        "100%": { transform: "translate(-50%, -120%) scale(1)", opacity: 0 }
      }
    }}>
      {currentReaction}
    </Box>
  );
};

// Hover Info Panel
const HoverInfoPanel = ({ user }) => {
  const [showInfo, setShowInfo] = useState(false);
  
  return (
    <>
      <Box
        onMouseEnter={() => setShowInfo(true)}
        onMouseLeave={() => setShowInfo(false)}
        sx={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 1 }}
      />
      
      {showInfo && (
        <Box sx={{
          position: "absolute",
          top: "100%",
          left: 0,
          right: 0,
          bgcolor: "rgba(15, 23, 42, 0.95)",
          backdropFilter: "blur(10px)",
          borderRadius: "8px",
          p: 1.5,
          mt: 1,
          zIndex: 10,
          border: "1px solid #334155",
          boxShadow: "0 10px 25px rgba(0, 0, 0, 0.5)",
          animation: "slideDown 0.2s ease-out",
          "@keyframes slideDown": {
            from: { opacity: 0, transform: "translateY(-10px)" },
            to: { opacity: 1, transform: "translateY(0)" }
          }
        }}>
          <Typography variant="caption" sx={{ color: "#94a3b8", display: "block" }}>
            📍 New York, USA
          </Typography>
          <Typography variant="caption" sx={{ color: "#94a3b8", display: "block" }}>
            ⏰ Joined 5 min ago
          </Typography>
          <Typography variant="caption" sx={{ color: "#94a3b8", display: "block" }}>
            📶 Network: Stable
          </Typography>
        </Box>
      )}
    </>
  );
};

// Audio Level Visualizer
const AudioLevelVisualizer = ({ isActive }) => {
  const [levels, setLevels] = useState([1, 2, 1, 3, 2, 1]);
  
  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        setLevels(prev => prev.map(() => Math.floor(Math.random() * 4) + 1));
      }, 200);
      return () => clearInterval(interval);
    }
  }, [isActive]);
  
  if (!isActive) return null;
  
  return (
    <Box sx={{
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      height: 3,
      display: "flex",
      justifyContent: "center",
      gap: 1,
      px: 2,
      pb: 0.5,
    }}>
      {levels.map((height, index) => (
        <Box
          key={index}
          sx={{
            width: 2,
            height: `${height * 3}px`,
            bgcolor: "#3b82f6",
            borderRadius: "1px",
            transition: "height 0.2s ease",
          }}
        />
      ))}
    </Box>
  );
};

// ==================== REACT HOOKS ====================
import { useEffect, useState } from "react";

// ==================== ORIGINAL COMPONENT ====================

export default function ParticipantTile({ user, isActive }) {
  if (!user) return null; // ✅ SAFETY

  // Get random values for new features
  const [isVideoOn, setIsVideoOn] = useState(Math.random() > 0.3);
  const [isScreenSharing] = useState(Math.random() > 0.7);
  const [participantRole] = useState(Math.random() > 0.7 ? "Host" : "Guest");

  // Toggle video randomly for demo
  useEffect(() => {
    if (Math.random() > 0.9) {
      const timer = setTimeout(() => {
        setIsVideoOn(prev => !prev);
      }, Math.random() * 5000);
      return () => clearTimeout(timer);
    }
  }, [isVideoOn]);

  return (
    <Box
      sx={{
        bgcolor: "#020617",
        borderRadius: 2,
        p: 1,
        border: isActive ? "2px solid #2563eb" : "1px solid #1e293b",
        boxShadow: isActive ? "0 0 12px #2563eb" : "none",
        transition: "all 0.2s ease",
        position: "relative", // Added for positioning new elements
        overflow: "visible", // Changed for new elements
        minHeight: "140px",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: isActive ? "0 0 20px #2563eb" : "0 4px 12px rgba(0, 0, 0, 0.3)",
          borderColor: isActive ? "#3b82f6" : "#334155",
        }
      }}
    >
      {/* New: Hover Info Panel Trigger */}
      <HoverInfoPanel user={user} />
      
      {/* New: Speaking Indicator */}
      {isActive && <SpeakingIndicator />}
      
      {/* New: Participant Badge */}
      <ParticipantBadge role={participantRole} />
      
      {/* New: Screen Share Indicator */}
      <ScreenShareIndicator isSharing={isScreenSharing} />
      
      {/* Avatar with enhanced styling */}
      <Box sx={{ position: "relative", mb: 1 }}>
        <Avatar 
          sx={{ 
            width: 64, 
            height: 64, 
            mx: "auto", 
            my: 1,
            border: isActive ? "2px solid #3b82f6" : "2px solid #334155",
            bgcolor: isActive ? "rgba(59, 130, 246, 0.2)" : "#1e293b",
            transition: "all 0.3s ease",
            position: "relative",
            zIndex: 1,
          }}
        >
          {user.name?.[0]}
        </Avatar>
        
        {/* New: Video Status Indicator */}
        <VideoStatusIndicator isVideoOn={isVideoOn} />
      </Box>

      {/* Name with enhanced styling */}
      <Typography 
        variant="caption" 
        align="center"
        sx={{
          display: "block",
          fontWeight: isActive ? 600 : 500,
          color: isActive ? "#e2e8f0" : "#94a3b8",
          fontSize: "0.8rem",
          mb: 0.5,
          transition: "all 0.3s ease",
        }}
      >
        {user.name}
      </Typography>

      {/* Original Mic Off Icon with enhancement */}
      {!user.mic && (
        <Box sx={{
          position: "absolute", 
          top: 6, 
          right: 6,
          bgcolor: "rgba(239, 68, 68, 0.2)",
          borderRadius: "50%",
          p: 0.5,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "1px solid rgba(239, 68, 68, 0.3)",
        }}>
          <MicOffIcon sx={{ fontSize: "1rem", color: "#f87171" }} />
        </Box>
      )}

      {/* New: Connection Quality Indicator */}
      <ConnectionQuality />
      
      {/* New: Audio Level Visualizer */}
      <AudioLevelVisualizer isActive={isActive} />
      
      {/* New: Reaction Indicator */}
      <ReactionIndicator />
      
      {/* Status Text */}
      <Typography 
        variant="caption" 
        align="center"
        sx={{
          display: "block",
          color: isActive ? "#60a5fa" : "#64748b",
          fontSize: "0.65rem",
          mt: 0.5,
        }}
      >
        {isActive ? "Speaking" : "Listening"}
      </Typography>
      
      {/* Decorative corner accent */}
      <Box sx={{
        position: "absolute",
        top: 0,
        right: 0,
        width: 0,
        height: 0,
        borderTop: "12px solid transparent",
        borderBottom: "12px solid transparent",
        borderRight: "12px solid #1e293b",
        opacity: 0.5,
      }} />
    </Box>
  );
}
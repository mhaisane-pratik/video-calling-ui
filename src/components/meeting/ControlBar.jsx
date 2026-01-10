import { useState } from "react";
import { Box, IconButton, Tooltip } from "@mui/material";

import MicIcon from "@mui/icons-material/Mic";
import MicOffIcon from "@mui/icons-material/MicOff";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOffIcon from "@mui/icons-material/VideocamOff";
import ScreenShareIcon from "@mui/icons-material/ScreenShare";
import StopScreenShareIcon from "@mui/icons-material/StopScreenShare";
import CallEndIcon from "@mui/icons-material/CallEnd";
import PanToolIcon from "@mui/icons-material/PanTool";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";

import useScreenShare from "../../hooks/useScreenShare";

// ==================== NEW COMPONENTS ====================

// Professional Meeting Timer
const MeetingTimer = () => {
  const [time, setTime] = useState(0);
  
  useState(() => {
    const timer = setInterval(() => {
      setTime(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  });
  
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  return (
    <Box sx={{
      position: "absolute",
      left: 24,
      top: "50%",
      transform: "translateY(-50%)",
      display: "flex",
      alignItems: "center",
      gap: 1.5,
    }}>
      <Box sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 36,
        height: 36,
        bgcolor: "rgba(0, 0, 0, 0.4)",
        borderRadius: "8px",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
      }}>
        <Box sx={{
          fontSize: "0.9rem",
          fontWeight: 600,
          color: "#ffffff",
          fontFamily: "'SF Mono', monospace",
          letterSpacing: "0.5px",
        }}>
          {formatTime(time)}
        </Box>
      </Box>
    </Box>
  );
};

// Recording Status with Icon
const RecordingStatus = () => {
  const [isRecording, setIsRecording] = useState(false);
  
  return (
    <Box sx={{
      position: "absolute",
      right: 24,
      top: "50%",
      transform: "translateY(-50%)",
      display: "flex",
      alignItems: "center",
      gap: 1.5,
    }}>
      <Tooltip title={isRecording ? "Stop Recording" : "Start Recording"}>
        <Box 
          onClick={() => setIsRecording(!isRecording)}
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 36,
            height: 36,
            bgcolor: isRecording ? "rgba(220, 38, 38, 0.3)" : "rgba(0, 0, 0, 0.4)",
            borderRadius: "8px",
            backdropFilter: "blur(10px)",
            border: isRecording ? "1px solid rgba(220, 38, 38, 0.5)" : "1px solid rgba(255, 255, 255, 0.1)",
            cursor: "pointer",
            transition: "all 0.3s ease",
            "&:hover": {
              bgcolor: isRecording ? "rgba(220, 38, 38, 0.4)" : "rgba(0, 0, 0, 0.6)",
            }
          }}
        >
          <Box sx={{
            width: 10,
            height: 10,
            borderRadius: "50%",
            bgcolor: isRecording ? "#dc2626" : "#9ca3af",
            animation: isRecording ? "pulse 1.5s infinite" : "none",
          }} />
        </Box>
      </Tooltip>
    </Box>
  );
};

// Network Status with Bars
const NetworkStatus = () => {
  const [latency, setLatency] = useState(28);
  
  useState(() => {
    const interval = setInterval(() => {
      setLatency(Math.floor(Math.random() * 20) + 25);
    }, 3000);
    return () => clearInterval(interval);
  });
  
  const getQuality = (lat) => {
    if (lat < 30) return { color: "#10b981", label: "Excellent" };
    if (lat < 50) return { color: "#f59e0b", label: "Good" };
    return { color: "#ef4444", label: "Poor" };
  };
  
  const quality = getQuality(latency);
  
  return (
    <Box sx={{
      position: "absolute",
      right: 70,
      top: "50%",
      transform: "translateY(-50%)",
      display: "flex",
      alignItems: "center",
      gap: 1.5,
    }}>
      <Tooltip title={`Network: ${quality.label} (${latency}ms)`}>
        <Box sx={{
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          width: 36,
          height: 36,
          bgcolor: "rgba(0, 0, 0, 0.4)",
          borderRadius: "8px",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          padding: "6px",
          gap: 1.5,
        }}>
          {[1, 2, 3].map((i) => {
            const height = latency < 30 ? [10, 14, 18][i-1] : 
                          latency < 50 ? [8, 12, 16][i-1] : 
                          [6, 10, 14][i-1];
            return (
              <Box
                key={i}
                sx={{
                  width: 3,
                  height: `${height}px`,
                  bgcolor: quality.color,
                  borderRadius: "2px",
                  transition: "all 0.3s ease",
                }}
              />
            );
          })}
        </Box>
      </Tooltip>
    </Box>
  );
};

// Active Participants Count
const ParticipantsCount = ({ count = 5 }) => (
  <Box sx={{
    position: "absolute",
    left: 70,
    top: "50%",
    transform: "translateY(-50%)",
    display: "flex",
    alignItems: "center",
    gap: 1.5,
  }}>
    <Box sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: 36,
      height: 36,
      bgcolor: "rgba(0, 0, 0, 0.4)",
      borderRadius: "8px",
      backdropFilter: "blur(10px)",
      border: "1px solid rgba(255, 255, 255, 0.1)",
    }}>
      <Box sx={{ 
        fontSize: "1rem", 
        color: "#ffffff",
        display: "flex",
        alignItems: "center",
        gap: 0.5,
      }}>
        <span style={{ fontSize: "0.9rem", opacity: 0.8 }}>👥</span>
        <Box sx={{ 
          fontSize: "0.9rem", 
          fontWeight: 600,
          color: "#ffffff",
        }}>
          {count}
        </Box>
      </Box>
    </Box>
  </Box>
);

// Active Status Indicators (Mic, Cam, Share)
const StatusIndicators = ({ micOn, camOn, sharing }) => (
  <Box sx={{
    position: "absolute",
    right: 120,
    top: "50%",
    transform: "translateY(-50%)",
    display: "flex",
    alignItems: "center",
    gap: 0.8,
  }}>
    {micOn && (
      <Box sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 24,
        height: 24,
        bgcolor: "rgba(34, 197, 94, 0.2)",
        borderRadius: "4px",
      }}>
        <Box sx={{ fontSize: "0.8rem", color: "#4ade80" }}>🎤</Box>
      </Box>
    )}
    {camOn && (
      <Box sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 24,
        height: 24,
        bgcolor: "rgba(59, 130, 246, 0.2)",
        borderRadius: "4px",
      }}>
        <Box sx={{ fontSize: "0.8rem", color: "#60a5fa" }}>📷</Box>
      </Box>
    )}
    {sharing && (
      <Box sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: 24,
        height: 24,
        bgcolor: "rgba(168, 85, 247, 0.2)",
        borderRadius: "4px",
      }}>
        <Box sx={{ fontSize: "0.8rem", color: "#a855f7" }}>🖥️</Box>
      </Box>
    )}
  </Box>
);

// Quick Reactions Bar
const QuickReactions = () => {
  const reactions = ["👍", "👏", "🎉", "🤔", "🔥", "❤️"];
  
  return (
    <Box sx={{
      position: "absolute",
      bottom: 90,
      left: "50%",
      transform: "translateX(-50%)",
      display: "flex",
      gap: 0.5,
      bgcolor: "rgba(0, 0, 0, 0.8)",
      backdropFilter: "blur(15px)",
      borderRadius: "20px",
      p: 1,
      border: "1px solid rgba(255, 255, 255, 0.15)",
      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
    }}>
      {reactions.map((reaction, index) => (
        <Tooltip key={index} title="Send reaction">
          <Box
            sx={{
              fontSize: "1.3rem",
              cursor: "pointer",
              transition: "all 0.2s ease",
              padding: "4px",
              borderRadius: "50%",
              "&:hover": {
                transform: "scale(1.2)",
                bgcolor: "rgba(255, 255, 255, 0.1)",
              }
            }}
          >
            {reaction}
          </Box>
        </Tooltip>
      ))}
    </Box>
  );
};

// Enhanced Control Button with Professional Styling
const ControlButton = ({ 
  children, 
  tooltip, 
  onClick, 
  active = false, 
  warning = false,
  color = "default" 
}) => {
  const getButtonStyles = () => {
    if (warning) {
      return {
        bgcolor: "rgba(239, 68, 68, 0.15)",
        borderColor: "rgba(239, 68, 68, 0.3)",
        hoverBgcolor: "rgba(239, 68, 68, 0.25)",
        iconColor: "#f87171"
      };
    }
    if (active) {
      return {
        bgcolor: "rgba(59, 130, 246, 0.15)",
        borderColor: "rgba(59, 130, 246, 0.4)",
        hoverBgcolor: "rgba(59, 130, 246, 0.25)",
        iconColor: "#60a5fa"
      };
    }
    return {
      bgcolor: "rgba(255, 255, 255, 0.08)",
      borderColor: "rgba(255, 255, 255, 0.15)",
      hoverBgcolor: "rgba(255, 255, 255, 0.15)",
      iconColor: "#d1d5db"
    };
  };
  
  const styles = getButtonStyles();
  
  return (
    <Box sx={{
      position: "relative",
      "& .MuiIconButton-root": {
        width: 48,
        height: 48,
        bgcolor: styles.bgcolor,
        border: `1px solid ${styles.borderColor}`,
        borderRadius: "10px",
        transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
        backdropFilter: "blur(8px)",
        "&:hover": {
          bgcolor: styles.hoverBgcolor,
          transform: "translateY(-2px)",
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
        },
        "& svg": {
          fontSize: "1.3rem",
          color: styles.iconColor,
        }
      },
      "& .emoji-icon": {
        fontSize: "1.4rem",
        opacity: 0.9,
        filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.3))",
      }
    }}>
      {children}
    </Box>
  );
};

// Main Control Bar Container
const ControlBarContainer = ({ children }) => (
  <Box sx={{
    position: "fixed",
    bottom: 20,
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    alignItems: "center",
    gap: 0.8,
    bgcolor: "rgba(0, 0, 0, 0.6)",
    backdropFilter: "blur(20px)",
    borderRadius: "16px",
    p: 1.5,
    px: 2,
    border: "1px solid rgba(255, 255, 255, 0.12)",
    boxShadow: `
      0 0 0 1px rgba(255, 255, 255, 0.05),
      0 16px 40px rgba(0, 0, 0, 0.4),
      0 4px 24px rgba(0, 0, 0, 0.3)
    `,
    zIndex: 1000,
    minWidth: "750px",
    height: "72px",
    justifyContent: "space-between",
  }}>
    {children}
  </Box>
);

// Background Glow Effect
const BackgroundGlow = () => (
  <Box sx={{
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: `
      radial-gradient(circle at 30% 50%, rgba(59, 130, 246, 0.08), transparent 60%),
      radial-gradient(circle at 70% 50%, rgba(139, 92, 246, 0.05), transparent 60%)
    `,
    pointerEvents: "none",
    zIndex: -1,
    borderRadius: "16px",
  }} />
);

// ==================== ORIGINAL COMPONENT ====================

export default function ControlBar({
  micOn,
  camOn,
  toggleMic,
  toggleCam,
  setPanel,
  streamRef, // ✅ REQUIRED
}) {
  const [sharing, setSharing] = useState(false);

  // ✅ Real screen share hook
  const { startScreenShare, stopScreenShare } =
    useScreenShare(streamRef, setSharing);

  return (
    <>
      {/* Main Floating Control Bar */}
      <ControlBarContainer>
        {/* Background Glow Effect */}
        <BackgroundGlow />
        
        {/* Left Section: Info & Status */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <MeetingTimer />
          <ParticipantsCount />
        </Box>
        
        {/* Center Section: Main Controls */}
        <Box sx={{ 
          display: "flex", 
          justifyContent: "center", 
          alignItems: "center",
          gap: 0.8,
          flex: 1,
        }}>
          {/* MIC */}
          <ControlButton active={micOn} warning={!micOn}>
            <Tooltip title={micOn ? "Mute (⌘+D)" : "Unmute (⌘+D)"}>
              <IconButton onClick={toggleMic}>
                {micOn ? <MicIcon /> : <MicOffIcon color="error" />}
              </IconButton>
            </Tooltip>
          </ControlButton>

          {/* CAMERA */}
          <ControlButton active={camOn} warning={!camOn}>
            <Tooltip title={camOn ? "Stop Video (⌘+E)" : "Start Video (⌘+E)"}>
              <IconButton onClick={toggleCam}>
                {camOn ? <VideocamIcon /> : <VideocamOffIcon color="error" />}
              </IconButton>
            </Tooltip>
          </ControlButton>

          {/* SCREEN SHARE */}
          <ControlButton active={sharing} warning={sharing}>
            <Tooltip title={sharing ? "Stop Sharing (⌘+S)" : "Share Screen (⌘+S)"}>
              <IconButton
                onClick={() =>
                  sharing ? stopScreenShare() : startScreenShare()
                }
              >
                {sharing ? (
                  <StopScreenShareIcon color="error" />
                ) : (
                  <ScreenShareIcon />
                )}
              </IconButton>
            </Tooltip>
          </ControlButton>

          {/* PARTICIPANTS */}
          <ControlButton>
            <Tooltip title="Participants (⌘+P)">
              <IconButton onClick={() => setPanel("participants")}>
                <span className="emoji-icon">👥</span>
              </IconButton>
            </Tooltip>
          </ControlButton>

          {/* CHAT */}
          <ControlButton>
            <Tooltip title="Chat (⌘+C)">
              <IconButton onClick={() => setPanel("chat")}>
                <span className="emoji-icon">💬</span>
              </IconButton>
            </Tooltip>
          </ControlButton>

          {/* WHITEBOARD */}
          <ControlButton>
            <Tooltip title="Whiteboard (⌘+W)">
              <IconButton onClick={() => setPanel("whiteboard")}>
                <span className="emoji-icon">✏️</span>
              </IconButton>
            </Tooltip>
          </ControlButton>

          {/* RAISE HAND */}
          <ControlButton>
            <Tooltip title="Raise Hand (⌘+H)">
              <IconButton>
                <PanToolIcon />
              </IconButton>
            </Tooltip>
          </ControlButton>

          {/* REACTIONS */}
          <ControlButton>
            <Tooltip title="Reactions (⌘+R)">
              <IconButton>
                <EmojiEmotionsIcon />
              </IconButton>
            </Tooltip>
          </ControlButton>

          {/* LEAVE - Red Button */}
          <ControlButton warning={true}>
            <Tooltip title="Leave (⌘+Q)">
              <IconButton color="error" sx={{
                "&:hover": {
                  bgcolor: "rgba(239, 68, 68, 0.3) !important",
                }
              }}>
                <CallEndIcon />
              </IconButton>
            </Tooltip>
          </ControlButton>
        </Box>
        
        {/* Right Section: Network & Recording */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <StatusIndicators micOn={micOn} camOn={camOn} sharing={sharing} />
          <NetworkStatus />
          <RecordingStatus />
        </Box>
      </ControlBarContainer>
      
      {/* Quick Reactions Bar */}
      <QuickReactions />
      
      {/* Bottom Gradient Overlay */}
      <Box sx={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        height: "80px",
        background: "linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.25) 40%, rgba(0, 0, 0, 0.4) 100%)",
        pointerEvents: "none",
        zIndex: 999,
      }} />
    </>
  );
}
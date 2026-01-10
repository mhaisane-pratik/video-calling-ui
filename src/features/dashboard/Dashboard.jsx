import { Box, Typography, Button, Card, Grid, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";

import Sidebar from "../../components/layout/Sidebar";
import Header from "../../components/layout/Header";
import StatsCards from "./StatsCards";

export default function Dashboard() {
  const navigate = useNavigate();

  const hoverCard = {
    bgcolor: "#020617",
    "&:hover": { 
      bgcolor: "#1e293b",
      transform: "translateY(-4px)",
      boxShadow: "0 10px 20px rgba(0, 0, 0, 0.3)"
    },
    transition: "all 0.3s ease",
    borderRadius: "12px",
    border: "1px solid #1e293b",
    position: "relative",
    overflow: "hidden",
  };

  const gradientButton = {
    background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
    "&:hover": {
      background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
      boxShadow: "0 4px 20px rgba(59, 130, 246, 0.4)"
    },
    fontWeight: 600,
    textTransform: "none",
    borderRadius: "10px",
    transition: "all 0.3s ease",
  };

  const outlinedButton = {
    border: "1px solid #334155",
    color: "#e2e8f0",
    "&:hover": {
      border: "1px solid #3b82f6",
      backgroundColor: "rgba(59, 130, 246, 0.1)"
    },
    textTransform: "none",
    borderRadius: "10px",
    fontWeight: 500,
  };

  return (
    <Box sx={{ 
      display: "flex", 
      bgcolor: "#0f172a", 
      color: "#fff", 
      minHeight: "100vh",
      backgroundImage: "radial-gradient(circle at 15% 50%, rgba(30, 41, 59, 0.3) 0%, transparent 55%)"
    }}>
      <Sidebar />

      <Box sx={{ flex: 1 }}>
        <Header />

        <Box sx={{ p: 3 }}>
          <StatsCards />

          <Paper 
            elevation={0}
            sx={{
              bgcolor: "transparent",
              mb: 4,
              p: 3,
              borderRadius: "16px",
              background: "linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.5) 100%)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.1)"
            }}
          >
            <Typography variant="h4" sx={{ 
              fontWeight: 700,
              background: "linear-gradient(90deg, #e2e8f0 0%, #94a3b8 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 1
            }}>
              Good morning, Verzat
            </Typography>
            <Typography variant="body1" sx={{ 
              color: "#cbd5e1",
              display: "flex",
              alignItems: "center",
              gap: 1
            }}>
              <span style={{ fontSize: "1.2em" }}>📅</span>
              Saturday, January 10 • <span style={{ color: "#60a5fa", fontWeight: 600 }}>8 meetings today</span>
            </Typography>
          </Paper>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ 
              mb: 2,
              color: "#e2e8f0",
              fontWeight: 600,
              fontSize: "1.1rem"
            }}>
              Start a conversation
            </Typography>
            <Grid container spacing={2}>
              <Grid item>
                <Button 
                  variant="contained" 
                  onClick={() => navigate(`/lobby/${uuid()}`)}
                  sx={{ ...gradientButton, px: 4, py: 1.2 }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <span>🎯</span> New Meeting
                  </Box>
                </Button>
              </Grid>
              <Grid item>
                <Button variant="outlined" sx={{ ...outlinedButton, px: 4, py: 1.2 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <span>🔗</span> Join with Code
                  </Box>
                </Button>
              </Grid>
              <Grid item>
                <Button variant="outlined" sx={{ ...outlinedButton, px: 4, py: 1.2 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <span>📅</span> Schedule
                  </Box>
                </Button>
              </Grid>
            </Grid>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" sx={{ 
              mb: 2,
              color: "#e2e8f0",
              fontWeight: 600,
              fontSize: "1.1rem"
            }}>
              Up Next
            </Typography>
            <Card sx={{ 
              ...hoverCard, 
              p: 3,
              background: "linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%)",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                width: "4px",
                height: "100%",
                background: "linear-gradient(to bottom, #3b82f6, #8b5cf6)",
                borderRadius: "4px 0 0 4px"
              }
            }}>
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <Box>
                  <Typography variant="h6" sx={{ color: "#f8fafc", fontWeight: 600 }}>
                    Quick Meeting
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#94a3b8", display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}>
                    <span style={{ fontSize: "1.2em" }}>🕐</span> In 15 mins
                  </Typography>
                </Box>
                <Button 
                  variant="contained" 
                  sx={{ 
                    ...gradientButton,
                    px: 3,
                    py: 0.8,
                    fontSize: "0.9rem"
                  }}
                >
                  Join Now
                </Button>
              </Box>
            </Card>
          </Box>

          <Box>
            <Typography variant="h6" sx={{ 
              mb: 2,
              color: "#e2e8f0",
              fontWeight: 600,
              fontSize: "1.1rem"
            }}>
              Recordings
            </Typography>
            <Card
              sx={{ 
                ...hoverCard, 
                p: 3,
                background: "linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.9) 100%)",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "4px",
                  height: "100%",
                  background: "linear-gradient(to bottom, #10b981, #34d399)",
                  borderRadius: "4px 0 0 4px"
                }
              }}
              onClick={() => navigate("/recordings")}
            >
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Box>
                  <Typography variant="h6" sx={{ color: "#f8fafc", fontWeight: 600, mb: 0.5 }}>
                    📁 View Recordings
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#94a3b8" }}>
                    Access past meeting recordings and transcripts
                  </Typography>
                </Box>
                <Box sx={{ 
                  width: 40, 
                  height: 40, 
                  borderRadius: "50%", 
                  bgcolor: "rgba(16, 185, 129, 0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#34d399",
                  fontSize: "1.2rem"
                }}>
                  →
                </Box>
              </Box>
            </Card>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
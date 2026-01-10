import { Grid, Box, Paper } from "@mui/material";
import StatCard from "../../components/common/StatCard";

export default function StatsCards() {
  return (
    <Grid 
      container 
      spacing={2} 
      sx={{ 
        mb: 3,
        position: "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background: "linear-gradient(90deg, transparent, #334155, transparent)",
        }
      }}
    >
      <Grid item xs={12} md={3}>
        <Paper
          elevation={0}
          sx={{
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "3px",
              background: "linear-gradient(90deg, #3b82f6, #8b5cf6)",
            },
            "&:hover": {
              transform: "translateY(-4px)",
              transition: "transform 0.3s ease",
              boxShadow: "0 10px 25px rgba(59, 130, 246, 0.15)"
            }
          }}
        >
          <StatCard 
            title="Total Meetings" 
            value="128"
            sx={{
              bgcolor: "rgba(15, 23, 42, 0.7)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255, 255, 255, 0.05)",
            }}
          />
        </Paper>
      </Grid>
      
      <Grid item xs={12} md={3}>
        <Paper
          elevation={0}
          sx={{
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "3px",
              background: "linear-gradient(90deg, #10b981, #34d399)",
            },
            "&:hover": {
              transform: "translateY(-4px)",
              transition: "transform 0.3s ease",
              boxShadow: "0 10px 25px rgba(16, 185, 129, 0.15)"
            }
          }}
        >
          <StatCard 
            title="Active Users" 
            value="42"
            sx={{
              bgcolor: "rgba(15, 23, 42, 0.7)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255, 255, 255, 0.05)",
            }}
          />
        </Paper>
      </Grid>
      
      <Grid item xs={12} md={3}>
        <Paper
          elevation={0}
          sx={{
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "3px",
              background: "linear-gradient(90deg, #f59e0b, #fbbf24)",
            },
            "&:hover": {
              transform: "translateY(-4px)",
              transition: "transform 0.3s ease",
              boxShadow: "0 10px 25px rgba(245, 158, 11, 0.15)"
            }
          }}
        >
          <StatCard 
            title="Recorded Hours" 
            value="96h"
            sx={{
              bgcolor: "rgba(15, 23, 42, 0.7)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255, 255, 255, 0.05)",
            }}
          />
        </Paper>
      </Grid>
      
      <Grid item xs={12} md={3}>
        <Paper
          elevation={0}
          sx={{
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "3px",
              background: "linear-gradient(90deg, #ef4444, #f87171)",
            },
            "&:hover": {
              transform: "translateY(-4px)",
              transition: "transform 0.3s ease",
              boxShadow: "0 10px 25px rgba(239, 68, 68, 0.15)"
            }
          }}
        >
          <StatCard 
            title="Engagement Avg" 
            value="78%"
            sx={{
              bgcolor: "rgba(15, 23, 42, 0.7)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(255, 255, 255, 0.05)",
            }}
          />
        </Paper>
      </Grid>
    </Grid>
  );
}
import { useState, useEffect } from "react";
import { 
  Box, 
  Typography, 
  Button, 
  Card, 
  Grid, 
  Paper,
  IconButton,
  Tooltip,
  Fade,
  Zoom,
  useTheme,
  useMediaQuery,
  Badge,
  Chip,
  Avatar,
  Divider
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { v4 as uuid } from "uuid";
import {
  DarkMode,
  LightMode,
  Notifications,
  CalendarToday,
  VideoCall,
  Schedule,
  MeetingRoom,
  PlayCircleOutline,
  TrendingUp,
  ArrowForward,
  Palette,
  Contrast,
  Brightness4,
  Brightness7
} from "@mui/icons-material";

import Sidebar from "../../components/layout/Sidebar";
import Header from "../../components/layout/Header";
import LeftMenu from "../../components/layout/LeftMenu";
import StatsCards from "./StatsCards";

export default function Dashboard() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [themeMode, setThemeMode] = useState('light');
  const [notificationCount, setNotificationCount] = useState(3);
  const [hoveredCard, setHoveredCard] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Load theme from localStorage on initial render
  useEffect(() => {
    const savedTheme = localStorage.getItem('dashboard-theme') || 'light';
    setThemeMode(savedTheme);
    document.body.setAttribute('data-theme', savedTheme);
  }, []);

  // Toggle theme function
  const toggleTheme = () => {
    const newTheme = themeMode === 'light' ? 'dark' : 'light';
    setThemeMode(newTheme);
    localStorage.setItem('dashboard-theme', newTheme);
    document.body.setAttribute('data-theme', newTheme);
    
    // Add theme transition animation
    document.body.style.transition = 'background-color 0.5s ease, color 0.5s ease';
  };

  // Enhanced hover effects with gradient
  const hoverCard = {
    bgcolor: "background.paper",
    position: 'relative',
    overflow: 'hidden',
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '4px',
      background: themeMode === 'light' 
        ? 'linear-gradient(90deg, #2196F3 0%, #21CBF3 100%)'
        : 'linear-gradient(90deg, #BB86FC 0%, #3700B3 100%)',
      transform: 'scaleX(0)',
      transformOrigin: 'left',
      transition: 'transform 0.3s ease',
    },
    '&:hover': {
      bgcolor: themeMode === 'light' ? 'rgba(33, 150, 243, 0.04)' : 'rgba(187, 134, 252, 0.04)',
      transform: "translateY(-8px)",
      boxShadow: themeMode === 'light' 
        ? '0 12px 24px rgba(0, 0, 0, 0.1)'
        : '0 12px 24px rgba(0, 0, 0, 0.3)',
      '&::before': {
        transform: 'scaleX(1)',
      },
    },
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    borderRadius: 3,
    border: "1px solid",
    borderColor: themeMode === 'light' ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.08)',
    backdropFilter: 'blur(10px)',
  };

  // Button styles with theme variations
  const buttonStyles = {
    contained: {
      background: themeMode === 'light' 
        ? 'linear-gradient(135deg, #2196F3 0%, #21CBF3 100%)'
        : 'linear-gradient(135deg, #BB86FC 0%, #3700B3 100%)',
      color: 'white',
      fontWeight: 600,
      px: 3,
      py: 1.5,
      borderRadius: 2,
      '&:hover': {
        transform: 'translateY(-2px)',
        boxShadow: themeMode === 'light' 
          ? '0 6px 20px rgba(33, 150, 243, 0.4)'
          : '0 6px 20px rgba(187, 134, 252, 0.4)',
      },
      transition: 'all 0.3s ease',
    },
    outlined: {
      borderColor: themeMode === 'light' ? 'rgba(33, 150, 243, 0.5)' : 'rgba(187, 134, 252, 0.5)',
      color: themeMode === 'light' ? '#2196F3' : '#BB86FC',
      fontWeight: 500,
      px: 3,
      py: 1.5,
      borderRadius: 2,
      '&:hover': {
        borderColor: themeMode === 'light' ? '#2196F3' : '#BB86FC',
        bgcolor: themeMode === 'light' ? 'rgba(33, 150, 243, 0.04)' : 'rgba(187, 134, 252, 0.04)',
        transform: 'translateY(-2px)',
      },
      transition: 'all 0.3s ease',
    }
  };

  // Theme toggle button
  const ThemeToggleButton = () => (
    <Tooltip title={`Switch to ${themeMode === 'light' ? 'dark' : 'light'} mode`}>
      <IconButton
        onClick={toggleTheme}
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          bgcolor: themeMode === 'light' 
            ? 'rgba(33, 150, 243, 0.1)' 
            : 'rgba(187, 134, 252, 0.1)',
          color: themeMode === 'light' ? '#2196F3' : '#BB86FC',
          width: 56,
          height: 56,
          zIndex: 1000,
          '&:hover': {
            bgcolor: themeMode === 'light' 
              ? 'rgba(33, 150, 243, 0.2)' 
              : 'rgba(187, 134, 252, 0.2)',
            transform: 'rotate(45deg)',
          },
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: 3,
        }}
      >
        {themeMode === 'light' ? <Brightness4 /> : <Brightness7 />}
      </IconButton>
    </Tooltip>
  );

  // Theme indicator chip
  const ThemeIndicator = () => (
    <Chip
      icon={themeMode === 'light' ? <LightMode /> : <DarkMode />}
      label={themeMode === 'light' ? 'Light Mode' : 'Dark Mode'}
      size="small"
      sx={{
        position: 'absolute',
        top: 16,
        right: 16,
        bgcolor: themeMode === 'light' 
          ? 'rgba(255, 193, 7, 0.1)' 
          : 'rgba(187, 134, 252, 0.1)',
        color: themeMode === 'light' ? '#F57C00' : '#BB86FC',
        border: '1px solid',
        borderColor: themeMode === 'light' 
          ? 'rgba(245, 124, 0, 0.2)' 
          : 'rgba(187, 134, 252, 0.2)',
        fontWeight: 500,
      }}
    />
  );

  return (
    <>
      {/* SLIDE MENU */}
      <LeftMenu open={menuOpen} onClose={() => setMenuOpen(false)} />

      <Box
        sx={{
          display: "flex",
          bgcolor: "background.default",
          color: "text.primary",
          minHeight: "100vh",
          position: 'relative',
          '&::before': {
            content: '""',
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            height: '300px',
            background: themeMode === 'light'
              ? 'linear-gradient(135deg, rgba(33, 150, 243, 0.05) 0%, rgba(33, 203, 243, 0.05) 100%)'
              : 'linear-gradient(135deg, rgba(187, 134, 252, 0.05) 0%, rgba(55, 0, 179, 0.05) 100%)',
            zIndex: 0,
          }
        }}
      >
        {/* MAIN SIDEBAR */}
        <Sidebar themeMode={themeMode} />

        <Box sx={{ flex: 1, position: 'relative', zIndex: 1 }}>
          {/* HEADER */}
          <Header onMenuClick={() => setMenuOpen(true)} themeMode={themeMode} />

          <Box sx={{ p: 3 }}>
            {/* Theme Toggle Button */}
            <ThemeToggleButton />

            {/* Stats Cards with fade animation */}
            <Zoom in={true} timeout={500}>
              <Box>
                <StatsCards themeMode={themeMode} />
              </Box>
            </Zoom>

            {/* Welcome Card with Theme Indicator */}
            <Fade in={true} timeout={800}>
              <Paper
                elevation={0}
                sx={{
                  mb: 4,
                  p: 3,
                  borderRadius: 3,
                  bgcolor: "background.paper",
                  position: 'relative',
                  overflow: 'hidden',
                  border: '1px solid',
                  borderColor: themeMode === 'light' 
                    ? 'rgba(33, 150, 243, 0.1)' 
                    : 'rgba(187, 134, 252, 0.1)',
                  backdropFilter: 'blur(20px)',
                }}
              >
                <ThemeIndicator />
                <Typography 
                  variant="h4" 
                  fontWeight={700}
                  sx={{
                    background: themeMode === 'light'
                      ? 'linear-gradient(135deg, #2196F3 0%, #21CBF3 100%)'
                      : 'linear-gradient(135deg, #BB86FC 0%, #3700B3 100%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                    mb: 1,
                  }}
                >
                  Good morning, Verzat
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Saturday, January 10 • 
                  <Badge 
                    color="primary" 
                    badgeContent="8" 
                    sx={{ ml: 1, '& .MuiBadge-badge': { 
                      bgcolor: themeMode === 'light' ? '#2196F3' : '#BB86FC',
                      fontWeight: 'bold'
                    }}}
                  >
                    <CalendarToday sx={{ fontSize: 16, mr: 0.5, verticalAlign: 'middle' }} />
                    <b>meetings today</b>
                  </Badge>
                </Typography>
                
                {/* Quick Stats */}
                <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                  <Chip 
                    icon={<TrendingUp />} 
                    label="4 upcoming" 
                    size="small"
                    sx={{
                      bgcolor: themeMode === 'light' 
                        ? 'rgba(76, 175, 80, 0.1)' 
                        : 'rgba(76, 175, 80, 0.2)',
                      color: themeMode === 'light' ? '#4CAF50' : '#81C784',
                    }}
                  />
                  <Chip 
                    icon={<VideoCall />} 
                    label="2 live" 
                    size="small"
                    sx={{
                      bgcolor: themeMode === 'light' 
                        ? 'rgba(233, 30, 99, 0.1)' 
                        : 'rgba(233, 30, 99, 0.2)',
                      color: themeMode === 'light' ? '#E91E63' : '#F48FB1',
                    }}
                  />
                </Box>
              </Paper>
            </Fade>

            {/* Start Conversation Section */}
            <Fade in={true} timeout={1000}>
              <Box>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    mb: 2, 
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}
                >
                  <VideoCall color="primary" />
                  Start a conversation
                </Typography>

                <Grid container spacing={2}>
                  <Grid item>
                    <Button
                      variant="contained"
                      startIcon={<VideoCall />}
                      onClick={() => navigate(`/lobby/${uuid()}`)}
                      sx={buttonStyles.contained}
                    >
                      New Meeting
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button 
                      variant="outlined" 
                      startIcon={<MeetingRoom />}
                      sx={buttonStyles.outlined}
                    >
                      Join with Code
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button 
                      variant="outlined" 
                      startIcon={<Schedule />}
                      sx={buttonStyles.outlined}
                    >
                      Schedule
                    </Button>
                  </Grid>
                </Grid>

                {/* Quick Access Cards */}
                <Grid container spacing={2} sx={{ mt: 2 }}>
                  <Grid item xs={12} md={4}>
                    <Card
                      sx={{ 
                        ...hoverCard, 
                        p: 2,
                        cursor: 'pointer',
                        bgcolor: hoveredCard === 'recent' 
                          ? (themeMode === 'light' ? 'rgba(33, 150, 243, 0.05)' : 'rgba(187, 134, 252, 0.05)')
                          : 'background.paper'
                      }}
                      onMouseEnter={() => setHoveredCard('recent')}
                      onMouseLeave={() => setHoveredCard(null)}
                    >
                      <Typography variant="subtitle2" color="text.secondary">
                        Recent Meetings
                      </Typography>
                      <Typography variant="h6" sx={{ mt: 1 }}>
                        12
                      </Typography>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Card
                      sx={{ 
                        ...hoverCard, 
                        p: 2,
                        cursor: 'pointer',
                        bgcolor: hoveredCard === 'participants' 
                          ? (themeMode === 'light' ? 'rgba(33, 150, 243, 0.05)' : 'rgba(187, 134, 252, 0.05)')
                          : 'background.paper'
                      }}
                      onMouseEnter={() => setHoveredCard('participants')}
                      onMouseLeave={() => setHoveredCard(null)}
                    >
                      <Typography variant="subtitle2" color="text.secondary">
                        Total Participants
                      </Typography>
                      <Typography variant="h6" sx={{ mt: 1 }}>
                        248
                      </Typography>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Card
                      sx={{ 
                        ...hoverCard, 
                        p: 2,
                        cursor: 'pointer',
                        bgcolor: hoveredCard === 'duration' 
                          ? (themeMode === 'light' ? 'rgba(33, 150, 243, 0.05)' : 'rgba(187, 134, 252, 0.05)')
                          : 'background.paper'
                      }}
                      onMouseEnter={() => setHoveredCard('duration')}
                      onMouseLeave={() => setHoveredCard(null)}
                    >
                      <Typography variant="subtitle2" color="text.secondary">
                        Avg. Duration
                      </Typography>
                      <Typography variant="h6" sx={{ mt: 1 }}>
                        34m
                      </Typography>
                    </Card>
                  </Grid>
                </Grid>
              </Box>
            </Fade>

            {/* Recordings Section */}
            <Fade in={true} timeout={1200}>
              <Box sx={{ mt: 4 }}>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    mb: 2,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1
                  }}
                >
                  <PlayCircleOutline color="secondary" />
                  Recordings
                </Typography>

                <Card
                  sx={{ 
                    ...hoverCard, 
                    p: 3, 
                    mt: 1, 
                    cursor: "pointer",
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                  onClick={() => navigate("/recordings")}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateX(8px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                >
                  <Box>
                    <Typography variant="h6" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      View Recordings
                      <Badge 
                        color="secondary" 
                        badgeContent="24" 
                        sx={{ ml: 1 }}
                      />
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Access past meeting recordings and transcripts
                    </Typography>
                  </Box>
                  <ArrowForward sx={{ 
                    color: themeMode === 'light' ? '#2196F3' : '#BB86FC',
                    transition: 'transform 0.3s ease'
                  }} />
                </Card>
              </Box>
            </Fade>
          </Box>
        </Box>
      </Box>

      {/* Global CSS for theme transitions */}
      <style jsx global>{`
        [data-theme="dark"] {
          --primary-gradient: linear-gradient(135deg, #BB86FC 0%, #3700B3 100%);
          --hover-bg: rgba(187, 134, 252, 0.04);
        }
        
        [data-theme="light"] {
          --primary-gradient: linear-gradient(135deg, #2196F3 0%, #21CBF3 100%);
          --hover-bg: rgba(33, 150, 243, 0.04);
        }
        
        body {
          transition: background-color 0.5s ease, color 0.5s ease;
        }
      `}</style>
    </>
  );
}
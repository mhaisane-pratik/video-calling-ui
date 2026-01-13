

import React from 'react';
import { Grid, Card, Typography, Box } from '@mui/material';
import {
  VideoCall,
  People,
  AccessTime,
  TrendingUp
} from '@mui/icons-material';

const StatsCards = ({ themeMode }) => {
  const stats = [
    {
      title: 'Total Meetings',
      value: '128',
      icon: <VideoCall />,
      color: themeMode === 'light' ? '#2196F3' : '#BB86FC',
      bgColor: themeMode === 'light' ? 'rgba(33, 150, 243, 0.1)' : 'rgba(187, 134, 252, 0.1)'
    },
    {
      title: 'Active Users',
      value: '42',
      icon: <People />,
      color: themeMode === 'light' ? '#4CAF50' : '#81C784',
      bgColor: themeMode === 'light' ? 'rgba(76, 175, 80, 0.1)' : 'rgba(76, 175, 80, 0.2)'
    },
    {
      title: 'Recorded Hours',
      value: '96h',
      icon: <AccessTime />,
      color: themeMode === 'light' ? '#FF9800' : '#FFB74D',
      bgColor: themeMode === 'light' ? 'rgba(255, 152, 0, 0.1)' : 'rgba(255, 152, 0, 0.2)'
    },
    {
      title: 'Engagement Avg',
      value: '78%',
      icon: <TrendingUp />,
      color: themeMode === 'light' ? '#E91E63' : '#F48FB1',
      bgColor: themeMode === 'light' ? 'rgba(233, 30, 99, 0.1)' : 'rgba(233, 30, 99, 0.2)'
    }
  ];

  return (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      {stats.map((stat, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Card
            sx={{
              p: 3,
              borderRadius: 3,
              bgcolor: 'background.paper',
              border: '1px solid',
              borderColor: themeMode === 'light' 
                ? 'rgba(0, 0, 0, 0.08)' 
                : 'rgba(255, 255, 255, 0.08)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: themeMode === 'light' 
                  ? '0 8px 16px rgba(0, 0, 0, 0.1)'
                  : '0 8px 16px rgba(0, 0, 0, 0.3)',
              }
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 48,
                  height: 48,
                  borderRadius: 2,
                  bgcolor: stat.bgColor,
                  color: stat.color,
                  mr: 2
                }}
              >
                {stat.icon}
              </Box>
              <Box>
                <Typography 
                  variant="h4" 
                  fontWeight={700}
                  sx={{
                    color: 'text.primary' // This ensures text is visible in both themes
                  }}
                >
                  {stat.value}
                </Typography>
                <Typography 
                  variant="body2" 
                  sx={{
                    color: 'text.secondary', // This ensures text is visible in both themes
                    mt: 0.5
                  }}
                >
                  {stat.title}
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                height: 4,
                borderRadius: 2,
                background: `linear-gradient(90deg, ${stat.color} 0%, ${stat.color}80 100%)`,
                mt: 1
              }}
            />
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default StatsCards;
import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  IconButton,
  Button,
  Chip,
  Avatar,
  AvatarGroup,
  Badge,
  Tooltip,
  Fade,
  Zoom,
  Slide,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  TextField,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery,
  Tabs,
  Tab,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
  LinearProgress,
  Alert,
  AlertTitle,
} from "@mui/material";
import {
  Today,
  Event,
  Add,
  FilterList,
  Search,
  ViewWeek,
  ViewDay,
  ViewAgenda,
  ViewModule,
  ChevronLeft,
  ChevronRight,
  DateRange,
  AccessTime,
  LocationOn,
  VideoCall,
  Groups,
  Person,
  Notifications,
  MoreVert,
  Star,
  StarBorder,
  CheckCircle,
  Schedule,
  Edit,
  Delete,
  Share,
  Download,
  Print,
  Refresh,
  Settings,
  LightMode,
  DarkMode,
  WbSunny,
  NightsStay,
  CalendarMonth,
  Timeline,
  TrendingUp,
  BarChart,
  PieChart,
  Chat,
  AttachFile,
  Cloud,
  Sync,
  DoneAll,
  Pending,
  Cancel,
  Done,
  FiberManualRecord,
  KeyboardArrowDown,
  KeyboardArrowUp,
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { format, addDays, subDays, startOfWeek, endOfWeek, isToday, isSameDay, parseISO } from "date-fns";

export default function Calendar() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState("month");
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [loading, setLoading] = useState(false);
  const [showEventDialog, setShowEventDialog] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: "", date: "", time: "", type: "meeting" });
  const [themeMode, setThemeMode] = useState(theme.palette.mode);

  // Mock events data
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Team Standup",
      date: new Date().toISOString().split("T")[0],
      time: "09:00",
      duration: 30,
      type: "meeting",
      participants: 5,
      color: "#3B82F6",
      status: "upcoming",
      priority: "high",
      description: "Daily team sync",
      location: "Conference Room A",
      recurring: true,
    },
    {
      id: 2,
      title: "Client Presentation",
      date: format(addDays(new Date(), 1), "yyyy-MM-dd"),
      time: "14:00",
      duration: 60,
      type: "presentation",
      participants: 8,
      color: "#8B5CF6",
      status: "upcoming",
      priority: "high",
      description: "Quarterly review with client",
      location: "Virtual",
      recurring: false,
    },
    {
      id: 3,
      title: "Design Review",
      date: format(addDays(new Date(), 2), "yyyy-MM-dd"),
      time: "11:00",
      duration: 45,
      type: "review",
      participants: 3,
      color: "#10B981",
      status: "upcoming",
      priority: "medium",
      description: "UI/UX design feedback session",
      location: "Design Studio",
      recurring: false,
    },
    {
      id: 4,
      title: "Weekly Planning",
      date: format(addDays(new Date(), 3), "yyyy-MM-dd"),
      time: "10:00",
      duration: 90,
      type: "planning",
      participants: 6,
      color: "#F59E0B",
      status: "upcoming",
      priority: "medium",
      description: "Sprint planning and task allocation",
      location: "Main Conference Room",
      recurring: true,
    },
    {
      id: 5,
      title: "Completed: Budget Meeting",
      date: format(subDays(new Date(), 1), "yyyy-MM-dd"),
      time: "15:30",
      duration: 60,
      type: "meeting",
      participants: 4,
      color: "#6B7280",
      status: "completed",
      priority: "low",
      description: "Quarterly budget review",
      location: "Finance Dept",
      recurring: false,
    },
  ]);

  // View modes
  const viewModes = [
    { value: "day", label: "Day", icon: <ViewDay /> },
    { value: "week", label: "Week", icon: <ViewWeek /> },
    { value: "month", label: "Month", icon: <ViewModule /> },
    { value: "agenda", label: "Agenda", icon: <ViewAgenda /> },
  ];

  // Event types with colors
  const eventTypes = [
    { type: "meeting", label: "Meeting", color: "#3B82F6", icon: <Groups /> },
    { type: "presentation", label: "Presentation", color: "#8B5CF6", icon: <VideoCall /> },
    { type: "review", label: "Review", color: "#10B981", icon: <CheckCircle /> },
    { type: "planning", label: "Planning", color: "#F59E0B", icon: <Timeline /> },
    { type: "personal", label: "Personal", color: "#EC4899", icon: <Person /> },
  ];

  // Status options
  const statusOptions = [
    { value: "upcoming", label: "Upcoming", color: "#3B82F6", icon: <Schedule /> },
    { value: "in-progress", label: "In Progress", color: "#F59E0B", icon: <Pending /> },
    { value: "completed", label: "Completed", color: "#10B981", icon: <DoneAll /> },
    { value: "cancelled", label: "Cancelled", color: "#EF4444", icon: <Cancel /> },
  ];

  // Navigation functions
  const navigateDate = (direction) => {
    if (direction === "prev") {
      setCurrentDate(subDays(currentDate, viewMode === "day" ? 1 : viewMode === "week" ? 7 : 30));
    } else {
      setCurrentDate(addDays(currentDate, viewMode === "day" ? 1 : viewMode === "week" ? 7 : 30));
    }
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  // Get events for current view
  const getEventsForDate = (date) => {
    return events.filter(event => isSameDay(parseISO(event.date), date));
  };

  // Get week range
  const getWeekRange = () => {
    const start = startOfWeek(currentDate, { weekStartsOn: 1 });
    const end = endOfWeek(currentDate, { weekStartsOn: 1 });
    return { start, end };
  };

  // Generate days for week view
  const generateWeekDays = () => {
    const { start } = getWeekRange();
    return Array.from({ length: 7 }, (_, i) => addDays(start, i));
  };

  // Add new event
  const handleAddEvent = () => {
    setLoading(true);
    setTimeout(() => {
      const newEventData = {
        id: events.length + 1,
        ...newEvent,
        color: eventTypes.find(t => t.type === newEvent.type)?.color || "#3B82F6",
        status: "upcoming",
        participants: 1,
        duration: 60,
      };
      setEvents([...events, newEventData]);
      setNewEvent({ title: "", date: "", time: "", type: "meeting" });
      setShowEventDialog(false);
      setLoading(false);
    }, 1000);
  };

  // Toggle event status
  const toggleEventStatus = (eventId, newStatus) => {
    setEvents(events.map(event =>
      event.id === eventId ? { ...event, status: newStatus } : event
    ));
  };

  // Toggle theme
  const toggleTheme = () => {
    setThemeMode(prev => prev === "light" ? "dark" : "light");
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <Box sx={{ p: 3, bgcolor: "background.default", minHeight: "100vh" }}>
        {/* Header */}
        <motion.div variants={itemVariants}>
          <Paper
            elevation={0}
            sx={{
              p: 3,
              mb: 3,
              borderRadius: 4,
              bgcolor: "background.paper",
              border: "1px solid",
              borderColor: "divider",
              background: themeMode === "light"
                ? "linear-gradient(135deg, rgba(59, 130, 246, 0.05) 0%, rgba(139, 92, 246, 0.05) 100%)"
                : "linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)",
              position: "relative",
              overflow: "hidden",
              "&::before": {
                content: '""',
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "4px",
                background: "linear-gradient(90deg, #3B82F6, #8B5CF6, #10B981)",
              },
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <CalendarMonth sx={{ fontSize: 40, color: "primary.main" }} />
                <Box>
                  <Typography variant="h3" fontWeight={800} sx={{ 
                    background: "linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    color: "transparent",
                  }}>
                    Calendar
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Manage meetings, schedules & appointments
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ display: "flex", gap: 1 }}>
                <Tooltip title="Toggle theme">
                  <IconButton onClick={toggleTheme} sx={{ 
                    bgcolor: "action.hover",
                    "&:hover": { bgcolor: "action.selected" },
                  }}>
                    {themeMode === "light" ? <DarkMode /> : <LightMode />}
                  </IconButton>
                </Tooltip>
                <Tooltip title="Sync calendar">
                  <IconButton sx={{ 
                    bgcolor: "action.hover",
                    "&:hover": { bgcolor: "action.selected" },
                  }}>
                    <Sync />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Settings">
                  <IconButton sx={{ 
                    bgcolor: "action.hover",
                    "&:hover": { bgcolor: "action.selected" },
                  }}>
                    <Settings />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>

            {/* Stats */}
            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={6} md={3}>
                <Card sx={{ 
                  bgcolor: "rgba(59, 130, 246, 0.1)",
                  border: "1px solid rgba(59, 130, 246, 0.2)",
                  borderRadius: 3,
                }}>
                  <CardContent>
                    <Typography variant="h4" fontWeight={700} color="primary.main">
                      {events.filter(e => e.status === "upcoming").length}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Upcoming Events
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={6} md={3}>
                <Card sx={{ 
                  bgcolor: "rgba(16, 185, 129, 0.1)",
                  border: "1px solid rgba(16, 185, 129, 0.2)",
                  borderRadius: 3,
                }}>
                  <CardContent>
                    <Typography variant="h4" fontWeight={700} color="success.main">
                      {events.filter(e => e.status === "completed").length}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Completed
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={6} md={3}>
                <Card sx={{ 
                  bgcolor: "rgba(245, 158, 11, 0.1)",
                  border: "1px solid rgba(245, 158, 11, 0.2)",
                  borderRadius: 3,
                }}>
                  <CardContent>
                    <Typography variant="h4" fontWeight={700} color="warning.main">
                      {events.reduce((sum, event) => sum + event.participants, 0)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Total Participants
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={6} md={3}>
                <Card sx={{ 
                  bgcolor: "rgba(139, 92, 246, 0.1)",
                  border: "1px solid rgba(139, 92, 246, 0.2)",
                  borderRadius: 3,
                }}>
                  <CardContent>
                    <Typography variant="h4" fontWeight={700} color="secondary.main">
                      {events.filter(e => e.recurring).length}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Recurring Events
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Paper>
        </motion.div>

        {/* Controls & Navigation */}
        <motion.div variants={itemVariants}>
          <Paper
            elevation={0}
            sx={{
              p: 2,
              mb: 3,
              borderRadius: 3,
              bgcolor: "background.paper",
              border: "1px solid",
              borderColor: "divider",
            }}
          >
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2, alignItems: "center" }}>
              {/* Date Navigation */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Tooltip title="Previous">
                  <IconButton onClick={() => navigateDate("prev")}>
                    <ChevronLeft />
                  </IconButton>
                </Tooltip>
                <Button
                  variant="outlined"
                  startIcon={<Today />}
                  onClick={goToToday}
                  sx={{ borderRadius: 2 }}
                >
                  Today
                </Button>
                <Typography variant="h6" fontWeight={600} sx={{ minWidth: 200 }}>
                  {viewMode === "month" && format(currentDate, "MMMM yyyy")}
                  {viewMode === "week" && `Week of ${format(getWeekRange().start, "MMM d")}`}
                  {viewMode === "day" && format(currentDate, "EEEE, MMMM d, yyyy")}
                </Typography>
                <Tooltip title="Next">
                  <IconButton onClick={() => navigateDate("next")}>
                    <ChevronRight />
                  </IconButton>
                </Tooltip>
              </Box>

              {/* View Mode Selector */}
              <Tabs
                value={viewMode}
                onChange={(e, value) => setViewMode(value)}
                sx={{ 
                  ml: "auto",
                  "& .MuiTab-root": { minHeight: 48, borderRadius: 2 },
                }}
              >
                {viewModes.map((mode) => (
                  <Tab
                    key={mode.value}
                    value={mode.value}
                    icon={mode.icon}
                    label={!isMobile && mode.label}
                    sx={{ textTransform: "none" }}
                  />
                ))}
              </Tabs>

              {/* Search & Filter */}
              <Box sx={{ display: "flex", gap: 1 }}>
                <TextField
                  size="small"
                  placeholder="Search events..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  InputProps={{
                    startAdornment: <Search sx={{ mr: 1, color: "text.secondary" }} />,
                  }}
                  sx={{ width: 200 }}
                />
                <Tooltip title="Filter">
                  <IconButton>
                    <FilterList />
                  </IconButton>
                </Tooltip>
                <Fab
                  color="primary"
                  size="medium"
                  onClick={() => setShowEventDialog(true)}
                  sx={{ boxShadow: 3 }}
                >
                  <Add />
                </Fab>
              </Box>
            </Box>
          </Paper>
        </motion.div>

        {/* Quick Actions - Placed above the main calendar views */}
        <motion.div variants={itemVariants}>
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3, borderRadius: 3, height: "100%" }}>
                <Typography variant="h5" fontWeight={600} gutterBottom>
                  Quick Actions
                </Typography>
                <List>
                  {[
                    { icon: <VideoCall />, label: "Schedule Meeting", color: "primary" },
                    { icon: <Share />, label: "Share Calendar", color: "secondary" },
                    { icon: <Download />, label: "Export Events", color: "success" },
                    { icon: <Print />, label: "Print Schedule", color: "warning" },
                    { icon: <Notifications />, label: "Set Reminder", color: "info" },
                  ].map((action, index) => (
                    <ListItem
                      key={index}
                      button
                      sx={{
                        mb: 1,
                        borderRadius: 2,
                        "&:hover": {
                          bgcolor: "action.hover",
                          transform: "translateX(4px)",
                        },
                        transition: "all 0.2s ease",
                      }}
                    >
                      <ListItemIcon>
                        <Box
                          sx={{
                            width: 36,
                            height: 36,
                            borderRadius: "10px",
                            bgcolor: `${action.color}.main`,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "white",
                          }}
                        >
                          {action.icon}
                        </Box>
                      </ListItemIcon>
                      <ListItemText primary={action.label} />
                      <ChevronRight fontSize="small" />
                    </ListItem>
                  ))}
                </List>

                {/* Event Creation Progress */}
                <Box sx={{ mt: 3 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Event Creation Progress
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={75}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      mb: 1,
                    }}
                  />
                  <Typography variant="caption" color="text.secondary">
                    3 of 4 events scheduled this week
                  </Typography>
                </Box>
              </Paper>
            </Grid>

            {/* Main Calendar Views - Placed on the right side */}
            <Grid item xs={12} md={8}>
              <motion.div variants={itemVariants}>
                {viewMode === "month" && (
                  <Grid container spacing={2}>
                    {/* Weekday Headers */}
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                      <Grid item xs key={day}>
                        <Paper
                          sx={{
                            p: 2,
                            textAlign: "center",
                            bgcolor: "action.hover",
                            borderRadius: 2,
                          }}
                        >
                          <Typography variant="subtitle2" fontWeight={600}>
                            {day}
                          </Typography>
                        </Paper>
                      </Grid>
                    ))}

                    {/* Days Grid */}
                    {Array.from({ length: 42 }).map((_, index) => {
                      const date = addDays(startOfWeek(currentDate, { weekStartsOn: 1 }), index);
                      const dayEvents = getEventsForDate(date);
                      const isCurrentDay = isToday(date);

                      return (
                        <Grid item xs key={index}>
                          <Paper
                            sx={{
                              p: 2,
                              minHeight: 120,
                              bgcolor: isCurrentDay ? "primary.main" : "background.paper",
                              color: isCurrentDay ? "white" : "text.primary",
                              borderRadius: 3,
                              border: "1px solid",
                              borderColor: "divider",
                              position: "relative",
                              overflow: "hidden",
                              transition: "all 0.3s ease",
                              "&:hover": {
                                transform: "translateY(-4px)",
                                boxShadow: 4,
                              },
                            }}
                          >
                            <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                              <Typography
                                variant="body2"
                                fontWeight={isCurrentDay ? 700 : 500}
                              >
                                {format(date, "d")}
                              </Typography>
                              {dayEvents.length > 0 && (
                                <Badge
                                  badgeContent={dayEvents.length}
                                  color="primary"
                                  sx={{
                                    "& .MuiBadge-badge": {
                                      bgcolor: isCurrentDay ? "white" : "primary.main",
                                      color: isCurrentDay ? "primary.main" : "white",
                                    },
                                  }}
                                />
                              )}
                            </Box>

                            {/* Events for the day */}
                            <Box sx={{ maxHeight: 80, overflowY: "auto" }}>
                              {dayEvents.slice(0, 2).map((event) => (
                                <Tooltip key={event.id} title={event.title}>
                                  <Chip
                                    size="small"
                                    label={event.title}
                                    sx={{
                                      mb: 0.5,
                                      width: "100%",
                                      justifyContent: "flex-start",
                                      bgcolor: `${event.color}20`,
                                      color: event.color,
                                      border: `1px solid ${event.color}40`,
                                      "& .MuiChip-label": {
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                      },
                                    }}
                                    onClick={() => setSelectedEvent(event)}
                                  />
                                </Tooltip>
                              ))}
                              {dayEvents.length > 2 && (
                                <Typography variant="caption" color="text.secondary">
                                  +{dayEvents.length - 2} more
                                </Typography>
                              )}
                            </Box>
                          </Paper>
                        </Grid>
                      );
                    })}
                  </Grid>
                )}

                {viewMode === "week" && (
                  <Grid container spacing={2}>
                    {generateWeekDays().map((date, index) => {
                      const dayEvents = getEventsForDate(date);
                      const isCurrentDay = isToday(date);

                      return (
                        <Grid item xs={12} md key={index}>
                          <Paper
                            sx={{
                              p: 2,
                              minHeight: 400,
                              bgcolor: isCurrentDay ? "primary.main" : "background.paper",
                              color: isCurrentDay ? "white" : "text.primary",
                              borderRadius: 3,
                              border: "1px solid",
                              borderColor: "divider",
                            }}
                          >
                            <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                              {format(date, "EEE")}
                            </Typography>
                            <Typography variant="h5" fontWeight={700}>
                              {format(date, "d")}
                            </Typography>

                            <Box sx={{ mt: 2 }}>
                              {dayEvents.map((event) => (
                                <Card
                                  key={event.id}
                                  sx={{
                                    mb: 1,
                                    bgcolor: `${event.color}15`,
                                    borderLeft: `4px solid ${event.color}`,
                                    borderRadius: 2,
                                    cursor: "pointer",
                                    "&:hover": {
                                      bgcolor: `${event.color}25`,
                                    },
                                  }}
                                  onClick={() => setSelectedEvent(event)}
                                >
                                  <CardContent sx={{ p: 1.5, "&:last-child": { pb: 1.5 } }}>
                                    <Typography variant="subtitle2" fontWeight={600}>
                                      {event.title}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                      {event.time} • {event.duration}min
                                    </Typography>
                                  </CardContent>
                                </Card>
                              ))}
                            </Box>
                          </Paper>
                        </Grid>
                      );
                    })}
                  </Grid>
                )}

                {viewMode === "day" && (
                  <Paper sx={{ p: 3, borderRadius: 3 }}>
                    <Typography variant="h6" gutterBottom>
                      Schedule for {format(currentDate, "EEEE, MMMM d, yyyy")}
                    </Typography>
                    <List>
                      {getEventsForDate(currentDate).map((event) => (
                        <ListItem
                          key={event.id}
                          sx={{
                            mb: 2,
                            borderRadius: 2,
                            bgcolor: `${event.color}10`,
                            borderLeft: `4px solid ${event.color}`,
                            "&:hover": {
                              bgcolor: `${event.color}20`,
                            },
                          }}
                        >
                          <ListItemIcon>
                            <Box
                              sx={{
                                width: 40,
                                height: 40,
                                borderRadius: "50%",
                                bgcolor: `${event.color}30`,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              {eventTypes.find(t => t.type === event.type)?.icon}
                            </Box>
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <Typography variant="subtitle1" fontWeight={600}>
                                  {event.title}
                                </Typography>
                                <Chip
                                  size="small"
                                  label={event.status}
                                  sx={{
                                    bgcolor: statusOptions.find(s => s.value === event.status)?.color,
                                    color: "white",
                                    fontSize: "0.7rem",
                                  }}
                                />
                              </Box>
                            }
                            secondary={
                              <Box sx={{ display: "flex", alignItems: "center", gap: 2, mt: 0.5 }}>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                  <AccessTime fontSize="small" />
                                  <Typography variant="caption">
                                    {event.time} ({event.duration} min)
                                  </Typography>
                                </Box>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                  <LocationOn fontSize="small" />
                                  <Typography variant="caption">{event.location}</Typography>
                                </Box>
                                <AvatarGroup max={3} sx={{ "& .MuiAvatar-root": { width: 24, height: 24 } }}>
                                  {Array.from({ length: event.participants }).map((_, i) => (
                                    <Avatar key={i} sx={{ bgcolor: event.color }}>
                                      {i + 1}
                                    </Avatar>
                                  ))}
                                </AvatarGroup>
                              </Box>
                            }
                          />
                          <ListItemSecondaryAction>
                            <IconButton onClick={() => toggleEventStatus(event.id, "completed")}>
                              <CheckCircle />
                            </IconButton>
                          </ListItemSecondaryAction>
                        </ListItem>
                      ))}
                    </List>
                  </Paper>
                )}

                {viewMode === "agenda" && (
                  <Paper sx={{ p: 3, borderRadius: 3 }}>
                    <Typography variant="h6" gutterBottom>
                      Upcoming Events Agenda
                    </Typography>
                    <List>
                      {events
                        .filter(event => event.status === "upcoming")
                        .sort((a, b) => new Date(a.date) - new Date(b.date))
                        .map((event) => (
                          <Slide key={event.id} direction="up" in={true}>
                            <ListItem
                              sx={{
                                mb: 2,
                                p: 2,
                                borderRadius: 3,
                                bgcolor: "background.paper",
                                border: "1px solid",
                                borderColor: "divider",
                                "&:hover": {
                                  bgcolor: "action.hover",
                                  transform: "translateX(8px)",
                                },
                                transition: "all 0.3s ease",
                              }}
                            >
                              <ListItemIcon>
                                <Box
                                  sx={{
                                    width: 48,
                                    height: 48,
                                    borderRadius: "12px",
                                    bgcolor: `${event.color}20`,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    border: `2px solid ${event.color}`,
                                  }}
                                >
                                  {eventTypes.find(t => t.type === event.type)?.icon}
                                </Box>
                              </ListItemIcon>
                              <ListItemText
                                primary={
                                  <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                                    <Typography variant="h6" fontWeight={600}>
                                      {event.title}
                                    </Typography>
                                    <Chip
                                      icon={<StarBorder />}
                                      label={event.priority}
                                      size="small"
                                      sx={{
                                        bgcolor: event.priority === "high" ? "error.main" : 
                                                event.priority === "medium" ? "warning.main" : "success.main",
                                        color: "white",
                                      }}
                                    />
                                  </Box>
                                }
                                secondary={
                                  <Box sx={{ mt: 1 }}>
                                    <Typography variant="body2" color="text.secondary">
                                      {event.description}
                                    </Typography>
                                    <Box sx={{ display: "flex", gap: 3, mt: 1 }}>
                                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                        <DateRange fontSize="small" />
                                        <Typography variant="caption">
                                          {format(parseISO(event.date), "MMM d, yyyy")}
                                        </Typography>
                                      </Box>
                                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                        <AccessTime fontSize="small" />
                                        <Typography variant="caption">
                                          {event.time} • {event.duration}min
                                        </Typography>
                                      </Box>
                                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                        <LocationOn fontSize="small" />
                                        <Typography variant="caption">{event.location}</Typography>
                                      </Box>
                                    </Box>
                                  </Box>
                                }
                              />
                              <ListItemSecondaryAction>
                                <IconButton onClick={() => setSelectedEvent(event)}>
                                  <MoreVert />
                                </IconButton>
                              </ListItemSecondaryAction>
                            </ListItem>
                          </Slide>
                        ))}
                    </List>
                  </Paper>
                )}
              </motion.div>
            </Grid>
          </Grid>
        </motion.div>

        {/* Event Types Overview - Below the main content */}
        <motion.div variants={itemVariants}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper sx={{ p: 3, borderRadius: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
                  <Typography variant="h5" fontWeight={600}>
                    Event Types Overview
                  </Typography>
                  <Tooltip title="View analytics">
                    <IconButton>
                      <BarChart />
                    </IconButton>
                  </Tooltip>
                </Box>

                <Grid container spacing={2}>
                  {eventTypes.map((type) => {
                    const count = events.filter(e => e.type === type.type).length;
                    const percentage = (count / events.length) * 100;

                    return (
                      <Grid item xs={6} md={2.4} key={type.type}>
                        <Card
                          sx={{
                            p: 2,
                            textAlign: "center",
                            borderRadius: 3,
                            bgcolor: `${type.color}10`,
                            border: `1px solid ${type.color}30`,
                            cursor: "pointer",
                            "&:hover": {
                              transform: "translateY(-4px)",
                              boxShadow: 4,
                            },
                            transition: "all 0.3s ease",
                          }}
                        >
                          <Box
                            sx={{
                              width: 48,
                              height: 48,
                              borderRadius: "50%",
                              bgcolor: type.color,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              margin: "0 auto 12px",
                              color: "white",
                            }}
                          >
                            {type.icon}
                          </Box>
                          <Typography variant="subtitle2" fontWeight={600}>
                            {type.label}
                          </Typography>
                          <Typography variant="h5" fontWeight={700} sx={{ my: 1 }}>
                            {count}
                          </Typography>
                          <LinearProgress
                            variant="determinate"
                            value={percentage}
                            sx={{
                              height: 6,
                              borderRadius: 3,
                              bgcolor: `${type.color}30`,
                              "& .MuiLinearProgress-bar": {
                                bgcolor: type.color,
                              },
                            }}
                          />
                        </Card>
                      </Grid>
                    );
                  })}
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </motion.div>

        {/* Selected Event Dialog */}
        <Dialog
          open={!!selectedEvent}
          onClose={() => setSelectedEvent(null)}
          maxWidth="sm"
          fullWidth
          TransitionComponent={Fade}
        >
          {selectedEvent && (
            <>
              <DialogTitle sx={{ 
                bgcolor: selectedEvent.color,
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}>
                <Typography variant="h6" fontWeight={600}>
                  {selectedEvent.title}
                </Typography>
                <IconButton onClick={() => setSelectedEvent(null)} sx={{ color: "white" }}>
                  <ChevronLeft />
                </IconButton>
              </DialogTitle>
              <DialogContent sx={{ p: 3 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
                      <Box sx={{ 
                        width: 60,
                        height: 60,
                        borderRadius: "16px",
                        bgcolor: `${selectedEvent.color}20`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: `2px solid ${selectedEvent.color}`,
                      }}>
                        {eventTypes.find(t => t.type === selectedEvent.type)?.icon}
                      </Box>
                      <Box>
                        <Typography variant="h6" fontWeight={600}>
                          {selectedEvent.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {selectedEvent.description}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>

                  <Grid item xs={6}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <DateRange color="action" />
                      <Box>
                        <Typography variant="caption" color="text.secondary">
                          Date
                        </Typography>
                        <Typography variant="body2">
                          {format(parseISO(selectedEvent.date), "EEEE, MMMM d, yyyy")}
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>

                  <Grid item xs={6}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <AccessTime color="action" />
                      <Box>
                        <Typography variant="caption" color="text.secondary">
                          Time
                        </Typography>
                        <Typography variant="body2">
                          {selectedEvent.time} ({selectedEvent.duration} minutes)
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>

                  <Grid item xs={12}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <LocationOn color="action" />
                      <Box>
                        <Typography variant="caption" color="text.secondary">
                          Location
                        </Typography>
                        <Typography variant="body2">{selectedEvent.location}</Typography>
                      </Box>
                    </Box>
                  </Grid>

                  <Grid item xs={12}>
                    <Typography variant="subtitle2" gutterBottom>
                      Participants ({selectedEvent.participants})
                    </Typography>
                    <AvatarGroup max={5}>
                      {Array.from({ length: selectedEvent.participants }).map((_, i) => (
                        <Avatar key={i} sx={{ bgcolor: selectedEvent.color }}>
                          {i + 1}
                        </Avatar>
                      ))}
                    </AvatarGroup>
                  </Grid>

                  <Grid item xs={12}>
                    <Typography variant="subtitle2" gutterBottom>
                      Status
                    </Typography>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      {statusOptions.map((status) => (
                        <Chip
                          key={status.value}
                          label={status.label}
                          icon={status.icon}
                          onClick={() => toggleEventStatus(selectedEvent.id, status.value)}
                          sx={{
                            bgcolor: selectedEvent.status === status.value ? status.color : "action.hover",
                            color: selectedEvent.status === status.value ? "white" : "text.primary",
                          }}
                        />
                      ))}
                    </Box>
                  </Grid>
                </Grid>
              </DialogContent>
              <DialogActions sx={{ p: 3, pt: 0 }}>
                <Button startIcon={<Edit />} variant="outlined">
                  Edit Event
                </Button>
                <Button startIcon={<Delete />} variant="outlined" color="error">
                  Delete
                </Button>
                <Button startIcon={<Share />} variant="contained">
                  Share
                </Button>
              </DialogActions>
            </>
          )}
        </Dialog>

        {/* Add Event Dialog */}
        <Dialog
          open={showEventDialog}
          onClose={() => setShowEventDialog(false)}
          maxWidth="sm"
          fullWidth
          TransitionComponent={Slide}
          TransitionProps={{ direction: "up" }}
        >
          <DialogTitle>
            <Typography variant="h5" fontWeight={600}>
              Schedule New Event
            </Typography>
          </DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 2 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Event Title"
                    value={newEvent.title}
                    onChange={(e) => setNewEvent({...newEvent, title: e.target.value})}
                    placeholder="Team meeting, Presentation, etc."
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Date"
                    type="date"
                    value={newEvent.date}
                    onChange={(e) => setNewEvent({...newEvent, date: e.target.value})}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    label="Time"
                    type="time"
                    value={newEvent.time}
                    onChange={(e) => setNewEvent({...newEvent, time: e.target.value})}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" gutterBottom>
                    Event Type
                  </Typography>
                  <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                    {eventTypes.map((type) => (
                      <Chip
                        key={type.type}
                        icon={type.icon}
                        label={type.label}
                        onClick={() => setNewEvent({...newEvent, type: type.type})}
                        sx={{
                          bgcolor: newEvent.type === type.type ? type.color : "action.hover",
                          color: newEvent.type === type.type ? "white" : "text.primary",
                        }}
                      />
                    ))}
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button onClick={() => setShowEventDialog(false)}>Cancel</Button>
            <Button
              variant="contained"
              onClick={handleAddEvent}
              disabled={loading || !newEvent.title || !newEvent.date}
              startIcon={loading ? <CircularProgress size={20} /> : <Add />}
            >
              {loading ? "Scheduling..." : "Schedule Event"}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Floating Action Button for Mobile */}
        <Fab
          color="primary"
          sx={{
            position: "fixed",
            bottom: 24,
            right: 24,
            display: { xs: "flex", md: "none" },
          }}
          onClick={() => setShowEventDialog(true)}
        >
          <Add />
        </Fab>

        {/* Animated Background Elements */}
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            pointerEvents: "none",
            zIndex: -1,
            overflow: "hidden",
          }}
        >
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              style={{
                position: "absolute",
                width: Math.random() * 100 + 50,
                height: Math.random() * 100 + 50,
                borderRadius: "50%",
                background: `radial-gradient(circle, rgba(59, 130, 246, ${0.05 + Math.random() * 0.1}) 0%, transparent 70%)`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                x: [0, Math.random() * 20 - 10, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </Box>
      </Box>
    </motion.div>
  );
}
import { useState, useRef } from "react";
import { 
  Box, 
  Typography, 
  TextField, 
  Button,
  Avatar,
  IconButton,
  Paper,
  Grid,
  Card,
  CardContent,
  Divider,
  Switch,
  FormControlLabel,
  FormGroup,
  Chip,
  Badge,
  LinearProgress,
  Alert,
  Snackbar,
  Tabs,
  Tab,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Slider,
  Rating,
  Tooltip,
  Fade,
  Zoom,
  Collapse,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  CardMedia,
  Container
} from "@mui/material";
import {
  Edit,
  CameraAlt,
  PhotoCamera,
  CloudUpload,
  Save,
  Cancel,
  Delete,
  Visibility,
  VisibilityOff,
  Person,
  Email,
  Phone,
  LocationOn,
  Language,
  CalendarToday,
  Work,
  School,
  Link,
  Security,
  Notifications,
  Palette,
  Brightness4,
  Brightness7,
  VolumeUp,
  VolumeOff,
  Wifi,
  Storage,
  Verified,
  CheckCircle,
  Error,
  Warning,
  Info,
  Star,
  StarBorder,
  Favorite,
  FavoriteBorder,
  ThumbUp,
  Share,
  Download,
  Print,
  QrCode,
  Fingerprint,
  Face,
  VpnKey,
  Lock,
  LockOpen,
  Autorenew,
  Refresh,
  Sync,
  Cloud,
  Devices,
  Computer,
  PhoneAndroid,
  Tablet,
  Watch,
  Headset,
  Videocam,
  Mic,
  ScreenShare,
  Speaker,
  Email as EmailIcon,
  Chat,
  Forum,
  Groups,
  PersonAdd,
  Block,
  Report,
  Flag,
  Help,
  Feedback,
  Description,
  Article,
  Book,
  LibraryBooks,
  MenuBook,
  ImportContacts,
  LocalLibrary,
  CastForEducation,
  School as SchoolIcon,
  Work as WorkIcon,
  Business,
  Apartment,
  CorporateFare,
  Domain,
  Factory,
  Store,
  Storefront,
  ShoppingCart,
  LocalGroceryStore,
  Restaurant,
  LocalCafe,
  LocalBar,
  LocalPizza,
  Cake,
  Icecream,
  EmojiFoodBeverage,
  EmojiNature,
  EmojiPeople,
  EmojiObjects,
  EmojiSymbols,
  EmojiFlags,
  EmojiEvents,
  SportsEsports,
  SportsBasketball,
  SportsSoccer,
  SportsTennis,
  SportsVolleyball,
  FitnessCenter,
  DirectionsRun,
  DirectionsBike,
  Pool,
  SelfImprovement,
  Spa,
  LocalFlorist,
  Park,
  Terrain,
  Landscape,
  Waves,
  AcUnit,
  Whatshot,
  NightsStay,
  WbSunny,
  WbCloudy,
  WbTwilight,
  Brightness5,
  Brightness6,
  Brightness7 as Brightness7Icon,
  BrightnessLow,
  BrightnessMedium,
  BrightnessHigh
} from "@mui/icons-material";

export default function Profile() {
  const [activeTab, setActiveTab] = useState(0);
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    bio: "Senior Product Designer with 8+ years of experience in UX/UI design.",
    company: "TechCorp Inc.",
    position: "Lead Designer",
    website: "https://johndoe.design",
    twitter: "@johndoe",
    linkedin: "linkedin.com/in/johndoe",
    github: "github.com/johndoe"
  });
  const [preferences, setPreferences] = useState({
    darkMode: true,
    notifications: true,
    emailNotifications: true,
    sound: true,
    autoSave: true,
    twoFactorAuth: false,
    publicProfile: true,
    showOnlineStatus: true
  });
  const [password, setPassword] = useState({
    current: "",
    new: "",
    confirm: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [avatarSrc, setAvatarSrc] = useState(null);
  const [coverSrc, setCoverSrc] = useState(null);
  const [skills, setSkills] = useState([
    "UI/UX Design", "Figma", "React", "TypeScript", "Product Strategy", "User Research"
  ]);
  const [newSkill, setNewSkill] = useState("");
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [rating, setRating] = useState(4.5);
  const fileInputRef = useRef(null);
  const coverInputRef = useRef(null);

  // Dummy profile photos
  const dummyPhotos = [
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop&crop=face",
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=400&fit=crop&crop=face"
  ];

  const dummyCovers = [
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=400&fit=crop",
    "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=1200&h=400&fit=crop",
    "https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=1200&h=400&fit=crop",
    "https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=1200&h=400&fit=crop",
    "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=400&fit=crop"
  ];

  const handleSave = () => {
    setLoading(true);
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          clearInterval(interval);
          setLoading(false);
          showSnackbar("Profile updated successfully!", "success");
          return 100;
        }
        return Math.min(oldProgress + 20, 100);
      });
    }, 200);
  };

  const handleAvatarUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarSrc(e.target.result);
        showSnackbar("Profile picture updated!", "success");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCoverUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCoverSrc(e.target.result);
        showSnackbar("Cover photo updated!", "success");
      };
      reader.readAsDataURL(file);
    }
  };

  const selectDummyPhoto = (url) => {
    setAvatarSrc(url);
    showSnackbar("Profile picture selected!", "success");
  };

  const selectDummyCover = (url) => {
    setCoverSrc(url);
    showSnackbar("Cover photo selected!", "success");
  };

  const addSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill("");
      showSnackbar("Skill added!", "success");
    }
  };

  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter(skill => skill !== skillToRemove));
    showSnackbar("Skill removed!", "info");
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const handlePreferenceChange = (key) => (event) => {
    setPreferences({ ...preferences, [key]: event.target.checked });
    showSnackbar(`Preference updated: ${key}`, "info");
  };

  const tabs = [
    { label: "Profile", icon: <Person /> },
    { label: "Account", icon: <Security /> },
    { label: "Preferences", icon: <Palette /> },
    { label: "Security", icon: <Lock /> },
    { label: "Social", icon: <Groups /> }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      {/* Cover Photo Section */}
      <Paper
        sx={{
          position: 'relative',
          height: 200,
          mb: 4,
          borderRadius: 3,
          overflow: 'hidden',
          bgcolor: 'primary.main',
          backgroundImage: coverSrc 
            ? `url(${coverSrc})` 
            : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Cover Photo Overlay */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            bgcolor: 'rgba(0,0,0,0.3)',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'flex-end',
            p: 2,
          }}
        >
          <Tooltip title="Change cover photo">
            <IconButton 
              sx={{ 
                bgcolor: 'background.paper',
                '&:hover': { bgcolor: 'background.default' }
              }}
              onClick={() => coverInputRef.current?.click()}
            >
              <PhotoCamera />
            </IconButton>
          </Tooltip>
          <input
            type="file"
            ref={coverInputRef}
            style={{ display: 'none' }}
            accept="image/*"
            onChange={handleCoverUpload}
          />
        </Box>
      </Paper>

      {/* Profile Header */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, borderRadius: 3, position: 'relative', mt: -8 }}>
            {/* Avatar Section */}
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <Badge
                overlap="circular"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                badgeContent={
                  <IconButton
                    sx={{ bgcolor: 'primary.main', color: 'white' }}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <CameraAlt fontSize="small" />
                  </IconButton>
                }
              >
                <Avatar
                  src={avatarSrc || dummyPhotos[0]}
                  sx={{
                    width: 120,
                    height: 120,
                    border: '4px solid',
                    borderColor: 'background.paper',
                    mb: 2,
                  }}
                />
              </Badge>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                accept="image/*"
                onChange={handleAvatarUpload}
              />
              
              <Typography variant="h5" fontWeight={700} gutterBottom>
                {profileData.name}
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {profileData.position} • {profileData.company}
              </Typography>
              
              {/* Rating */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                <Rating value={rating} precision={0.5} readOnly size="small" />
                <Typography variant="caption" color="text.secondary">
                  ({rating})
                </Typography>
              </Box>
              
              {/* Verified Badge */}
              <Chip
                icon={<Verified />}
                label="Verified Profile"
                size="small"
                color="success"
                sx={{ mt: 2 }}
              />
            </Box>

            {/* Quick Stats */}
            <Box sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h6" fontWeight={700}>
                      245
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Followers
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h6" fontWeight={700}>
                      89
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Following
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h6" fontWeight={700}>
                      1.2K
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Posts
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Paper>

          {/* Photo Gallery */}
          <Paper sx={{ p: 3, borderRadius: 3, mt: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <PhotoCamera /> Choose Profile Picture
            </Typography>
            <Grid container spacing={1}>
              {dummyPhotos.map((photo, index) => (
                <Grid item xs={4} key={index}>
                  <Card
                    sx={{
                      cursor: 'pointer',
                      '&:hover': { transform: 'scale(1.05)' },
                      transition: 'transform 0.2s',
                    }}
                    onClick={() => selectDummyPhoto(photo)}
                  >
                    <CardMedia
                      component="img"
                      height="80"
                      image={photo}
                      alt={`Profile ${index + 1}`}
                    />
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>

          {/* Cover Photos */}
          <Paper sx={{ p: 3, borderRadius: 3, mt: 3 }}>
            <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <PhotoCamera /> Choose Cover Photo
            </Typography>
            <Grid container spacing={1}>
              {dummyCovers.map((cover, index) => (
                <Grid item xs={12} key={index}>
                  <Card
                    sx={{
                      cursor: 'pointer',
                      '&:hover': { transform: 'scale(1.02)' },
                      transition: 'transform 0.2s',
                      mb: 1,
                    }}
                    onClick={() => selectDummyCover(cover)}
                  >
                    <CardMedia
                      component="img"
                      height="80"
                      image={cover}
                      alt={`Cover ${index + 1}`}
                    />
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          {/* Tabs Navigation */}
          <Paper sx={{ mb: 3, borderRadius: 3 }}>
            <Tabs
              value={activeTab}
              onChange={(e, val) => setActiveTab(val)}
              variant="scrollable"
              scrollButtons="auto"
              sx={{
                borderBottom: 1,
                borderColor: 'divider',
                '& .MuiTab-root': {
                  py: 2,
                  minHeight: 64,
                },
              }}
            >
              {tabs.map((tab, index) => (
                <Tab key={index} icon={tab.icon} label={tab.label} />
              ))}
            </Tabs>

            {/* Tab Content */}
            <Box sx={{ p: 3 }}>
              {activeTab === 0 && (
                <Fade in={true}>
                  <Box>
                    {/* Profile Completion */}
                    <Box sx={{ mb: 3 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                          Profile Completion
                        </Typography>
                        <Typography variant="body2" fontWeight={600}>
                          85%
                        </Typography>
                      </Box>
                      <LinearProgress 
                        variant="determinate" 
                        value={85} 
                        sx={{ height: 8, borderRadius: 4 }}
                      />
                    </Box>

                    {/* Basic Information */}
                    <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Person /> Basic Information
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="Full Name"
                          value={profileData.name}
                          onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Person />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="Email"
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Email />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="Phone"
                          value={profileData.phone}
                          onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Phone />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="Location"
                          value={profileData.location}
                          onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <LocationOn />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                    </Grid>

                    {/* Bio */}
                    <TextField
                      fullWidth
                      label="Bio"
                      multiline
                      rows={4}
                      value={profileData.bio}
                      onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                      sx={{ mt: 3 }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Description />
                          </InputAdornment>
                        ),
                      }}
                    />

                    {/* Skills */}
                    <Box sx={{ mt: 3 }}>
                      <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Work /> Skills & Expertise
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                        {skills.map((skill, index) => (
                          <Chip
                            key={index}
                            label={skill}
                            onDelete={() => removeSkill(skill)}
                            color="primary"
                            variant="outlined"
                          />
                        ))}
                      </Box>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <TextField
                          size="small"
                          placeholder="Add a skill"
                          value={newSkill}
                          onChange={(e) => setNewSkill(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                          sx={{ flex: 1 }}
                        />
                        <Button 
                          variant="contained" 
                          onClick={addSkill}
                          startIcon={<PersonAdd />}
                        >
                          Add
                        </Button>
                      </Box>
                    </Box>
                  </Box>
                </Fade>
              )}

              {activeTab === 1 && (
                <Fade in={true}>
                  <Box>
                    <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Work /> Professional Information
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="Company"
                          value={profileData.company}
                          onChange={(e) => setProfileData({...profileData, company: e.target.value})}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Business />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="Position"
                          value={profileData.position}
                          onChange={(e) => setProfileData({...profileData, position: e.target.value})}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <WorkIcon />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                    </Grid>

                    {/* Social Links */}
                    <Typography variant="h6" gutterBottom sx={{ mt: 3, display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Link /> Social Links
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Website"
                          value={profileData.website}
                          onChange={(e) => setProfileData({...profileData, website: e.target.value})}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Language />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="Twitter"
                          value={profileData.twitter}
                          onChange={(e) => setProfileData({...profileData, twitter: e.target.value})}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Chat />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          label="LinkedIn"
                          value={profileData.linkedin}
                          onChange={(e) => setProfileData({...profileData, linkedin: e.target.value})}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Business />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                    </Grid>
                  </Box>
                </Fade>
              )}

              {activeTab === 2 && (
                <Fade in={true}>
                  <Box>
                    <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Palette /> Preferences
                    </Typography>
                    
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={preferences.darkMode}
                            onChange={handlePreferenceChange('darkMode')}
                            icon={<Brightness7 />}
                            checkedIcon={<Brightness4 />}
                          />
                        }
                        label="Dark Mode"
                      />
                      <FormControlLabel
                        control={
                          <Switch
                            checked={preferences.notifications}
                            onChange={handlePreferenceChange('notifications')}
                          />
                        }
                        label="Push Notifications"
                      />
                      <FormControlLabel
                        control={
                          <Switch
                            checked={preferences.emailNotifications}
                            onChange={handlePreferenceChange('emailNotifications')}
                          />
                        }
                        label="Email Notifications"
                      />
                      <FormControlLabel
                        control={
                          <Switch
                            checked={preferences.sound}
                            onChange={handlePreferenceChange('sound')}
                            icon={<VolumeOff />}
                            checkedIcon={<VolumeUp />}
                          />
                        }
                        label="Sound Effects"
                      />
                      <FormControlLabel
                        control={
                          <Switch
                            checked={preferences.autoSave}
                            onChange={handlePreferenceChange('autoSave')}
                          />
                        }
                        label="Auto Save"
                      />
                      <FormControlLabel
                        control={
                          <Switch
                            checked={preferences.publicProfile}
                            onChange={handlePreferenceChange('publicProfile')}
                          />
                        }
                        label="Public Profile"
                      />
                      <FormControlLabel
                        control={
                          <Switch
                            checked={preferences.showOnlineStatus}
                            onChange={handlePreferenceChange('showOnlineStatus')}
                          />
                        }
                        label="Show Online Status"
                      />
                    </FormGroup>

                    {/* Theme Color Picker */}
                    <Box sx={{ mt: 3 }}>
                      <Typography variant="subtitle1" gutterBottom>
                        Theme Color
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        {['#2196F3', '#9C27B0', '#4CAF50', '#FF9800', '#F44336'].map((color) => (
                          <Tooltip key={color} title={color}>
                            <Box
                              sx={{
                                width: 40,
                                height: 40,
                                borderRadius: '50%',
                                bgcolor: color,
                                cursor: 'pointer',
                                border: '3px solid',
                                borderColor: 'divider',
                                '&:hover': {
                                  transform: 'scale(1.1)',
                                },
                                transition: 'transform 0.2s',
                              }}
                            />
                          </Tooltip>
                        ))}
                      </Box>
                    </Box>
                  </Box>
                </Fade>
              )}

              {activeTab === 3 && (
                <Fade in={true}>
                  <Box>
                    <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Security /> Security Settings
                    </Typography>
                    
                    {/* Password Change */}
                    <Typography variant="subtitle1" gutterBottom sx={{ mt: 2 }}>
                      Change Password
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          type={showPassword ? "text" : "password"}
                          label="Current Password"
                          value={password.current}
                          onChange={(e) => setPassword({...password, current: e.target.value})}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton onClick={() => setShowPassword(!showPassword)}>
                                  {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          type="password"
                          label="New Password"
                          value={password.new}
                          onChange={(e) => setPassword({...password, new: e.target.value})}
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <TextField
                          fullWidth
                          type="password"
                          label="Confirm Password"
                          value={password.confirm}
                          onChange={(e) => setPassword({...password, confirm: e.target.value})}
                        />
                      </Grid>
                    </Grid>

                    {/* Two-Factor Authentication */}
                    <Box sx={{ mt: 3 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                        <Box>
                          <Typography variant="subtitle1">
                            Two-Factor Authentication
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Add an extra layer of security
                          </Typography>
                        </Box>
                        <Switch
                          checked={preferences.twoFactorAuth}
                          onChange={handlePreferenceChange('twoFactorAuth')}
                        />
                      </Box>
                      
                      {preferences.twoFactorAuth && (
                        <Alert severity="info" sx={{ mt: 1 }}>
                          Two-factor authentication is now enabled. You'll need to enter a code from your authenticator app when signing in.
                        </Alert>
                      )}
                    </Box>

                    {/* Security Devices */}
                    <Box sx={{ mt: 3 }}>
                      <Typography variant="subtitle1" gutterBottom>
                        Active Devices
                      </Typography>
                      <List>
                        <ListItem>
                          <ListItemIcon>
                            <Computer />
                          </ListItemIcon>
                          <ListItemText 
                            primary="MacBook Pro" 
                            secondary="Last active: 2 hours ago • San Francisco, CA" 
                          />
                          <ListItemSecondaryAction>
                            <IconButton edge="end">
                              <Block />
                            </IconButton>
                          </ListItemSecondaryAction>
                        </ListItem>
                        <ListItem>
                          <ListItemIcon>
                            <PhoneAndroid />
                          </ListItemIcon>
                          <ListItemText 
                            primary="iPhone 13" 
                            secondary="Last active: 5 minutes ago • Current device" 
                          />
                          <ListItemSecondaryAction>
                            <Chip label="Current" size="small" color="success" />
                          </ListItemSecondaryAction>
                        </ListItem>
                      </List>
                    </Box>
                  </Box>
                </Fade>
              )}

              {activeTab === 4 && (
                <Fade in={true}>
                  <Box>
                    <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Groups /> Social Settings
                    </Typography>
                    
                    <Alert severity="info" sx={{ mb: 3 }}>
                      Connect your social accounts to share your activity and find friends.
                    </Alert>

                    <Grid container spacing={2}>
                      <Grid item xs={12} md={6}>
                        <Card sx={{ p: 2 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Avatar sx={{ bgcolor: '#4267B2' }}>
                              f
                            </Avatar>
                            <Box sx={{ flex: 1 }}>
                              <Typography variant="subtitle1">
                                Facebook
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                Not connected
                              </Typography>
                            </Box>
                            <Button variant="outlined" size="small">
                              Connect
                            </Button>
                          </Box>
                        </Card>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Card sx={{ p: 2 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                            <Avatar sx={{ bgcolor: '#1DA1F2' }}>
                              t
                            </Avatar>
                            <Box sx={{ flex: 1 }}>
                              <Typography variant="subtitle1">
                                Twitter
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
                                Connected as @{profileData.twitter}
                              </Typography>
                            </Box>
                            <Button variant="outlined" size="small" color="error">
                              Disconnect
                            </Button>
                          </Box>
                        </Card>
                      </Grid>
                    </Grid>
                  </Box>
                </Fade>
              )}
            </Box>
          </Paper>

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            <Button
              variant="outlined"
              startIcon={<Cancel />}
              onClick={() => showSnackbar("Changes discarded", "info")}
            >
              Discard
            </Button>
            <Button
              variant="contained"
              startIcon={loading ? <CircularProgress size={20} /> : <Save />}
              onClick={handleSave}
              disabled={loading}
              sx={{ minWidth: 120 }}
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>
          </Box>

          {/* Progress Indicator */}
          {loading && (
            <Box sx={{ mt: 2 }}>
              <LinearProgress variant="determinate" value={progress} />
              <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
                Saving your changes...
              </Typography>
            </Box>
          )}
        </Grid>
      </Grid>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={() => setSnackbar({ ...snackbar, open: false })} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
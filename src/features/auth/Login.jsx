import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  Checkbox,
  FormControlLabel,
  Link,
  Alert,
  Fade,
  Zoom,
  Slide,
  Paper,
  CircularProgress,
  Tooltip,
  Chip,
  Badge,
  Avatar,
  AvatarGroup
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  Visibility,
  VisibilityOff,
  Lock,
  Email,
  Business,
  Fingerprint,
  QrCode,
  Smartphone,
  Language,
  Security,
  VerifiedUser,
  Cloud,
  People,
  ArrowForward,
  Google,
  Microsoft,
  Apple,
  GitHub,
  Twitter,
  Facebook,
  Login as LoginIcon,
  PersonAdd,
  Help,
  Info,
  Wifi,
  Shield,
  LockOpen,
  Key,
  VpnKey,
  Password,
  RememberMe,
  AutoAwesome,
  RocketLaunch,
  Star,
  WorkspacePremium,
  TrendingUp,
  Speed,
  Analytics,
  Insights,
  BarChart,
  Timeline,
  DonutSmall,
  ShowChart,
  MultilineChart,
  PieChart,
  BubbleChart,
  ScatterPlot
} from "@mui/icons-material";

// ✅ IMPORT IMAGE
import loginImage from "../../assets/image/login-banner.webp";

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    companyCode: "",
    email: "",
    password: "",
    twoFactorCode: ""
  });
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [loginMethod, setLoginMethod] = useState("password"); // password, qr, biometric
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (!formData.email || !formData.password) {
      setError("Please fill in all required fields");
      return;
    }

    setLoading(true);
    setError("");

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      navigate("/dashboard");
    }, 1500);
  };

  const handleSocialLogin = (provider) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigate("/dashboard");
    }, 1000);
  };

  const handleForgotPassword = () => {
    // Implement forgot password flow
    console.log("Forgot password clicked");
  };

  const toggleTwoFactor = () => {
    setShowTwoFactor(!showTwoFactor);
  };

  const quickDemoLogin = (demoType) => {
    const demos = {
      admin: { companyCode: "ADMIN001", email: "admin@verzat.com", password: "demo123" },
      user: { companyCode: "USER001", email: "user@verzat.com", password: "demo123" },
      guest: { companyCode: "GUEST001", email: "guest@verzat.com", password: "demo123" }
    };
    
    setFormData(demos[demoType]);
    setError("");
  };

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      
      {/* LEFT IMAGE SECTION - Enhanced */}
      <Box
        sx={{
          flex: 1,
          backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.9), rgba(15, 23, 42, 0.7)), url(${loginImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
          display: { xs: "none", lg: "flex" },
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          p: 4,
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Animated Background Elements */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "radial-gradient(circle at 20% 50%, rgba(56, 189, 248, 0.1) 0%, transparent 50%)",
            animation: "pulse 4s ease-in-out infinite",
            "@keyframes pulse": {
              "0%, 100%": { opacity: 0.3 },
              "50%": { opacity: 0.6 }
            }
          }}
        />

        {/* Feature Highlights */}
        <Zoom in={true} timeout={1000}>
          <Box sx={{ maxWidth: 500, zIndex: 1 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 4 }}>
              <WorkspacePremium sx={{ fontSize: 48, color: "#38bdf8" }} />
              <Typography variant="h3" fontWeight={800} sx={{ 
                background: "linear-gradient(135deg, #38bdf8 0%, #818cf8 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}>
                ZAT Workspace
              </Typography>
            </Box>

            <Typography variant="h5" fontWeight={600} gutterBottom sx={{ color: "#f8fafc" }}>
              Enterprise-Grade Collaboration Platform
            </Typography>
            
            <Typography variant="body1" sx={{ color: "#cbd5e1", mb: 4 }}>
              Secure meetings, team collaboration, and productivity tools in one unified platform.
            </Typography>

            {/* Features List */}
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {[
                { icon: <Security />, text: "Bank-level security & encryption" },
                { icon: <People />, text: "Unlimited team collaboration" },
                { icon: <Cloud />, text: "Cloud-powered performance" },
                { icon: <TrendingUp />, text: "Real-time analytics dashboard" },
                { icon: <Speed />, text: "Lightning-fast video conferencing" }
              ].map((feature, index) => (
                <Slide key={index} direction="right" in={true} timeout={800 + index * 200}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Avatar sx={{ bgcolor: "rgba(56, 189, 248, 0.1)", width: 40, height: 40 }}>
                      {feature.icon}
                    </Avatar>
                    <Typography variant="body1" sx={{ color: "#e2e8f0" }}>
                      {feature.text}
                    </Typography>
                  </Box>
                </Slide>
              ))}
            </Box>

            {/* Stats */}
            <Box sx={{ display: "flex", gap: 4, mt: 6 }}>
              {[
                { value: "50K+", label: "Active Teams" },
                { value: "99.9%", label: "Uptime" },
                { value: "A+", label: "Security Rating" }
              ].map((stat, index) => (
                <Box key={index} sx={{ textAlign: "center" }}>
                  <Typography variant="h4" fontWeight={700} sx={{ color: "#38bdf8" }}>
                    {stat.value}
                  </Typography>
                  <Typography variant="caption" sx={{ color: "#94a3b8" }}>
                    {stat.label}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Zoom>

        {/* Floating Particles */}
        <Box sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: "none",
          overflow: "hidden"
        }}>
          {[...Array(20)].map((_, i) => (
            <Box
              key={i}
              sx={{
                position: "absolute",
                width: Math.random() * 100 + 50,
                height: Math.random() * 100 + 50,
                borderRadius: "50%",
                background: "radial-gradient(circle, rgba(56, 189, 248, 0.1) 0%, transparent 70%)",
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `float ${15 + Math.random() * 10}s ease-in-out infinite`,
                "@keyframes float": {
                  "0%, 100%": { transform: "translate(0, 0)" },
                  "50%": { transform: "translate(20px, -20px)" }
                }
              }}
            />
          ))}
        </Box>
      </Box>

      {/* RIGHT LOGIN CARD SECTION - Enhanced */}
      <Box
        sx={{
          flex: 1,
          bgcolor: "#0f172a",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          p: { xs: 2, md: 4 }
        }}
      >
        <Paper
          elevation={24}
          sx={{
            width: "100%",
            maxWidth: 420,
            p: { xs: 3, md: 4 },
            bgcolor: "#1e293b",
            borderRadius: 4,
            border: "1px solid rgba(56, 189, 248, 0.1)",
            backdropFilter: "blur(10px)",
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "4px",
              background: "linear-gradient(90deg, #38bdf8, #818cf8, #38bdf8)",
              backgroundSize: "200% 100%",
              animation: "shimmer 3s infinite linear",
              "@keyframes shimmer": {
                "0%": { backgroundPosition: "-200% 0" },
                "100%": { backgroundPosition: "200% 0" }
              }
            }
          }}
        >
          {/* Brand Header */}
          <Fade in={true} timeout={500}>
            <Box sx={{ textAlign: "center", mb: 3 }}>
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1, mb: 1 }}>
                <RocketLaunch sx={{ color: "#38bdf8", fontSize: 32 }} />
                <Typography variant="h4" fontWeight={800}>
                  ZAT Workspace
                </Typography>
              </Box>
              <Typography variant="body2" sx={{ color: "#94a3b8", mb: 2 }}>
                Secure Enterprise Collaboration Platform
              </Typography>
              
              {/* Login Method Selector */}
              <Box sx={{ display: "flex", gap: 1, justifyContent: "center", mb: 3 }}>
                {[
                  { key: "password", label: "Password", icon: <Key /> },
                  { key: "qr", label: "QR Code", icon: <QrCode /> },
                  { key: "biometric", label: "Biometric", icon: <Fingerprint /> }
                ].map((method) => (
                  <Chip
                    key={method.key}
                    icon={method.icon}
                    label={method.label}
                    onClick={() => setLoginMethod(method.key)}
                    color={loginMethod === method.key ? "primary" : "default"}
                    variant={loginMethod === method.key ? "filled" : "outlined"}
                    size="small"
                  />
                ))}
              </Box>
            </Box>
          </Fade>

          <Divider sx={{ mb: 3, borderColor: "rgba(255,255,255,0.1)" }} />

          {/* Error Alert */}
          {error && (
            <Fade in={!!error}>
              <Alert 
                severity="error" 
                sx={{ mb: 3, bgcolor: "rgba(239, 68, 68, 0.1)", color: "#fca5a5" }}
                onClose={() => setError("")}
              >
                {error}
              </Alert>
            </Fade>
          )}

          {/* Demo Accounts */}
          <Fade in={true} timeout={600}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="caption" sx={{ color: "#94a3b8", mb: 1, display: "block" }}>
                Try Demo Accounts:
              </Typography>
              <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                {["admin", "user", "guest"].map((type) => (
                  <Chip
                    key={type}
                    label={`${type.charAt(0).toUpperCase() + type.slice(1)} Demo`}
                    onClick={() => quickDemoLogin(type)}
                    size="small"
                    sx={{
                      bgcolor: "rgba(56, 189, 248, 0.1)",
                      color: "#38bdf8",
                      border: "1px solid rgba(56, 189, 248, 0.3)",
                      "&:hover": { bgcolor: "rgba(56, 189, 248, 0.2)" }
                    }}
                  />
                ))}
              </Box>
            </Box>
          </Fade>

          {/* FORM */}
          <Fade in={true} timeout={700}>
            <Box>
              {loginMethod === "password" && (
                <>
                  <TextField
                    fullWidth
                    label="Company Code"
                    value={formData.companyCode}
                    onChange={(e) => setFormData({...formData, companyCode: e.target.value})}
                    margin="normal"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Business sx={{ color: "#64748b" }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        bgcolor: "#0f172a",
                        "&:hover": { bgcolor: "#1e293b" }
                      }
                    }}
                  />

                  <TextField
                    fullWidth
                    label="Email Address"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    margin="normal"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email sx={{ color: "#64748b" }} />
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        bgcolor: "#0f172a",
                        "&:hover": { bgcolor: "#1e293b" }
                      }
                    }}
                  />

                  <TextField
                    fullWidth
                    type={showPassword ? "text" : "password"}
                    label="Password"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    margin="normal"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock sx={{ color: "#64748b" }} />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={() => setShowPassword(!showPassword)}>
                            {showPassword ? (
                              <VisibilityOff sx={{ color: "#64748b" }} />
                            ) : (
                              <Visibility sx={{ color: "#64748b" }} />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        bgcolor: "#0f172a",
                        "&:hover": { bgcolor: "#1e293b" }
                      }
                    }}
                  />

                  {/* Two-Factor Authentication */}
                  {showTwoFactor && (
                    <TextField
                      fullWidth
                      label="2FA Code"
                      value={formData.twoFactorCode}
                      onChange={(e) => setFormData({...formData, twoFactorCode: e.target.value})}
                      margin="normal"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <VerifiedUser sx={{ color: "#64748b" }} />
                          </InputAdornment>
                        ),
                      }}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          bgcolor: "#0f172a",
                          "&:hover": { bgcolor: "#1e293b" }
                        }
                      }}
                    />
                  )}
                </>
              )}

              {loginMethod === "qr" && (
                <Box sx={{ textAlign: "center", py: 4 }}>
                  <QrCode sx={{ fontSize: 120, color: "#38bdf8", mb: 2 }} />
                  <Typography variant="body2" sx={{ color: "#94a3b8" }}>
                    Scan QR code with ZAT Mobile App
                  </Typography>
                </Box>
              )}

              {loginMethod === "biometric" && (
                <Box sx={{ textAlign: "center", py: 4 }}>
                  <Fingerprint sx={{ fontSize: 120, color: "#38bdf8", mb: 2 }} />
                  <Typography variant="body2" sx={{ color: "#94a3b8" }}>
                    Use fingerprint or face recognition
                  </Typography>
                </Box>
              )}

              {/* Options */}
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mt: 2 }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      sx={{ color: "#38bdf8" }}
                    />
                  }
                  label={
                    <Typography variant="body2" sx={{ color: "#94a3b8" }}>
                      Remember me
                    </Typography>
                  }
                />
                <Link
                  component="button"
                  variant="body2"
                  onClick={toggleTwoFactor}
                  sx={{ color: "#38bdf8", textDecoration: "none" }}
                >
                  {showTwoFactor ? "Hide 2FA" : "Use 2FA"}
                </Link>
              </Box>

              {/* Login Button */}
              <Button
                fullWidth
                variant="contained"
                onClick={handleLogin}
                disabled={loading}
                startIcon={loading ? <CircularProgress size={20} /> : <LoginIcon />}
                endIcon={!loading && <ArrowForward />}
                sx={{
                  mt: 3,
                  py: 1.5,
                  background: "linear-gradient(135deg, #38bdf8 0%, #818cf8 100%)",
                  "&:hover": {
                    background: "linear-gradient(135deg, #0ea5e9 0%, #6366f1 100%)",
                    transform: "translateY(-2px)",
                    boxShadow: "0 10px 25px rgba(56, 189, 248, 0.3)"
                  },
                  "&:disabled": {
                    background: "linear-gradient(135deg, #64748b 0%, #475569 100%)"
                  },
                  transition: "all 0.3s ease",
                }}
              >
                {loading ? "Signing In..." : "Sign In to Workspace"}
              </Button>

              {/* Social Login */}
              <Box sx={{ mt: 3 }}>
                <Typography variant="body2" sx={{ textAlign: "center", color: "#94a3b8", mb: 2 }}>
                  ─── or continue with ───
                </Typography>
                <Box sx={{ display: "flex", gap: 2, justifyContent: "center" }}>
                  {[
                    { provider: "google", icon: <Google />, color: "#DB4437" },
                    { provider: "microsoft", icon: <Microsoft />, color: "#00A4EF" },
                    { provider: "apple", icon: <Apple />, color: "#000000" }
                  ].map((social) => (
                    <Tooltip key={social.provider} title={`Sign in with ${social.provider.charAt(0).toUpperCase() + social.provider.slice(1)}`}>
                      <IconButton
                        onClick={() => handleSocialLogin(social.provider)}
                        sx={{
                          bgcolor: "rgba(255, 255, 255, 0.05)",
                          border: "1px solid rgba(255, 255, 255, 0.1)",
                          "&:hover": {
                            bgcolor: `${social.color}20`,
                            borderColor: social.color
                          }
                        }}
                      >
                        {social.icon}
                      </IconButton>
                    </Tooltip>
                  ))}
                </Box>
              </Box>

              {/* Forgot Password & Sign Up */}
              <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
                <Link
                  component="button"
                  variant="body2"
                  onClick={handleForgotPassword}
                  sx={{ color: "#38bdf8", textDecoration: "none" }}
                >
                  Forgot password?
                </Link>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography variant="body2" sx={{ color: "#94a3b8" }}>
                    New to ZAT?
                  </Typography>
                  <Link
                    component="button"
                    variant="body2"
                    onClick={() => navigate("/signup")}
                    sx={{ color: "#38bdf8", textDecoration: "none", display: "flex", alignItems: "center", gap: 0.5 }}
                  >
                    <PersonAdd fontSize="small" />
                    Create account
                  </Link>
                </Box>
              </Box>

              {/* Security Badge */}
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 1, mt: 4, pt: 2, borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                <Shield sx={{ color: "#10b981", fontSize: 16 }} />
                <Typography variant="caption" sx={{ color: "#94a3b8" }}>
                  Protected by 256-bit SSL encryption
                </Typography>
              </Box>
            </Box>
          </Fade>

          {/* FOOTER */}
          <Fade in={true} timeout={1000}>
            <Typography
              variant="caption"
              sx={{
                display: "block",
                mt: 4,
                textAlign: "center",
                color: "#64748b",
              }}
            >
              © 2026 Verzat Technologies • info@verzat.com • v2.1.0
            </Typography>
          </Fade>
        </Paper>

        {/* Quick Help */}
        <Tooltip title="Need help?">
          <IconButton
            sx={{
              position: "fixed",
              bottom: 24,
              right: 24,
              bgcolor: "#38bdf8",
              color: "#0f172a",
              "&:hover": { bgcolor: "#0ea5e9" }
            }}
          >
            <Help />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
}
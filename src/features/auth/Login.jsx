import {
  Box,
  Typography,
  TextField,
  Button,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

// ✅ IMPORT IMAGE
import loginImage from "../../assets/image/login-banner.webp";

export default function Login() {
  const navigate = useNavigate();

  return (
    <Box sx={{ display: "flex", minHeight: "100vh" }}>
      
      {/* LEFT IMAGE SECTION */}
      <Box
        sx={{
          flex: 1,
          backgroundImage: `url(${loginImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: { xs: "none", md: "block" }, // hide on mobile
          position: "relative",
        }}
      >
        {/* OPTIONAL DARK OVERLAY */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            bgcolor: "rgba(15, 23, 42, 0.6)",
          }}
        />
      </Box>

      {/* RIGHT LOGIN CARD SECTION */}
      <Box
        sx={{
          flex: 1,
          bgcolor: "#0f172a",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
        }}
      >
        <Box
          sx={{
            width: 380,
            p: 4,
            bgcolor: "#020617",
            borderRadius: 2,
            boxShadow: "0 20px 40px rgba(0,0,0,0.4)",
          }}
        >
          {/* BRAND */}
          <Typography variant="h4" sx={{ mb: 0.5, textAlign: "center" }}>
            ZAT Workspace
          </Typography>

          <Typography
            variant="body2"
            sx={{ textAlign: "center", mb: 3, color: "#94a3b8" }}
          >
            Secure Enterprise Collaboration Platform
          </Typography>

          <Divider sx={{ mb: 3 }} />

          {/* FORM */}
          <TextField
            fullWidth
            label="Company Code"
            margin="normal"
          />

          <TextField
            fullWidth
            label="Email"
            margin="normal"
          />

          <TextField
            fullWidth
            type="password"
            label="Password"
            margin="normal"
          />

          <Button
            fullWidth
            variant="contained"
            sx={{ mt: 3, py: 1.2 }}
            onClick={() => navigate("/dashboard")}
          >
            Sign In
          </Button>

          {/* FOOTER */}
          <Typography
            variant="caption"
            sx={{
              display: "block",
              mt: 4,
              textAlign: "center",
              color: "#94a3b8",
            }}
          >
            © 2026 Verzat Technologies • info@verzat.com
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

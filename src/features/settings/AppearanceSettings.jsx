import { Box, Typography, Switch } from "@mui/material";
import { useDispatch } from "react-redux";
import { toggleTheme } from "../../store/theme.slice";

export default function AppearanceSettings() {
  const dispatch = useDispatch();

  return (
    <Box>
      <Typography variant="h5" sx={{ mb: 2 }}>
        Appearance
      </Typography>

      <Typography>
        Dark Mode <Switch defaultChecked onChange={() => dispatch(toggleTheme())} />
      </Typography>
    </Box>
  );
}

import { createTheme } from "@mui/material/styles";

export const getTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      background: {
        default: mode === "dark" ? "#0f172a" : "#f8fafc",
        paper: mode === "dark" ? "#020617" : "#ffffff",
      },
      text: {
        primary: mode === "dark" ? "#ffffff" : "#020617",
      },
    },
  });

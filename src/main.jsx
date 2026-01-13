import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import { ThemeProvider, CssBaseline } from "@mui/material";

import store from "./store";
import App from "./App";
import { getTheme } from "./styles/muiTheme";

function ThemeWrapper() {
  const mode = useSelector((state) => state.theme.mode);
  const theme = getTheme(mode);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <ThemeWrapper />
  </Provider>
);

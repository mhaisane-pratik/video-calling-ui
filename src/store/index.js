import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "./chat.slice";
import themeReducer from "./theme.slice";

const store = configureStore({
  reducer: {
    chat: chatReducer,
    theme: themeReducer,
  },
});

export default store;

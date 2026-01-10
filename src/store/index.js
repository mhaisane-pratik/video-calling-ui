import { configureStore } from "@reduxjs/toolkit";
import chatReducer from "./chat.slice";

export default configureStore({
  reducer: {
    chat: chatReducer,
  },
});

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    name: "Verzat User",
    role: "admin", // admin | host | user
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
});

export default authSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    accessToken: null, 
    user: null, 
  },
  reducers: {
    setAccessToken(state, action) {
      state.accessToken = action.payload;
    },
    clearAccessToken(state) {
      state.accessToken = null;
      state.user = null;
    },
    setUser(state, action) {
      state.user = action.payload;
    },
  },
});

export const { setAccessToken, clearAccessToken, setUser } = authSlice.actions;

export default authSlice.reducer;

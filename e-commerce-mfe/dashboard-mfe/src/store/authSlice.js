import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    accessToken: null, 
    userId: null,
    cartId: null,
  },
  reducers: {
    setAccessToken(state, action) {
      state.accessToken = action.payload;
    },
    clearAccessToken(state) {
      state.accessToken = null;
    },
    setUser(state, action){
      state.userId = action.payload.userId;
      state.cartId = action.payload.cartId;
    }
  },
});

export const { setAccessToken, clearAccessToken, setUser } = authSlice.actions;

export default authSlice.reducer;

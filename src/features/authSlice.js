import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: false, // Set initial state as a boolean
  userData: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SignIN: (state, action) => {
      state.status = true;
      state.userData = action.payload.userData;
    },
    logout: (state) => {
      state.status = false;
      state.userData = null;
    },
  },
});

// Export the actions
export const { SignIN, logout } = authSlice.actions;

// Default export the reducer
export default authSlice.reducer; // Use default export

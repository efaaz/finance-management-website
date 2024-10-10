import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/features/authSlice"; // Import the default export correctly

const store = configureStore({
  reducer: {
    auth: authReducer, // Use the imported reducer
  },
});

export default store;

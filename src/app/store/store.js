import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/features/authSlice"; // Import the default export correctly
import spendingRecordsReducer from "@/features/spendingRecordsSlice";

const store = configureStore({
  reducer: {
    auth: authReducer, // Use the imported reducer
    spendingRecords: spendingRecordsReducer,
  },
});

export default store;

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/features/authSlice";
import spendingRecordsReducer from "@/features/spendingRecordsSlice"; // Assuming this is for overall spending records
import dailyRecordsReducer from "@/features/dailyRecordsSlice"; // Import dailyRecordsSlice

const store = configureStore({
  reducer: {
    auth: authReducer,                   // Authentication state
    spendingRecords: spendingRecordsReducer, // Overall spending records
    dailyRecords: dailyRecordsReducer,     // Daily records state
  },
});

export default store;

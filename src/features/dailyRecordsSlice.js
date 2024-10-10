// src/features/dailyRecordsSlice.js
import { AppwriteService } from "@/appwrite/config";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk to create a daily record and save it to Appwrite
export const createDailyRecord = createAsyncThunk(
  "dailyRecords/createDailyRecord",
  async (dailyRecordData) => {
    const response = await AppwriteService.createDailyRecord(dailyRecordData);
    return response; // The response will be added to the Redux state
  }
);

const dailyRecordsSlice = createSlice({
  name: "dailyRecords",
  initialState: {
    records: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createDailyRecord.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createDailyRecord.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.records.push(action.payload); // Add the new daily record to the state
      })
      .addCase(createDailyRecord.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default dailyRecordsSlice.reducer;

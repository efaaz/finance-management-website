import { AppwriteService } from "@/appwrite/config";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk to create a spending record and link it to the daily record
export const createSpendingRecord = createAsyncThunk(
  "spendingRecords/createSpendingRecord",
  async (spendingRecordData) => {
    const response = await AppwriteService.createSpendingRecord(
      spendingRecordData
    );
    return response;
  }
);

const spendingRecordsSlice = createSlice({
  name: "spendingRecords",
  initialState: {
    records: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createSpendingRecord.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createSpendingRecord.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.records.push(action.payload); // Add the new spending record to the state
      })
      .addCase(createSpendingRecord.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default spendingRecordsSlice.reducer;

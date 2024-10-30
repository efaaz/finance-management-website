import appwriteService from "@/appwrite/config"; 
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk to fetch all spending records
export const fetchAllSpendingRecords = createAsyncThunk(
  "spendingRecords/fetchAllSpendingRecords",
  async () => {
    const response = await appwriteService.getAllSpendingRecords();
    return response;
  }
);


// Async thunk to create a spending record and link it to the daily record
export const createSpendingRecord = createAsyncThunk(
  "spendingRecords/createSpendingRecord",
  async (spendingRecordData) => {
    const response = await appwriteService.createSpendingRecord(
      spendingRecordData
    );
    return response; // Return the created record to be added to the store
  }
);

const spendingRecordsSlice = createSlice({
  name: "spendingRecords",
  initialState: {
    records: [], // Initial state for records
    status: "idle", // Status can be 'idle', 'loading', 'succeeded', 'failed'
    error: null, // Store error message if any
  },
  reducers: {
    resetError(state) {
      state.error = null; // Reset error state
    },
  },
  extraReducers: (builder) => {
    builder
      // Handle fetching records
      .addCase(fetchAllSpendingRecords.pending, (state) => {
        state.status = "loading"; // Set status to loading when fetching
      })
      .addCase(fetchAllSpendingRecords.fulfilled, (state, action) => {
        state.status = "succeeded"; // Set status to succeeded on successful fetch
        state.records = action.payload; // Populate records with fetched data
      })
      .addCase(fetchAllSpendingRecords.rejected, (state, action) => {
        state.status = "failed"; // Set status to failed if fetch fails
        state.error = action.error.message; // Store error message
      })
      // Handle creating a spending record
      .addCase(createSpendingRecord.pending, (state) => {
        state.status = "loading"; // Set status to loading when creating
      })
      .addCase(createSpendingRecord.fulfilled, (state, action) => {
        state.status = "succeeded"; // Set status to succeeded on successful creation
        state.records.push(action.payload); // Add the new spending record to the state
      })
      .addCase(createSpendingRecord.rejected, (state, action) => {
        state.status = "failed"; // Set status to failed if creation fails
        state.error = action.error.message; // Store error message
      });
  },
});
console.log(appwriteService);

// Export the reducer to be used in the store
export default spendingRecordsSlice.reducer;

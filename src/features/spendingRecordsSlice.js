import { createSlice, createAsyncThunk, nanoid } from "@reduxjs/toolkit";
import AppwriteService from "@/appwrite/config";
import authService from "@/appwrite/auth";
import { updateDailyRecordSpending } from "@/features/dailyRecordsSlice";


// Thunk to fetch all spending records
const fetchAllSpendingRecords = createAsyncThunk(
  "spendingRecords/fetchAll",
  async () => {
    const user = await authService.getCurrentUser();
    const userEmail = user?.email;

    if (!userEmail) throw new Error("User not authenticated");

    const records = await AppwriteService.getAllSpendingRecords(userEmail);

    return records;
  }
);

// Thunk to create a spending record
const createSpendingRecord = createAsyncThunk(
  "spendingRecords/createSpendingRecord",
  async ({ category, amount, date }) => {
    const user = await authService.getCurrentUser();
    const userEmail = user?.email;
    if (!userEmail) throw new Error("User not authenticated");

    const spendingRecordData = {
      id: nanoid(),
      user_id: userEmail,
      date,
      category,
      amount,
    };

    // Create new spending record
    const newRecord = await AppwriteService.createSpendingRecord(
      spendingRecordData
    );

    return newRecord; // Return the new record created
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
      .addCase(fetchAllSpendingRecords.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllSpendingRecords.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.records = action.payload; // Set records to the fetched data
      })
      .addCase(fetchAllSpendingRecords.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message; // Set error message
      })
      .addCase(createSpendingRecord.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createSpendingRecord.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.records.push(action.payload); // Add the new spending record to state
      })
      .addCase(createSpendingRecord.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message; // Set error message
      });
  },
});


export const getAllRecords = (state) => state.spendingRecords.records;
export const getRecordsStatus = (state) => state.spendingRecords.status;
export const getRecordsError = (state) => state.spendingRecords.error;




// export const selectPostById = (state, postId) =>
//     state.posts.posts.find(post => post.id === postId);

// Export the thunks and reducer
export { fetchAllSpendingRecords, createSpendingRecord };
export default spendingRecordsSlice.reducer;

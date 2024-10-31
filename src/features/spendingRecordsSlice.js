import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AppwriteService from "@/appwrite/config";
import authService from "@/appwrite/auth";
import { updateDailyRecordSpending } from "@/features/dailyRecordsSlice";

// Thunk to fetch all spending records
const fetchAllSpendingRecords = createAsyncThunk(
  "spendingRecords/fetchAll",
  async (_, { dispatch }) => {
    const user = await authService.getCurrentUser();
    const userEmail = user?.email;

    if (!userEmail) throw new Error("User not authenticated");

    const records = await AppwriteService.getAllSpendingRecords(userEmail);

    // Calculate total spending by date and dispatch for each date
    const spendingByDate = records.reduce((acc, record) => {
      acc[record.date] = (acc[record.date] || 0) + record.amount;
      return acc;
    }, {});

    // Update daily record spending for each date
    Object.entries(spendingByDate).forEach(([date, spending]) => {
      dispatch(updateDailyRecordSpending({ date, spending }));
    });

    return records;
  }
);

// Thunk to create a spending record
const createSpendingRecord = createAsyncThunk(
  "spendingRecords/createSpendingRecord",
  async ({ category, amount, date }, { getState, dispatch }) => {
    const user = await authService.getCurrentUser();
    const userEmail = user?.email;

    if (!userEmail) throw new Error("User not authenticated");

    const spendingRecordData = {
      user_id: userEmail,
      date,
      category,
      amount,
    };

    // Create new spending record
    const newRecord = await AppwriteService.createSpendingRecord(
      spendingRecordData
    );

    // Get the current records state to calculate the new total
    const records = [...getState().spendingRecords.records, newRecord];
    const totalSpending = records
      .filter((record) => record.date === date)
      .reduce((total, record) => total + record.amount, 0);
    console.log(totalSpending);

    // Update daily record spending for the specific date
    dispatch(
      updateDailyRecordSpending({
        date,
        spending: totalSpending,
        user_id: userEmail,
      })
    );

    return newRecord;
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
        state.records = action.payload;
      })
      .addCase(fetchAllSpendingRecords.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(createSpendingRecord.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createSpendingRecord.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.records.push(action.payload);
      })
      .addCase(createSpendingRecord.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// Export the thunks and reducer
export { fetchAllSpendingRecords, createSpendingRecord };
export default spendingRecordsSlice.reducer;

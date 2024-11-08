import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AppwriteService from "@/appwrite/config";
import authService from "@/appwrite/auth";

// Helper function to get today's date in MM/DD/YYYY format
const getTodayDate = () => {
  const today = new Date();
  const month = today.getMonth() + 1; // Months are zero-indexed
  const day = today.getDate();
  const year = today.getFullYear();
  return `${month}/${day}/${year}`; // MM/DD/YYYY format
};

// Thunk to fetch today's records
const fetchDailyRecord = createAsyncThunk(
  "dailyRecords/fetchAll",
  async () => {
    const user = await authService.getCurrentUser();
    const userEmail = user?.email;

    if (!userEmail) throw new Error("User not authenticated");

    // Fetch records for today's date
    const records = await AppwriteService.getDailyRecord(userEmail);

    return records;
  }
);

// Thunk to create or update a daily record
export const createOrUpdateDailyRecord = createAsyncThunk(
  "dailyRecords/createOrUpdateDailyRecord",
  async ({ income = 0, spending = 0 }, { getState, rejectWithValue }) => {
    try {
      const user = await authService.getCurrentUser();
      const userEmail = user?.email;

      if (!userEmail) throw new Error("User not authenticated");

      const todayDate = getTodayDate(); // Get today's date in MM/DD/YYYY format
      const dailyRecordData = {
        user_id: userEmail,
        date: todayDate,
        total_income: income,
        total_spending: spending,
        net_income: income - spending,
      };

      // Fetch today's record from the state
      const existingRecord = getState().dailyRecords.records.find(
        (record) => record.date === todayDate && record.user_id === userEmail
      );

      if (existingRecord) {
        // Update the existing record
        const updatedData = {
          total_income: existingRecord.total_income + income,
          total_spending: existingRecord.total_spending + spending,
          net_income:
            existingRecord.total_income + income - (existingRecord.total_spending + spending),
        };

        const updatedRecord = await AppwriteService.updateDailyRecordByDate(
          userEmail,
          todayDate,
          updatedData
        );
        return { ...updatedRecord, ...updatedData };
      } else {
        // Create a new record if not found
        const newRecord = await AppwriteService.createDailyRecord(dailyRecordData);
        return { ...newRecord, ...dailyRecordData };
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const dailyRecordsSlice = createSlice({
  name: "dailyRecords",
  initialState: {
    records: [],
    status: "idle",
    error: null,
  },
  reducers: {
    updateDailyRecordSpending: (state, { payload }) => {
      const { date, spending, user_id } = payload;

      const record = state.records.find(
        (record) => record.date === date && record.user_id === user_id
      );

      if (record) {
        record.total_spending += spending;
        record.net_income = record.total_income - record.total_spending;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDailyRecord.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchDailyRecord.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.records = action.payload; // Save the fetched records
      })
      .addCase(fetchDailyRecord.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Failed to fetch daily records";
      })
      .addCase(createOrUpdateDailyRecord.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createOrUpdateDailyRecord.fulfilled, (state, action) => {
        state.status = "succeeded";

        const updatedRecord = action.payload;
        const recordIndex = state.records.findIndex(
          (record) => record.date === updatedRecord.date && record.user_id === updatedRecord.user_id
        );

        if (recordIndex !== -1) {
          state.records[recordIndex] = {
            ...state.records[recordIndex],
            ...updatedRecord,
          };
        } else {
          state.records.push(updatedRecord);
        }
      })
      .addCase(createOrUpdateDailyRecord.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || "Could not update daily record";
      });
  },
});

// Selectors
export const getAllRecords = (state) => state.dailyRecords.records;
export const getRecordsStatus = (state) => state.dailyRecords.status;
export const getRecordsError = (state) => state.dailyRecords.error;

// Export actions and reducer
export const { updateDailyRecordSpending } = dailyRecordsSlice.actions;
export default dailyRecordsSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AppwriteService from "@/appwrite/config";
import authService from "@/appwrite/auth";

// Thunk to create or update a daily record
export const createOrUpdateDailyRecord = createAsyncThunk(
  "dailyRecords/createOrUpdateDailyRecord",
  async ({ date, income = 0, spending = 0 }, { getState }) => {
    const user = await authService.getCurrentUser();
    const userEmail = user?.email;

    if (!userEmail) throw new Error("User not authenticated");

    const dailyRecordData = {
      user_id: userEmail,
      date,
      total_income: income,
      total_spending: spending,
      net_income: income - spending,
    };

    const existingRecord = getState().dailyRecords.records.find(
      (record) => record.date === date && record.user_id === userEmail
    );

    if (existingRecord) {
      const updatedData = {
        total_income: existingRecord.total_income + income,
        total_spending: existingRecord.total_spending + spending,
        net_income:
          existingRecord.total_income + income - (existingRecord.total_spending + spending),
      };

      const updatedRecord = await AppwriteService.updateDailyRecordByDate(
        userEmail,
        date,
        updatedData
      );
      return { ...updatedRecord, updatedData }; // Return updated data alongside response
    } else {
      const newRecord = await AppwriteService.createDailyRecord(dailyRecordData);
      return { ...newRecord, updatedData: dailyRecordData };
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
      const { date, spending, user_id } = payload; // Destructure payload to get date, spending, and user_id
    
      const recordIndex = state.records.findIndex(
        (record) => record.date === date && record.user_id === user_id // Find index using both date and user_id
      );
    
      if (recordIndex !== -1) { // Check if a record for that date and user_id exists
        state.records[recordIndex].total_spending += spending; // Update the total_spending for that record
        state.records[recordIndex].net_income = // Recalculate net_income based on updated spending
          state.records[recordIndex].total_income - state.records[recordIndex].total_spending; 
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrUpdateDailyRecord.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createOrUpdateDailyRecord.fulfilled, (state, action) => {
        state.status = "succeeded";

        const { updatedData } = action.payload; // Get updated data directly
        const recordIndex = state.records.findIndex(
          (record) => record.id === action.payload.$id
        );

        if (recordIndex !== -1) {
          state.records[recordIndex] = { ...state.records[recordIndex], ...updatedData };
        } else {
          state.records.push(updatedData);
        }
      })
      .addCase(createOrUpdateDailyRecord.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

// Export actions and reducer
export const { updateDailyRecordSpending } = dailyRecordsSlice.actions;
export default dailyRecordsSlice.reducer;

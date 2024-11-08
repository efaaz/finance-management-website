import { createSelector } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { getAllRecords } from "@/features/spendingRecordsSlice";

const startOfWeek = (date) => {
  const currentDate = new Date(date);
  const day = currentDate.getDay();
  const diff = currentDate.getDate() - day + (day === 0 ? -6 : 1); // Adjust for Sunday
  return new Date(currentDate.setDate(diff));
};

const startOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1);
const startOfYear = (date) => new Date(date.getFullYear(), 0, 1);

const filterByDateRange = (records, startDate) =>
  records.filter((record) => new Date(record.date) >= startDate);

export const selectWeeklySpending = createSelector(
  [getAllRecords],
  (records) => {
    const today = new Date();
    const weekStart = startOfWeek(today);
    return filterByDateRange(records, weekStart);
  }
);

export const selectMonthlySpending = createSelector(
  [getAllRecords],
  (records) => {
    const today = new Date();
    const monthStart = startOfMonth(today);
    return filterByDateRange(records, monthStart);
  }
);

export const selectYearlySpending = createSelector(
  [getAllRecords],
  (records) => {
    const today = new Date();
    const yearStart = startOfYear(today);
    return filterByDateRange(records, yearStart);
  }
);

// Helper function to filter by a specific date
const filterByDate = (records, targetDate) => {
  return records.filter((record) => {
    const recordDate = new Date(record.date);
    return (
      recordDate.getMonth() === targetDate.getMonth() &&
      recordDate.getDate() === targetDate.getDate() &&
      recordDate.getFullYear() === targetDate.getFullYear()
    );
  });
};

// Selector to get today's spending
export const selectDailySpending = createSelector(
  [getAllRecords],
  (records) => {
    const today = new Date();
    return filterByDate(records, today);
  }
);



export const selectTodayTotalSpending = createSelector(
  [getAllRecords],
  (records) => {
    const today = new Date();

    // Filter records to include only those for today's date
    const todayRecords = records.filter((record) => {
      const recordDate = new Date(record.date);
      return (
        recordDate.getDate() === today.getDate() &&
        recordDate.getMonth() === today.getMonth() &&
        recordDate.getFullYear() === today.getFullYear()
      );
    });

    // Sum up the amount for today's records
    return todayRecords.reduce((sum, record) => sum + record.amount, 0);
  }
);


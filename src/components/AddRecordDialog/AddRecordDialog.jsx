import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createOrUpdateDailyRecord } from "@/features/dailyRecordsSlice";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function AddRecordDialog({ date }) {
  const dispatch = useDispatch();
  const [amount, setAmount] = useState("");
  const [error, setError] = useState("");

  const handleAddIncome = async () => {
    const parsedAmount = Number(amount);

    // Validate the amount
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      setError("Please enter a valid amount greater than 0.");
      console.error("Error: Invalid amount entered");
      return;
    }

    // Clear any previous errors
    setError("");

    try {
      // Dispatch the action to create or update the daily record with income
      const result = await dispatch(
        createOrUpdateDailyRecord({
          date,
          income: parsedAmount, // Set income based on the input
          spending: 0, // No spending for this dialog
        })
      ).unwrap();

      console.log("Success:", result); // Log success message
      setAmount(""); // Reset input after submission
    } catch (err) {
      console.error("Error:", err); // Log error message
      setError("Failed to add income. Please try again."); // Set error message for the user
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        Add Income
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Income</DialogTitle>
          <DialogDescription>
            Enter the income amount to be recorded for{" "}
            {new Date(date).toLocaleDateString()}.
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Amount
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="border rounded-md px-3 py-2 text-black w-full"
            aria-label="Amount"
          />
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          <button
            onClick={handleAddIncome}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Add Income
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default AddRecordDialog;
